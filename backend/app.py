from flask import Flask, request, jsonify
from flask_cors import CORS  # Importa CORS
from load_database import Data  

app = Flask(__name__)
CORS(app)  # habilita CORS

db = Data()  # inicializa la conexión a la base de datos
db1 = Data()
db2 = Data()
db3 = Data()
db4 = Data()


@app.route('/api/verfacturas', methods=['POST'])
def verfacturas():
    data = request.get_json()

    id_clie = data.get('idClie')  # Recibe el ID del cliente del frontend

    try:
        # Consultar si el cliente existe
        db3.sql_consult(f"SELECT id_clie FROM CLIENTE WHERE id_clie = {int(id_clie)}")
        if db3.result == []:
            return jsonify({"message": "Cliente no encontrado"}), 404

        # Consultar facturas del cliente
        db3.sql_consult(f"SELECT id_fact, fecha, total, subtotal FROM FACTURA WHERE id_clie = {int(id_clie)}")
        facturas = db3.result
        
        if len(facturas) == 0:
            return jsonify({"message": "No se encontraron facturas para este cliente"}), 404
        
        facturas_dict = {}
        
        for factura in facturas:
            id_fact, fecha, total, subtotal = factura
            
            # Consultar productos de cada factura
            db3.sql_consult(f"""
                SELECT ITEM.id_prod, PRODUCTO.descri, PRODUCTO.valor_venta, ITEM.cantidad_prod 
                FROM ITEM 
                INNER JOIN PRODUCTO ON ITEM.id_prod = PRODUCTO.id_prod 
                WHERE ITEM.id_fact = {id_fact}
            """)
            productos = db3.result
            
            productos_list = []
            for producto in productos:
                id_prod, descripcion, precio_unitario, cantidad_prod = producto
                productos_list.append({
                    "idprod": id_prod,
                    "descripcion": descripcion,
                    "precio_unitario": precio_unitario,
                    "cantidad": cantidad_prod
                })
            
            # Agregar los datos de la factura al diccionario
            facturas_dict[id_fact] = {
                "fecha": fecha,
                "total": total,
                "subtotal": subtotal,
                "productos": productos_list
            }

        return jsonify({"facturas": facturas_dict}), 200

    except Exception as e:
        return jsonify({"message": "Error al consultar las facturas", "error": str(e)}), 500



@app.route('/api/facturar', methods=['POST'])
def facturar():
    
    data2 = request.get_json()

    id_clie = data2.get('idClie')
    subtotal = data2.get('subtotal')
    cartItems = data2.get('cartItems')

    db3.sql_consult("SELECT id_fact FROM FACTURA")
    if db3.result!=[]:
        db3.sql_consult("SELECT MAX(id_fact) FROM FACTURA")
        id_fact = db3.result[0][0]+1
    else:
        id_fact = 1

    try:
        db3.sql_consult(f"SELECT dir FROM CLIENTE WHERE id_clie={id_clie}")
        dirrec = db3.result[0][0]
        db3.sql_consult(f"SELECT nombre FROM CLIENTE WHERE id_clie={id_clie}")
        nombre = db3.result[0][0]
        db3.sql_modify(f"INSERT INTO FACTURA(id_fact,fecha,total,subtotal,dir_compra,num_guia,nom_domici,id_clie) VALUES({id_fact},CURRENT_TIMESTAMP,{subtotal},{subtotal},'{dirrec}','0','Default Domici',{id_clie})")
        for i in cartItems.keys():
            if cartItems[i]!=0:
                print(cartItems[i])
                db3.sql_modify(f"INSERT INTO ITEM(id_fact,id_prod,cantidad_prod) VALUES({id_fact},{int(i)},{int(cartItems[i]['quantity'])})")
                sizes=cartItems[i]['size']
                if sizes != None:
                    sizes=sizes.split("-")
                    for tal in sizes:
                        db4.sql_consult(f"SELECT stock FROM (SELECT * FROM talla_let union  SELECT * FROM talla_num) AS S WHERE S.talla_let='{tal}'")
                        stock=int(db4.result[0][0])
                        if stock-1<0:
                            stock=0
                        else:
                            stock=stock-1
                        db4.sql_modify(f"UPDATE TALLA_LET SET stock={stock} WHERE id_prod = {int(i)} and talla_let ='{tal}'")
                        db4.sql_modify(f"UPDATE TALLA_NUM SET stock={stock} WHERE id_prod = {int(i)} and talla_num ='{tal}'")

        return jsonify({"message": "Factura insertada exitosamente", "id_fact": id_fact,"nombre": nombre}), 201
    except Exception as e:
        
        return jsonify({"message": "Error al insertar la factura", "error": str(e)}), 500

