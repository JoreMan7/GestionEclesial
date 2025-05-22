from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app)

DB_HOST = 'localhost' 
DB_USER = 'root'
DB_PASS = '213894J@rge'
DB_NAME = 'gestor_contrasena'

def conectar():
    return pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASS, db=DB_NAME, charset='utf8mb4')

@app.route("/", methods=['GET'])
def consulta_general():
    """
    Consulta general del baúl de contraseñas
    ---
    responses:
      200:
        description: Lista de registros
    """
    try:
        conn = conectar()
        cur = conn.cursor()
        cur.execute("SELECT * FROM baul")
        datos = cur.fetchall() #Consulta todos los datos
        data = [{'id_baul': row[0], 'Plataforma': row[1], 'usuario': row[2], 'clave': row[3]} for row in datos]
        cur.close()
        conn.close()
        return jsonify({'baul': data, 'mensaje': 'Baúl de contraseñas'})
    except Exception as ex:
        print(ex)
        return jsonify({'mensaje': 'Error en consulta general'})
if __name__ == '__main__':
    app.run(debug=True)