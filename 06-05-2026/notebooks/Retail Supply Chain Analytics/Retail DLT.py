import dlt
from pyspark.sql.functions import *

@dlt.table
def bronze_orders():
    data=[
        (301,101,201,"2024-04-01",20,"Delivered"),
        (302,102,201,"2024-04-01",35,"Delivered"),
        (303,111,204,"2024-04-02",2,"Delivered"),
        (304,114,208,"2024-04-02",5,"Pending"),
        (305,115,204,"2024-04-03",3,"Delivered")
    ]
    columns=[
        "order_id",
        "product_id",
        "supplier_id",
        "order_date",
        "quantity",
        "order_status"
    ]
    return spark.createDataFrame(data,columns)
@dlt.table
def silver_orders():
    df=dlt.read("bronze_orders")
    df=df.filter(col("quantity")>0)
    df=df.withColumn("order_date",to_date(col("order_date")))
    return df
@dlt.table
def silver_revenue_orders():
    df=dlt.read("silver_orders")
    df=df.withColumn("total_revenue",col("quantity")*1000)
    return df
@dlt.table
def clean_orders():
    df=dlt.read("silver_revenue_orders")
    df=df.filter(col("quantity").isNotNull())
    return df
@dlt.table
def gold_city_revenue():
    df=dlt.read("clean_orders")
    return df.groupBy("supplier_id").agg(sum("total_revenue").alias("city_revenue"))
@dlt.table
def gold_category_revenue():
    df=dlt.read("clean_orders")
    return df.groupBy("order_status").agg(sum("total_revenue").alias("category_revenue"))
