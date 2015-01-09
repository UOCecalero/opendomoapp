// Declaraciónn de variables globales
var estado, menulateral, menuprincipal, settings, cargando, cuerpo, pie, loginbox, botoniz, botonder;

// Guardamos en variables elementos para poder rescatarlos después sin tener que volver a buscarlos

 menuprincipal = ID("menu_principal"),
 menulateral = ID("menu_lateral"),
 settings = ID("settings"),
 cargando = ID("cargando"),
 pie = ID("pie"),
 cuerpo = ID("cuerpo"),
 loginbox = ID("loginbox"),
 botoniz = GC("btniz")[0],
 botonder = GC("btnder")[0];

var user = "user";
var password = "opendomo";
var url = "http://local.opendomo.com/";
var mapnumber = 0;


//Inicializamos la app
var app = {
initialize: function() {
    this.bindEvents();
},
bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
},
onDeviceReady: function() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}
};




window.onload = function()
{
	estado = "menuprincipal";
	
	// Añadimos las clases necesarias
	menuprincipal.className = 'page center';
	menulateral.className = 'page center';
	settings.className = 'page center';
    cargando.className = 'page totalleft';
	
    /* Para no tener que introducir las credenciales una y otra vez:*/
     var user = ID("user");
     var password = ID("password");
     var url = ID("url");
     


}

//Cargar imágenes
function carrete()
{
    

 navigator.camera.getPicture(onSuccess, onFail, { quality: 90, destinationType: destinationType.FILE_URI, sourceType: Camera.PictureSourceType.PHOTOLIBRARY });
   

}


function onSuccess(imageURI) {
 
    
 if (!(ID("mapas"))){
        
        cuerpo.innerHTML='<div id="mapas"> </div>';
        logar();
 
 }
 
        // Llama a la función que añade una planta
        addMap(imageURI);
 
 
        
        //Aplicamos la librería iscroll-zoom sobre el código HTML creado
        window["myScroll"+mapnumber] = new IScroll('#wrapper'+mapnumber, {
                               zoom: true,
                               scrollX: true,
                               scrollY: true,
                               mouseWheel: true,
                               wheelAction: 'zoom'
                               });
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    
    
    }
    
    function onFail(message) {
        log('Failed because: ' + message + imageURI);
    }


//Login

function logar()
{
// Se muestra el gif de carga y en mensaje en la consola inferior
cargando.className = 'page center';
log("sending credentials... "+" user: "+user+" password: "+password+" URL: "+url+" \n");
    
//Se muestran los botones
    botonder.style.display = "initial";
    botoniz.style.display = "initial";

//Hace una consulta lsc y a partir de la respuesta crea el menu de puertos.
    
    response = REQ("lsc+");
	
    response.onreadystatechange = function (){

    //Se muestra el resultado en la parte inferior de la pantalla
    log(response.readyState+" "+response.statusText+" \n");

if (response.readyState == 4){
    
    //Se retira el gif de carga
    cargando.className= 'page totalleft';
    

    if (response.status == 200)  {

    createMenu(response.responseText);
    response = REQ("ver+");
	
    log(response.responseText+" \n");

	//Se carga el plano seleccionado pasando la id del input
    //loadPlano("planos");



            }

        }
    
    }
}