@app.route('/api/insertarproveedor', methods=['POST'])
def insert_proveedor():
    
    data2 = request.get_json()

    nit = data2.get('nit')
    nombre = data2.get('nombre')
    ciudad = data2.get('ciudad')
    correo = data2.get('correo')
    direccion = data2.get('direccion')
    telefono = data2.get('telefono')
    tipoProducto = data2.get('tipoProducto')
    try:
        db3.sql_modify(f"INSERT INTO PROVEEDOR(id_prov,nombre,tel,dir,ciudad,correo) VALUES({nit},'{nombre}','{telefono}','{direccion}','{ciudad}','{correo}')")
        id_prods = []

        ProductosDcto = [f'{tipo_prod}' for tipo_prod in tipoProducto.keys() if tipoProducto[tipo_prod]]
        for tipo_prod in ProductosDcto:
            db3.sql_consult(f"SELECT id_prod FROM PRODUCTO WHERE categoria = '{tipo_prod}'")
            for id_prod in db3.result:          
                id_prods.append(id_prod[0])
        for id_prod in id_prods:
            db3.sql_modify(f"INSERT INTO SUMINISTRA(id_prod,id_prov) VALUES ({id_prod},{nit})")
            print('agreguea suministra')
        return jsonify({"message": 'Proveedor insertado exitosamente', "id_prov": nit}), 201
    except Exception as e:
        
        return jsonify({"message": "Error al insertar el proveedor", "error": str(e)}), 500

@app.route('/api/insertarDescuento', methods=['POST'])
def insert_descuento():
    
    data2 = request.get_json()

    fechaInicio = data2.get('fechaInicio')
    fechaFin = data2.get('fechaFin')
    porcentajeDescuento = data2.get('porcentajeDescuento')
    tipoProducto = data2.get('tipoProducto')
    
    db3.sql_consult("SELECT id_descuento FROM DESCUENTO")
    if db3.result!=[]:
        db3.sql_consult("SELECT MAX(id_descuento) FROM descuento")
        id_descuento = db3.result[0][0]+1
    else:
        id_descuento = 1
    try:
        id_prods = []
        ProductosDcto = [f'{tipo_prod}' for tipo_prod in tipoProducto.keys() if tipoProducto[tipo_prod]]
        for tipo_prod in ProductosDcto:
            db3.sql_consult(f"SELECT id_prod FROM PRODUCTO WHERE categoria = '{tipo_prod}'")
            for id_prod in db3.result:          
                id_prods.append(id_prod[0])
        db3.sql_modify(f"INSERT INTO DESCUENTO(id_descuento,porcen_dcto,fecha_inicio,fecha_fin,tipo) VALUES({id_descuento},{porcentajeDescuento},'{fechaInicio}','{fechaFin}','{', '.join(ProductosDcto)}')")
        for id_prod in id_prods:
            db3.sql_consult(f"SELECT valor_venta FROM PRODUCTO WHERE id_prod={id_prod}")
            valor_venta_old = int(db3.result[0][0])
            valor_venta_new = valor_venta_old - (valor_venta_old*int(porcentajeDescuento)/100)
            db3.sql_modify(f"UPDATE PRODUCTO SET id_descuento={id_descuento},valor_venta={valor_venta_new} WHERE id_prod = {id_prod}")
        return jsonify({"message": "Descuento insertado exitosamente", "id_descuento": id_descuento}), 201
    except Exception as e:
        
        return jsonify({"message": "Error al insertar el Descuento", "error": str(e)}), 500




