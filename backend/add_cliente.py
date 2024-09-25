from load_data_base import *

data=data()

def registrar_cliente(cc,nombre,passw,dia,mes,año,correo,tel,dir):
    sql=f"INSERT INTO CLIENTE VALUES ({cc},'{nombre}','{año}-{mes}-{dia}','{correo}','{tel}','{dir}','{passw}')"
    data.sql_modify(str(sql))

#registrar_cliente(444567,'Cliente 1','0000','21','09','2004','ejemplo@gmail','111','dir1')
#sql="SELECT * FROM CLIENTE"
#data.sql_consult(sql)
#data.show_result()

def login(cc, passw):
    sql=f"SELECT password FROM CLIENTE WHERE id_clie='{cc}'"
    data.sql_consult(sql)
    if data.result==[]:
        print("Usuario no registrado.")
    elif passw!=data.result[0][0]:
        print("Contraseña incorrecta.")
    else:
        print("Sesión iniciada.")     

#login(444567,'0001')   