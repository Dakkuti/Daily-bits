

let boton = document.querySelector(".container__input--button");

let label = document.querySelectorAll(".container__label");
let input = document.querySelectorAll(".input-radio");
let seleccion = document.querySelectorAll(".col.pregunta5");
let col_Pregunta4 = document.querySelectorAll(".col.pregunta4");

let boton2 = document.querySelector('.continuartrue');
let boton3 = document.querySelector('.continuarNottrue');
let ver = document.querySelector(".mostrar");
let organizar = document.querySelector(".organizar");


let barra = document.querySelector("#barra");
let imgHtml = document.querySelector("#img-html");

let ir = document.querySelector("#irHome");

/**SELECIONAR EL VALOR DEL INPUT/LABEL y verificar*/

/*recorro pregunta 1 , 2, 3*/
for (let i = 0; i < input.length; i++) {

    input[i].addEventListener('click', () => {
        cambiar();//cambio el color del boton al hacer click a morado

        x = label[i].innerText;//le asigno a x el valor del texto
        let data = window.getComputedStyle(label[i].children[0], ':after').getPropertyValue('content');
        if (document.querySelector('.questionsOne')) {//si la clase es preguntas uno hacer

            if (x === 'main') {/*si x es igual a main verifica que es correcto*/

                //le paso la funcion correcto y me muestra el alert y redirige
                correcto();
                
            } else {
                //le paso la funcion falso y me muestra el alert y redirige
                falso(x.innerHTML = 'main');
                cambiarVida();
            }

        } else if (document.querySelector('.questionsTwo')) {//si la clase es preguntas 2 

            /*le paso a data el after que cree en el css y saco su contenido*/
            

            if (data === '"<script>"') {
                correcto();
                
            } else {
                falso(`<p class="answer">`);
                /*creo un nuevo elemento en el css para mostrarlo*/
                let root = document.documentElement;
                root.style.setProperty('--answer', '"<script>"');
                cambiarVida();
            }

        } else if (document.querySelector('.questionsThree')) {//si la clase es preguntas 3 

            if (x === 'Don’t repeat yourself') {
                correcto();
            } else {
                console.log('no verdad');
                falso('Don’t repeat yourself');
                cambiarVida()
            }
        } else if (document.querySelector('.questionsFour')) {//si la clase es preguntas 4 
            console.log('question four');

        }

    });

    
}//fin for

/*recorro pregunta5*/
for (let i = 0; i < seleccion.length; i++) {

    /*recorro la respuesta seleccionada*/
    seleccion[i].addEventListener('click', () => {

        cambiar();
        x = seleccion[i].innerText;

        if (x === 'Vue.js') {
            correcto();
            
        } else {
            falso('Vue.js');
            cambiarVida();
        }

    });
}



/*recorro pregunta4*/
for (let i = 0; i < col_Pregunta4.length; i++) {

    /*recorro el evento*/
    col_Pregunta4[i].addEventListener('click', () => {
        cambiar();
        /*entro al after a traves de los hijos*/
        agregar(col_Pregunta4[i].children[0].children[0]);
        cambiarColor(col_Pregunta4[i]);
    });

}


/*SI LA RESPUESTA ES VERDADERA , CREA EL ALERT*/
function isTrue(v) {

    /*CREO MI PLANTILLA EN JAVASCRIPT */
    const alert_True = document.createElement('div');
    const p = document.createElement('p');
    const a = document.createElement('a');

    a.classList.add("continuartrue");
    a.style.background = "#2CB67D"
    a.addEventListener("click", link);
    a.innerText = "Continuar"
    p.innerText = "¡Buen trabajo!";

    alert_True.classList.add('alert', 'alert-success');
    alert_True.appendChild(p);
    alert_True.appendChild(a);/*AGREGO el nodo*/

    ver.innerHTML = "";/*para que el alert no se duplique*/
    ver.appendChild(alert_True);
    
}

/*SI LA RESPUESTA ES FALSA , CREA EL ALERT*/
function isNotTrue(v) {
    const alert_True = document.createElement('div');

    alert_True.innerHTML = `
    <div class="alert alert-danger" role="alert">
        <p>La respuesta correcta es </br> ${v}</p>
        <a href="#" class="continuarNottrue" style="Background:#EF4565" onclick="link()">Continuar</a>
    </div>
        `;
    ver.innerHTML = "";
    ver.appendChild(alert_True);

    
}


