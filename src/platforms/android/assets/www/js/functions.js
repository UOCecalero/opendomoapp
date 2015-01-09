/* Este javascript debe ir antes de los demás para que tenga las funciones cargadas en memoria
 */


//function getElementbyID
function ID(id){
    return document.getElementById(id); }

//Funcion GetelementbyTagname retrona un array de objetos para un Tag dado
function GC(cls){
    return document.getElementsByClassName(cls); }

//Funcion que muestra texto por la consola inferior que se usa como log.
function log(t){pie.innerHTML = t;}

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


//Función request
function REQ(cmd){
var req = new XMLHttpRequest();

//true > asíncrono (continúa); false > síncrono (espera la respuesta);
req.open("GET", url+cmd, true);

//Se añaden las siguientes cabeceras que permiten al navegador no ser afectado por la política del mismo orígen y enviar las credenciales.

req.setRequestHeader("Access-Control-Allow-Origin", url);
//req.setRequestHeader("Access-Control-Allow-Credentials", "true");
req.setRequestHeader("Authorization", "Basic " + btoa(user + ":" + password));


    //Se manda la petición del recurso a través del objeto req.
    req.send(null);
    return req;
}



/*

function loadPlano (idinput){
    
    var plano = ID(idinput).files[0];
    
    // Se muestra el gif de carga
    //cargando.className = 'page center';
    
    //Comprueba que hay imagen
    if (plano){
        
        //Se crea una instancia de un nuevo lector.
        var lector = new FileReader();
        //Lee el archivo como URL, es decir, extrae la rurta.
        lector.readAsDataURL(plano);
        lector.onloadend = function(){
            

            //Creamos el div sobre el cual se dibujará la imagen.
            //cuerpo.innerHTML='<div id="wrapper"> <div id="scroller"><img id="miimagen" src="'+lector.result+'"> </div></div>';
            
            
            
            if (!(ID("mapas"))){
                
                cuerpo.innerHTML='<div id="mapas"> </div>';
                
            }
            
            // Llama a la función que añade una planta
            addMap(lector.result);
            
            
            //Aplicamos la librería iscroll-zoom sobre el código HTML creado
            
            window["myScroll"+mapnumber] = new IScroll(('#wrapper'+mapnumber), {
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
    //cargando.className= 'page totalleft';
} 

*/


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
    
    //Definimos el valor de frecuencia de refresco por defecto y inicializamos una escucha para cuando se modifique dicho valor.
    freqRefresco = setInterval(refresh, 10000); //Cada 10s
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
//Función para añadir botón

    function addbutton(){
        //La variable sc indica el numero de mapa que esta activo. Para saber donde pintaremos.
        
        var sc = activo();
        
        if(sc){
        
        imagen = ID('scroller'+sc);
       
        //d.selectedIndex hace referencia al elemento selecionado en el "select".
        //Es decir busca que no exista un elemento con ID igual al campo "text" del elemento selecionado.
        if (!ID(d.options[d.selectedIndex].text)){
        switch (d.options[d.selectedIndex].tipo){
               
        //Llegados a este punto valora las diferentes opciones: Si es Digital Output, Digital Input, Analogical Output o Analogical Input.
                
         case "DO":
                
        //Si es digital Output (SALIDA DIGITAL DEL DISPOSITIVO = INTERRUPTOR) tan solo tiene que crear el elemento con una clase u otra en función de si esta encendido u apagado (La clase solo define el dibujo que lo representa). Lo deja en "display=none" para mostrarlo cuando esté situado en el mapa.
                
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
                
            //Aqui se inicializan los disparadores para que al mantener pulsados los interruptores, cambien su estado. Y en caso de no mantener pulsado no pase nada.
                
                object.addEventListener('touchstart', tapandhold, false);
                object.addEventListener('touchend', function(){ hold = false; clearTimeout(cuenta); }, false);

                
                
                break;
                
         case "DI":
        //En el caso Digital Input (ENTRADA DIGITAL DEL DISPOSITIVO = LECTURA) es exactamente lo mismo solo que se representa con dibujos diferentes (bombillas).
                
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
                object = CE('input','analogswitch_o',d.options[d.selectedIndex].text);
                object.style.display = 'none';
                AC(imagen,object);
                object.value = d.value;
                break;
                
         case "AI":
                object = CE('div','analogswitch_i',d.options[d.selectedIndex].text);
                object.style.display = 'none';
                AC(imagen,object);
                //alert(d.value);
                object.innerHTML = d.value;
                break;
        }
        }
        else {
            object = ID(d.options[d.selectedIndex].text);
            object.style.display = 'block';
        
        }
        
        //Una vez creado el objeto y inicializados los disparadores de eventos se muestra el mapa para que se indique donde se debe "pintar" el objeto.
        
        menu('derecha');
        log("Hold your finger 2sec to place the button");
       
    //Aqui se realiza la misma operacion que con los interruptores pero añadiendo la función "getMousePosition" que extrae coordenadas para sabe donde hay que pintar el mapa.
        
        imagen.addEventListener('touchstart', tapandhold, false);
        imagen.addEventListener('touchstart', getMousePosition, false);
        imagen.addEventListener('touchend', holding = function(){ hold = false; clearTimeout(cuenta); }, false);
    
    
        } else {alert('Select an active picture!');}
       
    
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
        var n = activo();
       /*  coordenadaX = (-myScroll.x)+(e.layerX - scrollX);
         coordenadaY = (-myScroll.y)+(e.layerY - scrollY);*/
        coordenadaX = (-window["myScroll"+n].x)+(e.layerX - scrollX);
        coordenadaY = (-window["myScroll"+n].y)+(e.layerY - scrollY);
        log(" CoordenadaX:"+coordenadaX+" CoordenadaY:"+coordenadaY);
    }

