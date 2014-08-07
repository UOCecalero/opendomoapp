// Declaraciónn de variables globales
var estado, menulateral, menuprincipal, settings, cargando, cuerpo;

// Guardamos en variables elementos para poder rescatarlos después sin tener que volver a buscarlos
 menuprincipal = document.getElementById("menu_principal"),
 menulateral = document.getElementById("menu_lateral"),
 settings = document.getElementById("settings"),
 cargando = document.getElementById("cargando"),
 pie = document.getElementById ("pie");
loginbox = document.getElementById("loginbox");


// Función para añadir clases css a elementos
function addClass( classname, element ) {
    var cn = element.className;
    if( cn.indexOf( classname ) != -1 ) {
    	return;
    }
    if( cn != '' ) {
    	classname = ' '+classname;
    }
    element.className = cn+classname;
}

// Función para eliminar clases css a elementos
function removeClass( classname, element ) {
    var cn = element.className;
    var rxp = new RegExp( "\\s?\\b"+classname+"\\b", "g" );
    cn = cn.replace( rxp, '' );
    element.className = cn;
}


window.onload = function() 
{
	estado = "menuprincipal";
	
	// Añadimos las clases necesarias
	menuprincipal.className = 'page center';
	menulateral.className = 'page center';
	settings.className = 'page center';
    cargando.className = 'page totalleft';
	
}

	
	function menu(opcion) 
	{
		
	// Si pulsamos en el botón de "menu" entramos en el if
	if(opcion=="derecha")
	{
		
		if(estado=="menuprincipal")
		{			
			menuprincipal.className = 'page transition right';
			settings.className = 'page transition right';			
			estado="menulateral";
			
		} else if(estado=="menulateral")
		{			
			menuprincipal.className = 'page transition center';
			settings.className = 'page transition center';
			estado="menuprincipal";	
		} 

	// Si pulsamos el botón settings entramos en el elseif	
	
	} else if(opcion=="izquierda")
	
        {
			if(estado=="menuprincipal")
			{
				menuprincipal.className = 'page transition left';
				menulateral.className = 'page transition left';
				estado="settings"
				
			} else if(estado=="settings")
			{	
				menuprincipal.className = 'page transition center'
				menulateral.className = 'page transition center';
				estado="menuprincipal";
			}
		
	
        }
	

	
    }



//Login

function logar()
{

cargando.className = 'page center';
/* Para no tener que introducir las credenciales una y otra vez:
var user = document.getElementById("user");
var password = document.getElementById("password");
var url = document.getElementById("url");
*/
var user = "user";
var password = "opendomo";
var url = "http://local.opendomo.com";

pie.innerHTML ="sending credentials... "+" user: "+user+" password: "+password+" URL: "+url;
    




var req = new XMLHttpRequest();

 
//true > asíncrono (continúa); false > síncrono (espera la respuesta);
req.open("GET", url, false);
    req.setRequestHeader("Access-Control-Allow-Origin", url);
    req.setRequestHeader("Access-Control-Allow-Credentials", "true");
    req.setRequestHeader("Authorization", "Basic " + btoa(user + ":" + password));
req.send(null);
pie.innerHTML =req.readyState+" "+req.status;
loginbox.innerHTML = req.responseText;
    alert(req.response);
 
/*


    


    
req.onreadystatechange = function() {


    
    if (req.readyState == 4 && req.status == 200)  {
        //function showError (req.responseText);
        //pie.innerHTML=req.responseText;
        
        pie.innerHTML = "Readystate finished and status OK!!"
        pie.innerHTML =req.readyState+" "+req.status;
        //pie.innerHTML=req.response;
        return;
        }
    
    else {

        //Aqui hay que marcar el error
        //function showError (req.responseText);
        //function showError (req.responseText);
        pie.innerHTML="Ha entrado en el ELSE";
        return;
        }
 
    }; */
    

    
    //La respuesta será un XML que contendrá objetos que podremos mostrar o no por pantalla
    //var response = req.responseXML;
    
    cargando.className= 'page totalleft';

}




	


