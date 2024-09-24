import mysql.connector

def load():
    mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="avellanadb"
    )
    return mydb

mydb=load()
mycursor = mydb.cursor()

def sql_instruccion(sql, mycursor=mycursor):
    mycursor.execute(sql)
    myresult = mycursor.fetchall()
    return myresult