@app.route('/api/insertarproducto', methods=['POST'])
def insert_producto():
    
    data2 = request.get_json()

    nombre = data2.get('nombre')
    valor_base = data2.get('valor_base')
    descri = data2.get('descri')
    genero = data2.get('genero')
    categoria = data2.get('categoria')
    imagenes = data2.get('imagenes')
    categoriaAccesorio = data2.get('categoriaAccesorio')    
    materialAccesorio = data2.get('materialAccesorio')
    marcaAccesorio = data2.get('marcaAccesorio')
    zapatoMaterial = data2.get('zapatoMaterial')
    marcaZapato = data2.get('marcaZapato')
    marcaRopa = data2.get('marcaRopa')
    estiloRopa = data2.get('estiloRopa')
    talla = data2.get('talla')
    stock = data2.get('stock')

    db3.sql_consult("SELECT MAX(id_prod) FROM producto")
    
    id_prod = db3.result[0][0]+1
    try:
        db2.sql_modify(f"INSERT INTO producto (id_prod, nombre, valor_base, valor_venta, descri, genero, categoria) VALUES ({id_prod}, '{nombre}', {valor_base}, {valor_base}, '{descri}', '{genero}', '{categoria}')")
        for img_url in imagenes:
            db4.sql_consult("SELECT id_img FROM IMG")
            if db4.result!=[]:
                db4.sql_consult("SELECT MAX(id_img) FROM IMG")
                id_img=int(db4.result[0][0])+1
            else:
                id_img=1
            db4.sql_modify(f"INSERT INTO IMG(id_img,url_img) VALUES ({id_img},'{img_url}')")
            db2.sql_modify( f"INSERT INTO CATALOGO_IMG(id_prod,id_img) VALUES ({id_prod},{id_img})")

        if categoria=='ACCESORIO':
            db2.sql_modify(f"INSERT INTO ACCESORIO (id_prod, categoria, material, marca) VALUES ({id_prod}, '{categoriaAccesorio}', '{materialAccesorio}', '{marcaAccesorio}')")
        elif categoria=='ROPA':
            db2.sql_modify(f"INSERT INTO ROPA (id_prod, estilo, marca) VALUES ({id_prod}, '{estiloRopa}', '{marcaRopa}')")
            db2.sql_modify(f"INSERT INTO TALLA_LET(id_prod,talla_let,stock) VALUES ({id_prod},'{talla}',{stock})")
        elif categoria=='PANTALON':
            db2.sql_modify(f"INSERT INTO PANTALON (id_prod, estilo, marca) VALUES ({id_prod}, '{estiloRopa}', '{marcaRopa}')")
            db2.sql_modify(f"INSERT INTO TALLA_NUM(id_prod,talla_num,stock) VALUES ({id_prod},{talla},{stock})")
        else:
            db2.sql_modify(f"INSERT INTO ZAPATOS (id_prod, material, marca) VALUES ({id_prod}, '{zapatoMaterial}', '{marcaZapato}')")
            db2.sql_modify(f"INSERT INTO TALLA_NUM(id_prod,talla_num,stock) VALUES ({id_prod},{talla},{stock})")

        return jsonify({"message": "Producto insertado exitosamente", "id_prod": id_prod}), 201
    except Exception as e:
        
        return jsonify({"message": "Error al insertar el producto en python", "error": str(e)}), 500




