from load_data_base import *

data=data()

def seleccionar_clasificacion():
    clasificaciones = ["ACCESORIO", "CONJUNTO", "INFERIOR", "SUPERIOR", "ZAPATO"]

    print("Elige una clasificación:")
    for i, clasificacion in enumerate(clasificaciones, 1):
        print(f"{i}. {clasificacion}")

    while True:
        try:
            opcion = int(input("Ingresa el número de tu opción: "))
            if 1 <= opcion <= len(clasificaciones):
                return clasificaciones[opcion - 1]
            else:
                print("Opción no válida, intenta de nuevo.")
        except ValueError:
            print("Por favor ingresa un número válido.")

def seleccionar_genero():
    clasificaciones = ["Maculino","Femenino","Unisex"]

    print("Elige una clasificación:")
    for i, clasificacion in enumerate(clasificaciones, 1):
        print(f"{i}. {clasificacion}")

    while True:
        try:
            opcion = int(input("Ingresa el número de tu opción: "))
            if 1 <= opcion <= len(clasificaciones):
                return clasificaciones[opcion - 1]
            else:
                print("Opción no válida, intenta de nuevo.")
        except ValueError:
            print("Por favor ingresa un número válido.")



def agregar_producto(nombre, descri, stock, valor_base):
    # Add producto
    sql="SELECT id_prod FROM PRODUCTO"
    data.sql_consult(sql)
    if data.result!=[]:
        sql="SELECT MAX(id_prod) FROM PRODUCTO"
        data.sql_consult(sql)
        id_new=int(data.result[0][0])+1
    else:
        id_new=1
    sql=f"INSERT INTO PRODUCTO(id_prod,nombre,valor_venta,valor_base,stock,descri) VALUES ({id_new},'{nombre}','{valor_base}','{valor_base}','{stock}','{descri}')"
    data.sql_modify(str(sql))
    
    # Add en una de las clasificaciones.
    clasi=seleccionar_clasificacion()
    talla=input(f"Ingrese la talla del {clasi}: ")
    marca=input(f"Ingrese la marca del {clasi}: ")
    color=input(f"Ingrese el color del {clasi}: ")
    genero=seleccionar_genero()

    # Esilo/material.
    if clasi in [ "CONJUNTO", "INFERIOR", "SUPERIOR"]:
        mat_est=input(f"Ingrese el estilo del {clasi}: ")
    else:
        mat_est=input(f"Ingrese el material del {clasi}: ")

    # Categoria
    if clasi=="ACCESORIO":
        categoria=input(f"Ingrese la categoría del accesorio: ")
        sql=f"INSERT INTO {clasi} VALUES ({id_new},'{talla}','{marca}','{color}','{mat_est}','{genero}','{categoria}')"
    else:
        sql=f"INSERT INTO {clasi} VALUES ({id_new},'{talla}','{marca}','{color}','{mat_est}','{genero}')"
    
    data.sql_modify(str(sql))


    
agregar_producto('ProdPacho','Prueba1 con Pacho',1,10000)
sql="SELECT * FROM PRODUCTO"
data.sql_consult(sql)
data.show_result()
