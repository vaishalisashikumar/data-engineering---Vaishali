from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

def create_employee_file():
    data = """Rahul,45000
Sneha,52000
Amit,61000
Priya,47000
Kiran,39000"""

    with open('/tmp/employees.txt', 'w') as file:
        file.write(data)

    print("Employee file created successfully")


def read_employee_data():
    with open('/tmp/employees.txt', 'r') as file:
        employees = file.readlines()

    print("Employee Records:")

    for employee in employees:
        print(employee.strip())


def calculate_salary_expense(ti):
    total_salary = 0

    with open('/tmp/employees.txt', 'r') as file:
        employees = file.readlines()

    for employee in employees:
        name, salary = employee.strip().split(',')
        total_salary += int(salary)

    print(f"Total Salary Expense = {total_salary}")

    ti.xcom_push(key='total_salary', value=total_salary)


def find_highest_salary(ti):
    highest_salary = 0
    highest_employee = ""

    with open('/tmp/employees.txt', 'r') as file:
        employees = file.readlines()

    for employee in employees:
        name, salary = employee.strip().split(',')

        if int(salary) > highest_salary:
            highest_salary = int(salary)
            highest_employee = name

    print(f"Highest Salary = {highest_salary}")
    print(f"Employee = {highest_employee}")

    ti.xcom_push(key='highest_salary', value=highest_salary)
    ti.xcom_push(key='highest_employee', value=highest_employee)


def generate_salary_report(ti):
    total_salary = ti.xcom_pull(
        task_ids='calculate_salary_expense',
        key='total_salary'
    )

    highest_salary = ti.xcom_pull(
        task_ids='find_highest_salary',
        key='highest_salary'
    )

    highest_employee = ti.xcom_pull(
        task_ids='find_highest_salary',
        key='highest_employee'
    )

    report = f"""Employee Salary Report
Total Employees = 5
Total Salary Expense = {total_salary}
Highest Salary = {highest_salary}
Employee = {highest_employee}
Status = Processed Successfully"""

    with open('/tmp/salary_report.txt', 'w') as file:
        file.write(report)

    print("Salary report generated successfully")


with DAG(
    dag_id='employee_salary_processing',
    start_date=datetime(2025, 1, 1),
    schedule=None,
    catchup=False
) as dag:

    task1 = PythonOperator(
        task_id='create_employee_file',
        python_callable=create_employee_file
    )

    task2 = PythonOperator(
        task_id='read_employee_data',
        python_callable=read_employee_data
    )

    task3 = PythonOperator(
        task_id='calculate_salary_expense',
        python_callable=calculate_salary_expense
    )

    task4 = PythonOperator(
        task_id='find_highest_salary',
        python_callable=find_highest_salary
    )

    task5 = PythonOperator(
        task_id='generate_salary_report',
        python_callable=generate_salary_report
    )

    task1 >> task2 >> task3 >> task4 >> task5