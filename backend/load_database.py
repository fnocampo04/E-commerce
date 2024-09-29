import mysql.connector

class Data():
    def __init__(self) -> None:
        self.mydb = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="avellana"
        )
        self.mycursor = self.mydb.cursor()
        self.result = None

    def show_result(self):
        for it in self.result:
            print(it) # reemplazo el print
    
    def sql_consult(self, prompt):
        self.mycursor.execute(prompt)
        self.result = self.mycursor.fetchall()

    def sql_modify(self, prompt):
        self.mycursor.execute(prompt)
        self.mydb.commit()
