from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

Frutas = [
    {
        'id':0,
        'nombre':'Manzana',
        'imagen': './imagenes/1.jpg'
    }
]

#Get
@app.route("/Frutas")
def allFrutas():
    return jsonify({'Frutas': Frutas})

#Get One
@app.route("/Frutas/<int:fruta_id>")
def getFruta(fruta_id):
    print(fruta_id)
    return jsonify(Frutas[0]['nombre'])

#post 
@app.route("/Frutas", methods=['POST'])
def createFruta():
    #Agregar elemento a un  array 
    print(request.json)
    Frutas.append(request.json)
    return jsonify(Frutas)

#PUT One
@app.route("/Frutas/<int:fruta_id>", methods=['PUT'])
def putFruta(fruta_id):
    index=0
    for fruta in Frutas:
        if fruta['id']== fruta_id:
            print(request.json)
            Frutas[index]=request.json
        index+=1
    return jsonify(Frutas)

#Delete One
@app.route("/Frutas/<int:fruta_id>", methods=['DELETE'])
def deleteFruta(fruta_id):
    for fruta in Frutas:
        if fruta['id']== fruta_id:
            Frutas.remove(fruta)
    return jsonify(Frutas)


#Solo es uno
app.run(port=5000)