/*CAMBIA EL BOTON A MORADO*/
function cambiar() {
    boton.style.backgroundColor = "#6B47DC";
}

/*PASAMOS LA FUNCION ISTRUE Y REDIRIGE, Y OCULTA EL BOTON MORADO*/
function correcto() {
    boton.disabled = false;

    boton.addEventListener("click", function () {
        isTrue();
        animar();
        boton.style.display = "none";
    });

}
/*PASAMOS LA FUNCION ISNOTTRUE Y REDIRIGE, Y OCULTA EL BOTON MORADO*/
function falso(v) {

    boton.disabled = false;

    boton.addEventListener("click", function () {
        isNotTrue(v);

        boton.style.display = "none";
    });

}
/*LE PASO EL LINK */
function link() {
    if (document.querySelector('.questionsOne')) {
        window.location.href = "../PreguntasHtml/pregunta2.html";
    } else if (document.querySelector('.questionsTwo')) {
        window.location.href = "../PreguntasHtml/pregunta3.html";
    } else if (document.querySelector('.questionsThree')) {
        window.location.href = "../PreguntasHtml/pregunta4.html";
    } else if (document.querySelector('.questionsFive')) {
        window.location.href = "../estadisticas.html";
    }

}


/*Agregar elementos arriba [PREGUNTA 4]*/
function agregar(element) {
    console.log(element);
    let data = window.getComputedStyle(element, ':after').getPropertyValue('content');
    data = data.replace('"', '');
    data = data.replace('"', '');
    console.log('entre en agregar');
    console.log(data);

    const row = document.createElement('div'); //creo un elemento para pasarle un html con los datos ya guardados
    row.setAttribute("class", "col organizar-Respuestas");
    const pregunta4 = document.createElement("code");
    //pregunta4.classList.add('col','sectionOrganizar');

    pregunta4.innerText = data;
    row.appendChild(pregunta4);

    organizar.appendChild(row);
      

}

/*CAMBIA EL COLOR A GRIS [PREGUNTA 4]*/
function cambiarColor(elem,) {
    console.log("entre en cambiar")
    elem.style.backgroundColor = '#72757E';
    elem.style.fontSize = '0px';
    elem.style.height = '30px';
    elem.style.border = '0px';
}


function animar(){

    
        barra.classList.toggle("quinto");
        barra.style.backgroundColor="#2CB67D";
}


/*GUARDAR EN EL LOCAL STORAGE LA VIDA E IR DISMINUYENDOLA */
let contador = document.querySelector('#contador');

cont =  4 ;
if(localStorage.getItem('contador')===null){    
localStorage.setItem('contador', JSON.stringify(cont));
}let contador_Storage = JSON.parse(localStorage.getItem('contador'));
console.log(JSON.parse(localStorage.getItem('contador')))
    contador.innerHTML = ``;
    contador.innerHTML = `<p>${contador_Storage}</p>`;



function cambiarVida(){
    
        boton.addEventListener('click', function (){
            
            if(localStorage.getItem('contador'))
            {
                x = contador_Storage = contador_Storage - 1;

            
                localStorage.setItem('contador', JSON.stringify(x));
    
                let contador_Storage2 = JSON.parse(localStorage.getItem('contador'));
    
                contador.innerHTML = ``;
                contador.innerHTML = `<p>${contador_Storage2}</p>`;
                if(x<=0){
                    localStorage.removeItem('contador');
                    alert();
                }
            }
            
        });
    
    
}

function alert() {
    const alert = document.createElement('div');

    alert.innerHTML = `
    <div class="alert alert-primary" role="alert">
        <p>Te has quedado sin vida <img src="../assets/heart.png"></br> ¡Intentalo de nuevo!</p>
        <a href="../PreguntasHtml/pregunta1.html" class="continuarNottrue" style="background: #17a2be;">Continuar</a>
    </div>
        `;
    ver.innerHTML = "";
    ver.appendChild(alert);

    
}