//Función que comprueba si ha sido mantenido durante mas de dos segundos y pinta el interruptor o cambia su estado dependiendo del objeto que haya disparado la función.
//la propiedad touches.length indica cuantos dedos se estan utilizando sino al hacer zoom saltaría

function tapandhold(e){
    if (e.touches.length == 1){hold = true;} else {hold = false;}
	
    //Settimeout dispara la funcion contenida pasados X segundos.
    //NOTA: e.target indica el elemento que ha disparado la función. Si lo ha disparado "imagen"
    cuenta = setTimeout (function(){
                
                if (hold == true){
                
                
                //Si es llamado desde "object" significa que es un interruptor y lo que queremos es que cambie su estado. Cambiamos el dibujo y modificamos su estado.
                if (e.target.className == "onswitch_o" || e.target.className == "offswitch_o"){changeState(e.target); refresh();}
                
                //Si es llamado desdecualquier otro elemento (imagen o scroller) lo que queremos es disparar la función para ubicarlo
                //else if(e.target == imagen){placeButton();}
                else {placeButton();}
                
                }
                
                //if (hold == false) {
                
                //if (e.target == imagen && ){delete object;}
                //else if (e.target == object){/*nada*/}
                
                //}
                         },2000);
}


//Función que añade el botón
    function placeButton(){
       
        //Al colocar el botón automáticamente se crea su entrada option en el input "removes" para poder ser eliminado y se deshabilita su opción en el input "Add Button"
        
        var no = d.options[d.selectedIndex].cloneNode(true);
        d.options[d.selectedIndex].disabled = true;
        
        AC(r,no);
        
        object.style.left = coordenadaX+'px';
        object.style.top = coordenadaY+'px';
        object.style.display = 'block';
        
        //Se cancelan los disparadores de eventos
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

function refresh(){
    
    //cargando.className = 'page center';
    var r = REQ("lsc+");
	
    r.onreadystatechange = function(){
        if (r.readyState == 4 && r.status == 200){
            
        cargando.className = 'page totalleft';
            
               // if (r.status == 200){
                    var tx=r.responseText;
                    var a=tx.split("\n");

                    for (var i=0; i<a.length; i++) {
                    b=a[i].split(":");
                    if (a[i] != "DONE")
                        
                        try {compara(b[0],b[1].substring(0,2),b[2]);} catch(e){}
	} }
		else {
			log(r.readyState+" "+r.statusText+" \n");
        }
	
    }
	
    }


function compara (nom, tipo, valor){
    //Tiene que comparar los valores que tiene en la aplicacion pintados y los que le llegan de la lectura.
    //En caso de que sean diferentes hay dos supuestos: a) el valor es de entrada y por tanto se actualiza el mapa. b) el valor es de salida por tanto se envía la orden
    if (ID(nom)){
    var n = ID(nom);
    var c = n.className;
        
    //Este sistema supone que la app manda sobre cualquier otro controlador. Es decir, si desde el web de opendomo modificamos el valor de un puerto de salida digital, por ejemplo, al hacer el refresh envia una orden para que se vuelva a poner tal y como esta en la aplicación.
        
    switch (c){
            //Valores de salida
        case "onswitch_o": if (valor != "ON"){ z = REQ("set+"+nom+"+ON"); log(z.responseText); } break;
        case "offswitch_o": if (valor != "OFF"){ z = REQ("set+"+nom+"+OFF"); log(z.responseText); }  break;
                
                
            //valores de entrada
        case "onswitch_i": if (valor != "ON") {changeState(n);}  break;
        case "offswitch_i": if (valor != "OFF") {changeState(n);}  break;
        
        //Valores de salida analog
        case "analogswitch_o": if (valor != ID(nom).value) {setValue( nom, ID(nom).value );}  break;
        
        //Valores de entrada analog
        case "analogswitch_i": if (valor != ID(nom).value) {showValue( nom, valor );}  break;
    }
        
    }}
        

function setValue(n,v){

    //Hay que comprobar que el valor se ciñe al formato especificado tipo 4.5 o 4500
   z = REQ("set+"+n+"+"+v);
   log(z.responseText);

}

function showValue(n,v){
    ID(n).innerHTML(v);
}

//Esta funcion es ejecutada una vez modificado el valor de frecuencia de refresco.
function  setRefresh(freq){
    
    freq = freq * 1000;
    clearInterval(freqRefresco);
    freqRefresco = setInterval(refresh, freq);
 
}

function addMap(URI){
    
//mapnumber esta inicializado en 0 al inicio de la aplicación
    ++ mapnumber;
    
 //Creamos el div plano
    var a=CE('div','classplano','plano'+mapnumber);
    var b='<div id="wrapper'+mapnumber+'" class="wrapper"> <div id="scroller'+mapnumber+'" class="scroller"><img id=miimagen src="'+URI+'"> </div> </div>'
    a.innerHTML=b;
    
    //El primero es el div donde se meten los mapas y el segundo es el select donde se insertara la opcion
    var c=ID('mapas');
    m=ID('mapas_sel');
    
    //Con este boleano sabemos cual es el mapa activo ya que se puede mover el select sin pulsar ningun boton lo que no garantiza que el select selecionaco coincida con el mapa activo
    
    for(i = 0; i <mapnumber; i++){
        if(m.options[i]){ m.options[i].activo= false;}
        
    }
    
    
    //Creamos la opcion
    var op=CE("option");
    op.text = 'plano'+mapnumber;
    op.number = mapnumber;
    op.activo = true;
   
    
    
    //añadimos el div 'plano' a 'mapas' y la opcion al select
    AC(c,a);
    AC(m,op);
    
     m.selectedIndex=(m.length)-1;
    
    
    for(i = 1; i <=mapnumber; i++){
        var d=ID('plano'+i);
        if(d){
            d.className = 'classplano right';}
    }
    
    //Hacemos un display block al añadido y el resto lo ocultamos
    a.className='classplano center';
}


function switchMap(){
    if(m.selectedIndex > -1){
    var n = m.options[m.selectedIndex].number
    var map = ID('plano'+n);
    
    //Los ocultamos todos
    for (i=0; i<=mapnumber; i++){
        if(m.options[i]){m.options[i].activo= false;
        ID('plano'+(m.options[i].number)).className='classplano right';
            if(m.options[i].number == n ){m.options[i].activo=true;}
        }
    }
    
    //Mostramos el seleccionado
    map.className='classplano center';
    }
    else {alert('Error: No map selected!');}

}

function delMap(){
    
    if (m.selectedIndex > -1){
    var n = m.options[m.selectedIndex].number
    var map = ID('plano'+n);

    if(m.options[m.selectedIndex-1]){
        m.selectedIndex=m.selectedIndex-1;
        m.remove(m.selectedIndex+1);
        
    }
    
    else{
        m.selectedIndex=m.selectedIndex+1;
        if (m.selectedIndex!=-1){m.remove(m.selectedIndex-1);}
        else{m.remove(0);}
    }
    
    if(m.selectedIndex > -1){
    ID('plano'+(m.options[m.selectedIndex].number)).className='classplano center'
    m.options[m.selectedIndex].activo=true;
    

    
    }
    var p=ID('mapas');
        p.removeChild(map);}
    else {alert('Error: No map selected!');}

}

//Esta funcion retorna el numero de mapa que esta activo
function activo(){
    
    for (i=0; i<mapnumber; i++){
        if (m.options[i].activo == true){ var a = m.options[i].number; }}
    if (a > -1){ return a;}
    else {return null;}
}



