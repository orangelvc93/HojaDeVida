console.log("Hoja de Vida Interactiva Cargada");

/* DEFINICIÓN DE VARIABLES ===========================  */
const btnCurso = document.querySelector('#addSkill');
const listaSkill = document.querySelector('#skillsList');
const enviarCorreo = document.querySelector('#enviar');
const validarModal = document.querySelector('#enviar')
const body = document.querySelector('body');

const cursos = document.querySelector('#cursos');
const estudios = document.querySelector('#estudios');
const experiencia = document.querySelector('#listaExperiencia');

const lenguajes = document.querySelector('#lenguajes');
const otros = document.querySelector('#otros');

const califica = document.querySelector('#califica');


/* INICIAR EVENTOS ===========================  */
agregarEventos();
function agregarEventos() {

    btnCurso.addEventListener('click', agregaSkills)
    enviarCorreo.addEventListener('click', mostrarModal)
    califica.addEventListener('click', () => {
        const calificacion = prompt("Del 1 al 10, ¿cómo calificarías mi hoja de vida?");
        alert(`¡Gracias por calificar con un ${calificacion}!`);
    });
}

/* FUNCIONES ===========================  */

/* Agregar Skills ===========================  */
function agregaSkills() {
    const nombreSkill = prompt("Inserte nombre");
    const nivelSkill = prompt("Inserte su % de aprendizaje");

    const skill = document.createElement('li');
    skill.classList.add('list__lineal');

    skill.innerHTML = `
        <div class="title__between">
            <h2>${nombreSkill}</h2>
            <p>${nivelSkill}%</p>
        </div>
        <div class="skills__lineal">
            <div class="progress__lineal color-html" style="width: ${nivelSkill}%;">
            </div>
        </div>
    `;

    listaSkill.appendChild(skill)
}


/* Modal al enviar mensaje ===========================  */
function mostrarModal() {


    const modal = document.createElement('div');
    modal.classList.add('modal__fondo');

    modal.innerHTML = `
        <div class="modal__envio">
            <p class="modal__texto">
                Tu mensaje está siendo enviado, <br> me pondré en contacto contigo pronto
            </p>
            <img class="modal__img" src="/assets/img/astro-send.webp" alt="Astronauta envío">
        </div>
    `;

    body.appendChild(modal)
    setTimeout(function () {
        // Cierra el modal
        modal.style.display = "none";
    }, 5000);
}


/* LLENAR SECCION DE CURSO ===========================  */
async function agregarDatos() {
    // llamado a la db en json

    const jsonData = await fetch("../assets/json/listaCurso.json").then(response => response.json());

    /* Agregando texto plano */
    // Función para agregar los elementos a la lista HTML
    function agregarElementos(tabla, elementoHTML) {
        const lista = jsonData.filter(table => table.name === tabla);
        for (let i = 0; i < lista[0].columns.length; i++) {
            const { nombre, pais, instituto, fechaFin } = lista[0].columns[i];

            const curso = document.createElement('li');
            curso.classList.add('list');

            curso.innerHTML = `
            <h4 class="list__title">${nombre}
                <span>${pais}</span>
            </h4>
            <h4 class="list__subtitle">${instituto}</h4>
            <p>${fechaFin}</p>
        `;
            elementoHTML.appendChild(curso);
        }
    }

    /* Agregando barras de % */
    /* Funcion para agregar los datos a las barras HTML */
    function agregarBarras(tabla, elementoHTML) {
        const lista = jsonData.filter(table => table.name === tabla);
        for (let i = 0; i < lista[0].columns.length; i++) {
            const { nombre, porcentaje, color } = lista[0].columns[i];

            const elemento = document.createElement('li');
            elemento.classList.add('list__lineal');

            elemento.innerHTML = `
                <div class="title__between">
                    <h2>${nombre}</h2>
                    <p>${porcentaje}%</p>
                </div>
                <div class="skills__lineal">
                    <div class="progress__lineal ${color}" style="width: ${porcentaje}%;">
                </div>
                </div>
            `;
            elementoHTML.appendChild(elemento)
        }
    }

    // Agregar la experiencia
    agregarElementos("listaExperiencia", experiencia);

    // Agregar estudios
    agregarElementos("listaEstudios", estudios);

    // Agregar los cursos
    agregarElementos("listaCursos", cursos);

    // Agregar los lenguajes
    agregarBarras("listaLenguajes", lenguajes);

    // Agregar los lenguajes
    agregarBarras("listaSkills", skillsList);

    // Agregar los lenguajes
    agregarBarras("listaOtros", otros);

}

window.onload = agregarDatos;






