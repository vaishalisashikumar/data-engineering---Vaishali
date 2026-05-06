import dlt
from pyspark.sql.functions import *

@dlt.table
def bronze_visits():
    return spark.read.table("visits_target")

@dlt.table
def silver_visits():
    return dlt.read("bronze_visits").filter(
        col("visit_status") != "Cancelled"
    )

@dlt.table
def gold_revenue():
    return dlt.read("silver_visits").groupBy(
        "doctor_id"
    ).agg(
        sum("tests_count").alias("total_tests")
    )