@app.route('/api/products', methods=['GET'])
def get_products():
    db5 = Data()
    db6 = Data()
    db.sql_consult("SELECT producto.id_prod, nombre, valor_venta, descri,categoria FROM producto")
    products = []
    for product in db.result:  
        db1.sql_consult("SELECT catalogo_img.id_prod,img.url_img FROM catalogo_img,img WHERE catalogo_img.id_img=img.id_img")
        imagenes=[]
        for img in db1.result:
            if img[0]==product[0]:
                imagenes.append(img[1])
        db5.sql_consult("SELECT id_opinion, calificacion, comentario, fecha_crea, fecha_modi, id_prod, id_clie FROM OPINION")
        opiniones=[]
        prom_opinion = 0
        den_op = 0
        for op in db5.result:
            if op[5]==product[0]:
                db6.sql_consult(f"SELECT nombre FROM CLIENTE WHERE CLIENTE.id_clie= {op[6]}")
                opiniones.append(
                    [op[1], op[2], op[3],op[4], db6.result[0]]
                )
                prom_opinion+=op[1]
                den_op+=1
        if den_op != 0:
            prom_opinion= int(prom_opinion//den_op)
        products.append({
            'id_prod': product[0],  
            'nombre': product[1],  
            'valor_venta': product[2],  
            'descri': product[3],
            'img_url': imagenes,
            'categoria':product[4],
            'opiniones': opiniones,
            'prom_opinion': prom_opinion

        })

    return jsonify(products)



@app.route('/api/insertaropinion', methods=['POST'])
def insert_opinion():
    db7 = Data()
    db8 = Data()
    data3 = request.get_json()

    opi_calificacion = data3.get('opi_calificacion')
    opi_comentario = data3.get('opi_comentario')
    opi_IdProd = data3.get('opi_IdProd')
    idClie = data3.get('idClie')
    
    db7.sql_consult("SELECT id_opinion FROM opinion")
    
    

    if db7.result!=[]:
        db7.sql_consult("SELECT MAX(id_opinion) FROM opinion")
        id_opinion = int(db7.result[0][0])+1
    else:
        id_opinion = 1
    
    try:

        db8.sql_modify(f"INSERT INTO opinion (id_opinion, calificacion, comentario, fecha_crea, fecha_modi, id_prod, id_clie) VALUES ({id_opinion}, {opi_calificacion}, '{opi_comentario}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, {opi_IdProd}, {idClie})")
        
        
        return jsonify({"message": "Opinion insertada exitosamente"}), 201
    
    except Exception as e:
        
        return jsonify({"message": "Error al insertar la opinion en python", "error": str(e)}), 500


@app.route('/api/products/accesorios', methods=['GET'])
def get_accesorios():

    db.sql_consult("SELECT producto.id_prod, nombre, valor_venta, descri,producto.categoria,valor_base FROM producto,accesorio WHERE producto.id_prod=accesorio.id_prod")
    products = []
    for product in db.result:  
        db1.sql_consult("SELECT catalogo_img.id_prod,img.url_img FROM catalogo_img,img WHERE catalogo_img.id_img=img.id_img")
        imagenes=[]
        for img in db1.result:
            if img[0]==product[0]:
                imagenes.append(img[1])
        products.append({
            'id_prod': product[0],  
            'nombre': product[1],  
            'valor_venta': product[2],  
            'descri': product[3],
            'img_url': imagenes,
            'categoria': product[4],
            'valor_base':product[5]

        })


    return jsonify(products)

@app.route('/api/products/accesorios/precioAsc', methods=['GET'])
def get_accesoriosAsc():
    db.sql_consult("SELECT * FROM VistaAccAsc")
    products = []
    for product in db.result:  
        db1.sql_consult("SELECT catalogo_img.id_prod,img.url_img FROM catalogo_img,img WHERE catalogo_img.id_img=img.id_img")
        imagenes=[]
        for img in db1.result:
            if img[0]==product[0]:
                imagenes.append(img[1])
        products.append({
            'id_prod': product[0],  
            'nombre': product[1],  
            'valor_venta': product[2],  
            'descri': product[3],
            'img_url': imagenes,
            'categoria': product[4],
            'valor_base':product[5]

        })
    return jsonify(products)


@app.route('/api/products/accesorios/precioDesc', methods=['GET'])
def get_accesoriosDesc():
    db.sql_consult("SELECT * FROM VistaAccDesc")
    products = []
    for product in db.result:  
        db1.sql_consult("SELECT catalogo_img.id_prod,img.url_img FROM catalogo_img,img WHERE catalogo_img.id_img=img.id_img")
        imagenes=[]
        for img in db1.result:
            if img[0]==product[0]:
                imagenes.append(img[1])
        products.append({
            'id_prod': product[0],  
            'nombre': product[1],  
            'valor_venta': product[2],  
            'descri': product[3],
            'img_url': imagenes,
            'categoria': product[4],
            'valor_base':product[5]

        })


    return jsonify(products)


@app.route('/api/products/ropa', methods=['GET'])
def get_ropa():
    db.sql_consult("SELECT producto.id_prod, nombre, valor_venta, descri,producto.categoria, valor_base FROM producto,ropa WHERE producto.id_prod=ropa.id_prod")
    products = []
    for product in db.result:  
        db1.sql_consult("SELECT catalogo_img.id_prod,img.url_img FROM catalogo_img,img WHERE catalogo_img.id_img=img.id_img")
        imagenes=[]
        for img in db1.result:
            if img[0]==product[0]:
                imagenes.append(img[1])
        products.append({
            'id_prod': product[0],  
            'nombre': product[1],  
            'valor_venta': product[2],  
            'descri': product[3],
            'img_url': imagenes,
            'categoria': product[4],
            'valor_base':product[5]
        })
    db.sql_consult("SELECT producto.id_prod, nombre, valor_venta, descri,producto.categoria,valor_base FROM producto,zapatos WHERE producto.id_prod=zapatos.id_prod")
    for product in db.result:  
        db1.sql_consult("SELECT catalogo_img.id_prod,img.url_img FROM catalogo_img,img WHERE catalogo_img.id_img=img.id_img")
        imagenes=[]
        for img in db1.result:
            if img[0]==product[0]:
                imagenes.append(img[1])
        products.append({
            'id_prod': product[0],  
            'nombre': product[1],  
            'valor_venta': product[2],  
            'descri': product[3],
            'img_url': imagenes,
            'categoria': product[4],
            'valor_base':product[5]
        })
    db.sql_consult("SELECT producto.id_prod, nombre, valor_venta, descri,producto.categoria,valor_base FROM producto,pantalon WHERE producto.id_prod=pantalon.id_prod")
    for product in db.result:  
        db1.sql_consult("SELECT catalogo_img.id_prod,img.url_img FROM catalogo_img,img WHERE catalogo_img.id_img=img.id_img")
        imagenes=[]
        for img in db1.result:
            if img[0]==product[0]:
                imagenes.append(img[1])
        products.append({
            'id_prod': product[0],  
            'nombre': product[1],  
            'valor_venta': product[2],  
            'descri': product[3],
            'img_url': imagenes,
            'categoria': product[4],
            'valor_base':product[5]
        })


    return jsonify(products)


@app.route('/api/products/ropa/precioAsc', methods=['GET'])
def get_RopaAsc():
    db.sql_consult("SELECT * FROM VistaRopaAsc")
    products = []
    for product in db.result:  
        db1.sql_consult("SELECT catalogo_img.id_prod,img.url_img FROM catalogo_img,img WHERE catalogo_img.id_img=img.id_img")
        imagenes=[]
        for img in db1.result:
            if img[0]==product[0]:
                imagenes.append(img[1])
        products.append({
            'id_prod': product[0],  
            'nombre': product[1],  
            'valor_venta': product[2],  
            'descri': product[3],
            'img_url': imagenes,
            'categoria': product[4],
            'valor_base':product[5]

        })
    return jsonify(products)


@app.route('/api/products/ropa/precioDesc', methods=['GET'])
def get_RopaDesc():
    db.sql_consult("SELECT * FROM VistaRopaDesc")
    products = []
    for product in db.result:  
        db1.sql_consult("SELECT catalogo_img.id_prod,img.url_img FROM catalogo_img,img WHERE catalogo_img.id_img=img.id_img")
        imagenes=[]
        for img in db1.result:
            if img[0]==product[0]:
                imagenes.append(img[1])
        products.append({
            'id_prod': product[0],  
            'nombre': product[1],  
            'valor_venta': product[2],  
            'descri': product[3],
            'img_url': imagenes,
            'categoria': product[4],
            'valor_base':product[5]

        })
    return jsonify(products)


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    id_clie = data.get('id_clie')
    password = data.get('pass')

    db.sql_consult(f"SELECT * FROM CLIENTE WHERE id_clie ='{id_clie}' AND pass = '{password}'")
    user = db.result

    if user:
        if id_clie == '0':
            return jsonify({"message": "Login exitoso admin", "user": user}), 200
        else:
            return jsonify({"message": "Login exitoso", "user": user}), 200
    else:
        return jsonify({"message": "Credenciales incorrectas"}), 401


@app.route('/api/cliente', methods=['POST'])
def get_cliente():
    data1 = request.get_json()
    id_clie = data1.get('id_clie')

    db.sql_consult(f"SELECT nombre, fecha_nac, correo, tel, dir FROM CLIENTE WHERE id_clie ='{id_clie}'")
    
    if db.result:
        cliente = db.result[0]
        return jsonify({
            "nombre": cliente[0], 
            "fecha_nac": cliente[1], 
            "correo": cliente[2], 
            "tel": cliente[3], 
            "dir": cliente[4]
        }), 200
    else:
        return jsonify({"message": "Cliente no encontrado"}), 404
    
@app.route('/api/cliente_add', methods=['POST'])
def register_cliente():
    data = request.get_json()
    id_clie = data.get('id_clie')
    nombre = data.get('nombre')
    correo = data.get('correo')
    password = data.get('password')
    tel = data.get('tel', None)  # Campo opcional
    dire = data.get('dir', None)  # Campo opcional

    # Verificar si ya existe un cliente con el mismo id_clie
    db.sql_consult(str(f"SELECT * FROM CLIENTE WHERE id_clie = ({id_clie})"))
    if db.result:
        return jsonify({"message": "El cliente ya existe"}), 409

    # Insertar el nuevo cliente en la base de datos
    db.sql_modify(
        str(f"INSERT INTO CLIENTE (id_clie, nombre, correo, pass, tel, dir) VALUES ({id_clie}, '{nombre}', '{correo}', '{password}', '{tel}', '{dire}')")
        )
    return jsonify({"message": "Cliente registrado exitosamente"}), 201

@app.route('/api/prod_talla', methods=['POST'])
def get_prod_talla():
    data = request.get_json()
    
    if not data or 'id_prod' not in data:
        return jsonify({"message": "ID de producto no proporcionado."}), 400
    
    id_prod = data.get('id_prod')

    db.sql_consult(f"SELECT categoria FROM PRODUCTO WHERE id_prod ='{id_prod}'")
    
    if not db.result or len(db.result) == 0:
        return jsonify({"message": "Producto no encontrado."}), 404
    
    categoria = db.result[0][0]

    if categoria.lower() == "ropa":
        db.sql_consult(f"SELECT talla_let, stock FROM TALLA_LET WHERE id_prod ='{id_prod}'")
    elif categoria.lower() == "accesorio":
        # Enviar un mensaje indicando que es un accesorio y no necesita tallas
        return jsonify({"message": "Producto es un accesorio.", "es_accesorio": True}), 200
    else:
        db.sql_consult(f"SELECT talla_num, stock FROM TALLA_NUM WHERE id_prod ='{id_prod}'")

    if not db.result or len(db.result) == 0:
        return jsonify({"message": "No hay tallas disponibles de este producto."}), 404

    info_prod = []
    for product in db.result:
        info_prod.append({
            'talla': product[0],
            'stock': product[1]
        })

    return jsonify({"tallas": info_prod, "es_accesorio": False}), 200


if __name__ == '__main__':
    app.run(debug=True)
