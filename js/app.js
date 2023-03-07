const resultadoHTML = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

const registroPorPagina = 40;
let totalPaginas;
let iterador;

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario);
}


function validarFormulario(e){
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;

    if(terminoBusqueda === '' ){
        mostrarAlerta('Agrega un termino de busqueda')
        return;
    }

    buscarImagenes(terminoBusqueda);

}


function mostrarAlerta(mensaje){

    const existeAlerta = document.querySelector('.bg-red-100');

    if(!existeAlerta){
        const alerta = document.createElement('p');
        alerta.classList.add('bg-red-100', 'boreder-red-100','text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg','mx-auto','mt-6','text-center');
    
        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">${mensaje}</span>
        `;
    
        formulario.appendChild(alerta);
    
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    

    }

 
}

function buscarImagenes(termino){
    const key = '34183634-6baba32c7f07c6e93ddf66235';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=100`;

    // console.log(url); //Recomendado para ver si no esta trayendo bien un link

    fetch(url)
     .then(respuesta => respuesta.json())
     .then(resultado => {
        totalPaginas = calcularPaginas(resultado.totalHits);
        mostrarImagenes(resultado.hits);
     }
      )
}

function * crearPaginador(total){
    console.log(total);
    for(let i = 1; i += total ; i++){
        yield i;
    }
}

function calcularPaginas(total){
    return parseInt(Math.ceil(total/registroPorPagina));
}

function mostrarImagenes(imagenes){
// console.log(imagenes);
// console.log(resultadoHTML)
    while(resultadoHTML.firstChild){
        resultadoHTML.removeChild(resultadoHTML.firstChild);
    
    }

    // ITERAR SOBRE ARREGLOS DE IMAGENES Y CONSTRUIR HTML
   imagenes.forEach(imagen => { 
    
        const {webformatURL, likes, views,largeImageURL} = imagen;
    
        resultadoHTML.innerHTML += `
        <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
        <div class="bg-teal-300">
            <img class="w-full" src="${webformatURL}"/>

        <div class="p-4">
        <p class="font-bold"> ${likes} <span class="italic hover:not-italic">Likes</span></p>
        <p class="font-bold"> ${views} <span class="font-light">Views</span></p>

        <a 
        class="block w-full bg-orange-700 hover:bg-green-600 text-white uppercase font-bold text-center rounded mt-5"
        href="${largeImageURL}" target="_blank" rel="noopner noreferrer">
            See Picture
        <a/>
        </div>
           </div> 
        `;

   });


 

   
    
}


function imprimirPaginador(){
    iterador = crearPaginador(totalPaginas);
}