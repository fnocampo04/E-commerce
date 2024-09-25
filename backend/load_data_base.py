import mysql.connector

class data():
    def __init__(self) -> None:
        self.mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="avellanadb"
        )
        self.mycursor=self.mydb.cursor()
        self.result=None

    def show_result(self): # Change print to yield.
        for it in self.result:
            print(it)
    
    def sql_consult(self, prompt):
        self.mycursor.execute(prompt)
        self.result = self.mycursor.fetchall()

    def sql_modify(self, prompt):
        self.mycursor.execute(prompt)
        self.mydb.commit()