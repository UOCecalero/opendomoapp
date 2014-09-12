/* Este javascript debe ir antes de los demás para que tenga las funciones cargadas en memoria
 */

/*
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
 
*/

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


//function getElementbyID
function ID(id){
    return document.getElementById(id); }

//Funcion GetelementbyTagname retrona un array de objetos para un Tag dado
function GC(cls){
    return document.getElementsByClassName(cls); }

//Funcion que muestra texto por la consola inferior que se usa como log.
function log(t){pie.innerHTML=t;}

// Función SetAtribute. A un objeto n le añade un atributo a con un valor v
function SA(n,a,v){ n.setAttribute(a,v);return n;}

//Función AppendChild: al objeto p le crea un hijo c
function AC(p,c){p.appendChild(c);}

//Crea un texto "t" que luego meterá mediante appenchild dentro del elemento.
function CT(t){return D.createTextNode(t);}

//Funcion CreateElement crea un elemnto "t" con clase "c" e id "i"
function CE(t,c,i){
    var e=document.createElement(t);
    if(c&&c!='')SA(e,'class',c);
    if(i&&i!='')SA(e,'id',i);
    return e;
}

//Función request
function REQ(cmd){
var req = new XMLHttpRequest();

//true > asíncrono (continúa); false > síncrono (espera la respuesta);
req.open("GET", url+cmd, false);

//Se añaden las siguientes cabeceras que permiten al navegador no ser afectado por la política del mismo orígen y enviar las credenciales.

req.setRequestHeader("Access-Control-Allow-Origin", url);
req.setRequestHeader("Access-Control-Allow-Credentials", "true");
req.setRequestHeader("Authorization", "Basic " + btoa(user + ":" + password));

//Se manda la petición del recurso a través del objeto req.
req.send(null);

 
 //   req.onreadystatechange = function (){
//Si activas el modo síncrono cuando genera el menu de los botones aun no ha recibido variables y lo deja vacío
   
//Se muestra el resultado en la parte inferior de la pantalla
log(req.readyState+" "+req.statusText+" \n");
cargando.className= 'page totalleft';
return req.responseText;
    
    
   // }
    
}


function loadPlano (idinput){
    var plano = ID(idinput).files[0];
    
    // Se muestra el gif de carga
    cargando.className = 'page center';
    
    //Comprueba que hay imagen
    if (plano){
        
        //Se crea una instancia de un nuevo lector.
        var lector = new FileReader();
        //Lee el archivo como URL, es decir, extrae la rurta.
        lector.readAsDataURL(plano);
        lector.onloadend = function(){
            

            //Creamos el div sobre el cual se dibujará la imagen.
            cuerpo.innerHTML='<div id="wrapper"> <div id="scroller"><img id=miimagen src="'+lector.result+'"> </div></div>';
            
            //Aplicamos la librería iscroll-zoom sobre el código HTML creado
            myScroll = new IScroll('#wrapper', {
                                   zoom: true,
                                   scrollX: true,
                                   scrollY: true,
                                   mouseWheel: true,
                                   wheelAction: 'zoom'
                                   });
            document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
           
        }
        
        //En caso de no haber imagen.
    } else { alert("Error: Select a valid file");}
    
    //Se esconde el gif de carga
    cargando.className= 'page totalleft';}


function createMenu(tx){
    
    d = ID("opciones");
    r = ID ("removes");
    
    
    var a = tx.split("\n");

    for (var i=0; i<a.length; i++) {
        b=a[i].split(":");
        if (a[i] != "DONE")
            //OP tiene que devolver elementos option que va añadiendo
            try {AC(d,OP(b[0],b[1].substring(0,2),b[2]));} catch(e){}
    }
    
   

  //Esta función crea una opción
    function OP (nom, tipo, valor){
        
        if (valor){
            if (tipo == ("DI")|| tipo == ("DO")||tipo == ("AI") || tipo == ("AO") )
            {
            
            var no = CE("option");
            no.text = nom;
            no.tipo = tipo;
            no.value = valor;
            no.disabled = false;
            return no;
            }
        }
    }
}

