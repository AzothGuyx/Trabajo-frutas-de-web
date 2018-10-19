var app = new function () {

  var i;
  /**
   * Con esta funcion se utiliza el GET las frutas en el html 
   */
  function loadFruits(){
    
    var xmlhttp = new XMLHttpRequest();
    var url = "http://127.0.0.1:5000/Frutas";
    xmlhttp.open("GET", url,true);
    xmlhttp.addEventListener("load", reqListener);
    xmlhttp.send();
    i=0;
    
  }
  
  function reqListener(){
    console.log(this);
    var obj = JSON.parse(this.responseText);
    var items = obj['Frutas'];
    var txt = '';
    var txt2='';
    items.forEach((e) => {
        txt += '<tr>'
        var name="'"+e.nombre+"'"
        txt+="<td><img src=" + e.imagen + " width='100px' height='100px'"+"onClick=alert("+name+")>"+"</td>"
        txt += '</tr>'

        txt2+='<tr>'
        txt2+="<td>" + e.nombre + "</td>"
        txt2 += "<td><img src=" + e.imagen + " width='100px' height='100px'></td>"
        txt2+="<td><button type="+'"button"'+" id="+'"btnEdit"'+"Onclick="+'"edit('+e.id+')"'+">"+"Editar"+"</button>"
        txt2+="</td><td><button type="+'"button"'+" id="+'"btnDelete"'+"Onclick="+'"erase('+e.id+')"'+">"+"Eliminar"+"</button></td>"
        txt2+='</tr>'
        i++;
        console.log(i);

    });
    
    document.getElementById('imagesListadoPrincipal').innerHTML = txt;
    document.getElementById('listadoCRUD').innerHTML=txt2;
}



  /**
   * Funcion para añadir una fruta
   */
  add = function (){
    
    imagen= document.getElementById("imagen").value
    nombre = document.getElementById("nombreFruta").value
    var id=i
    var xmlhttp = new XMLHttpRequest();
    var url = "http://127.0.0.1:5000/Frutas";
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
    xmlhttp.send(JSON.stringify({id:id, imagen:imagen ,nombre:nombre}));

    loadFruits();
    location.reload(true);
  }
  /**
   * Funcion para editar las frutas ()
   */
  edit=function(index){
    document.getElementById('frutaid').value=index;
    document.getElementById('btnNew').style.display = "none";
    document.getElementById('btnUpdate').style.display = "inline";
  }

  /**
   * Esta funcion para guardar la fruta que se ha editado
   * implementa el PUT
   */
  update=function(){
    var posicion=document.getElementById('frutaid').value;
    imagen= document.getElementById("imagen").value
    nombre = document.getElementById("nombreFruta").value
    var xmlhttp = new XMLHttpRequest();
    var url = "http://127.0.0.1:5000/Frutas";
    xmlhttp.open("PUT", url+"/"+posicion, true);
    xmlhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
    xmlhttp.send(JSON.stringify({id:posicion, imagen:imagen ,nombre:nombre}));
    loadFruits();
    location.reload(true);

  }

  /**
   * Funcion para elimiar una fruta
   * implementa el post
   */
  erase=function(index){

    var xmlhttp = new XMLHttpRequest();
    var url = "http://127.0.0.1:5000/Frutas";
    xmlhttp.open("DELETE", url+"/"+index, true);
    xmlhttp.send();
    loadFruits();
    location.reload(true);

  }

  loadFruits();

}

  
   
  
  