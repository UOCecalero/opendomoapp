// Declaraciónn de variables globales
var estado, menulateral, menuprincipal, settings, cargando, cuerpo, pie, loginbox, botoniz, botonder;

// Guardamos en variables elementos para poder rescatarlos después sin tener que volver a buscarlos

 menuprincipal = ID("menu_principal"),
 menulateral = ID("menu_lateral"),
 settings = ID("settings"),
 cargando = ID("cargando"),
 pie = ID("pie"),
 loginbox = ID("loginbox"),
 botoniz = GC("btniz")[0],
 botonder = GC("btnder")[0];

var user = "user";
var password = "opendomo";
var url = "http://local.opendomo.com/";



window.onload = function() 
{
	estado = "menuprincipal";
	
	// Añadimos las clases necesarias
	menuprincipal.className = 'page center';
	menulateral.className = 'page center';
	settings.className = 'page center';
    cargando.className = 'page totalleft';
	
    /* Para no tener que introducir las credenciales una y otra vez:
     var user = ID("user");
     var password = ID("password");
     var url = ID("url");
     */


}


//Login

function logar()
{
// Se muestra el gif de carga y en mensaje en la consola inferior
cargando.className = 'page center';
log("sending credentials... "+" user: "+user+" password: "+password+" URL: "+url);
    
//Se muestran los botones
    botonder.style.display = "initial";
    botoniz.style.display = "initial";

//Hace una consulta lsc y a partir de la respuesta crea el menu de puertos.
    var response = REQ("lsc+");
        createMenu(response);
    
    response = REQ("ver+");
    log (response);

//Se retira el gif de carga
cargando.className= 'page totalleft';

//Se carga el plano seleccionado pasando la id del input
    loadPlano("planos");

    

    
    
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
    

    
    

}




	