//Función para añadir botón

    function addbutton(){
       imagen = ID("scroller");
        
        if (!ID(d.options[d.selectedIndex].text)){
        switch (d.options[d.selectedIndex].tipo){
                
         case "DO":
                if (d.options[d.selectedIndex].value == "ON") {
                    object = CE('div','onswitch_o',d.options[d.selectedIndex].text);
                    object.style.display = 'none';
                    AC(imagen,object);
                 }
                if (d.options[d.selectedIndex].value == "OFF"){
                    object = CE('div','offswitch_o',d.options[d.selectedIndex].text);
                    object.style.display = 'none';
                    AC(imagen,object);
                }
                
                object.addEventListener('touchstart', tapandhold, false);
                object.addEventListener('touchend', function(){ hold = false; }, false);

                
                
                break;
                
         case "DI":
                if (d.options[d.selectedIndex].value == "ON") {
                    object = CE('div','onswitch_i',d.options[d.selectedIndex].text);
                    object.style.display = 'none';
                    AC(imagen,object);
                }
                 if (d.options[d.selectedIndex].value == "OFF"){
                    object = CE('div','offswitch_i',d.options[d.selectedIndex].text);
                    object.style.display = 'none';
                    AC(imagen,object);
                }break;
                
         case "AO":
                object = CE('div','analogswitch_o',d.options[d.selectedIndex].text);
                object.style.display = 'none';
                AC(imagen,object);;
                object.innerHTML = d.valor;
                break;
                
         case "AI":
                object = CE('input','analogswitch_i',d.options[d.selectedIndex].text);
                object.style.display = 'none';
                AC(imagen,object);
                object.innerHTML = d.valor;
                break;
        }
        }
        else {
            object = ID(d.options[d.selectedIndex].text);
            object.style.display = 'block';
        
        }
        
        
        menu('derecha');
        log("Hold your finger 2sec to place the button");
       
        imagen.addEventListener('touchstart', tapandhold, false);
        imagen.addEventListener('touchstart', getMousePosition, false);
        imagen.addEventListener('touchend', holding = function(){ hold = false; }, false);
    
    }
    
/*Función para eliminar botón*/

function removebutton(){
	
        if (r.selectedIndex > -1){
        var nom = r.options[r.selectedIndex].text;
        ID(nom).style.display = 'none';
        r.removeChild(r.options[r.selectedIndex]);
        
        //Funcion que busca el elemento que conteiene la referencia y lo vuelve a habilitar.
        for (var i = 0; i < d.options.length; i++){
            if( d.options[i].text == nom) {d.options[i].disabled = false;}}
    
 
        menu('derecha');
        log("Removed!");
        }
		else { menu('derecha'); alert ("Select a valid value!");}
	
    }
    
//Función que calcula coordenadas del ratón (dentro de la capa scroller).
    function getMousePosition(e){
         coordenadaX = (-myScroll.x)+(e.layerX - pageXOffset);
         coordenadaY = (-myScroll.y)+(e.layerY - pageYOffset);;
        log(" CoordenadaX:"+coordenadaX+" CoordenadaY:"+coordenadaY);
    }

//Función que comprueba si ha sido mantenido durante mas de dos segundos y pinta el interruptor
//la propiedad touches.length indica cuantos dedos se estan utilizando sino al hacer zoom saltaría

function tapandhold(e){
    if (e.touches.length == 1){hold = true;} else {hold = false;}
	setTimeout (function(){if (hold == true){
                
                if (e.target == imagen){placeButton();}
                else if (e.target.className == "onswitch_o" || e.target.className == "offswitch_o"){changeState(e.target); refresh();}
                
                
                } else {
                
                if (e.target == imagen){delete object;}
                else if (e.target == object){/*nada*/}
                
                }},1500);
}


//Función que añade el botón
    function placeButton(){
       
        //Al colocar el botón automáticamente se crea su entrada option para poder ser eliminado
        
        var no = d.options[d.selectedIndex].cloneNode(true);
        d.options[d.selectedIndex].disabled = true;
        
        AC(r,no);
        
        object.style.left = coordenadaX+'px';
        object.style.top = coordenadaY+'px';
        object.style.display = 'block';
        
        //Se cancelan los disparadores de eventos y devuelve automáticamente al menú
        imagen.removeEventListener('touchstart', tapandhold);
        imagen.removeEventListener('touchstart', getMousePosition);
        imagen.removeEventListener('touchend', holding);
        
    }

function changeState(et){
    
    switch (et.className){
case "onswitch_o": et.className = "offswitch_o"; break;
case "offswitch_o": et.className = "onswitch_o"; break;
case "onswitch_i": et.className = "offswitch_i"; break;
case "offswitch_i": et.className = "onswitch_i"; break;
    }
    
}

function refresh (){
    
    var tx = REQ("lsc+");
    var a = tx.split("\n");

    for (var i=0; i<a.length; i++) {
        b=a[i].split(":");
        if (a[i] != "DONE")
        compara(b[0],b[1].substring(0,2),b[2]);
    }
	
	
	
}

function compara (nom, tipo, valor){
    //Tiene que comparar los valores que tiene en la aplicacion pintados y los que le llegan de la lectura.
    //En caso de que sean diferentes hay dos supuestos: a) el valor es de entrada y por tanto se actualiza el mapa. b) el valor es de salida por tanto se envía la orden
    if (ID(nom)){
    var n = ID(nom);
    var c = n.className;
    switch (c){
            //Valores de salida
        case "onswitch_o": if (valor != "ON"){ z = REQ("set+"+nom+"+ON"); } break;
        case "offswitch_o": if (valor != "OFF"){ z = REQ("set+"+nom+"+OFF"); }  break;
                
                
            //valores de entrada
        case "onswitch_i": if (valor != "ON") {changeState(n);}  break;
        case "offswitch_i": if (valor != "OFF") {changeState(n);}  break;
    
    }
        
 }
        
}







