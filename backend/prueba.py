from load_data_base import *

obj1=data()

sql="SHOW COLUMNS FROM INFERIOR"
obj1.sql_consult(sql)
print((obj1.result))

"""
sql="SHOW COLUMNS FROM CLIENTE"

obj1.sql_consult(sql)

for x in obj1.result:
    print(1,x)

sql="UPDATE CLIENTE SET fecha_nac='2020-02-02' WHERE id_clie=1"

obj1.sql_modify(sql)

sql="SELECT * FROM CLIENTE"

obj1.sql_consult(sql)

for x in obj1.result:
    print(1,x)"""