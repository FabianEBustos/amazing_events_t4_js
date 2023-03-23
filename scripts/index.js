let urlAPI = 'https://mindhub-xj03.onrender.com/api/amazing';
let eventos = [];
let categories = [];
let inputBusqueda = document.querySelector("input[name=search]");
let checkboxes;

async function getEventos(){
  try {
    let response = await fetch(urlAPI);    
    let dataAPI = await response.json();
    eventos = dataAPI.events;
    fechaActual = dataAPI.currentDate;
    console.log(fechaActual);     
 
    //Array cargado con todos los eventos

    // createCards(eventos);    // renderCards
    renderCards(eventos);

    categories = extractCategories(eventos);

    renderCheckboxes(categories);

    checkboxes = document.querySelectorAll("input[type=checkbox]");

    checkboxes.forEach(checkbox => {
      checkbox.addEventListener("change", () => {
        renderSearch();
      })
    })

  } catch (error) {
    console.log(error.message);
    // return{};
  }
}
getEventos();

//=============================================

function renderCards(eventos){
  let container = document.querySelector("#principal");
    let htmlCards = "";
    eventos.forEach(evento => htmlCards += crearCard(evento));
    container.innerHTML = htmlCards;
}

function crearCard(evento){
  return `<div class="card my-3">
      <img src="${evento.image}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${evento.name}</h5>
        <p class="card-text">${evento.description}</p>
        <div class="card_info">
          <span>Precio: $ ${evento.price}</span>
          <a href="./details.html?id=${evento._id}" class="btn btn-primary">Ver más...</a>
        </div>
      </div>
    </div>
  `
}

function createCards(resul){
  resul.forEach(evento =>{
    let cardDivPpal = document.createElement("div");
    let cardImg = document.createElement("img");
    let cardDiv2 = document.createElement("div");
    let cardH5 = document.createElement("h5");
    let cardParfo = document.createElement("p");
    let cardDiv3 = document.createElement("div");
    let cardSpan = document.createElement("span");
    let cardLink = document.createElement("a");
    cardDivPpal.innerHTML = "";

    cardImg.src = evento.image;
    cardImg.classList.add("card-img-top");
    cardH5.textContent = evento.name;
    cardH5.classList.add("card-title");

    cardParfo.textContent = evento.description;
    cardParfo.classList.add("card-text");

    cardSpan.textContent = "Price: $" + evento.price;

    cardLink.href = "./details.html?id=";
    cardLink.innerHTML = "Ver más...";
    cardLink.classList.add("btn", "btn-primary");

    cardDiv3.classList.add("card_info");
    cardDiv3.appendChild(cardSpan);
    cardDiv3.appendChild(cardLink);

    cardDiv2.classList.add("card-body");
    cardDiv2.appendChild(cardH5);
    cardDiv2.appendChild(cardParfo);
    cardDiv2.appendChild(cardDiv3);

    cardDivPpal.classList.add("card", "my-3");
    cardDivPpal.appendChild(cardImg);
    cardDivPpal.appendChild(cardDiv2);

    let ppal = document.getElementById("principal");
    ppal.appendChild(cardDivPpal);
  })
}

function extractCategories(eventos){
  eventos.forEach(evento => {
    // console.log(evento.category);
    if (!categories.includes(evento.category)) {
      categories.push(evento.category);
    }
  });
  // console.log(categories);
  return categories;
}

function renderCheckboxes(categories) {
  let container = document.querySelector(".checks");
  container.innerHTML = categories.map(category =>
    `<label>
      <input type="checkbox" name="categories"
      value="${category}">
      <span>${category}</span>
    </label>`).join("");
}
console.log(inputBusqueda);
inputBusqueda.addEventListener("input", () => {
  renderSearch();
});

function getChequeados() {
  let chequeados = [];
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      chequeados.push(checkbox.value);
    }
  });
  return chequeados;
}

function renderSearch() {
  //Filtrado por Busqueda
  let textoBusqueda = inputBusqueda.value;
  let tiposChequeados = getChequeados();
  console.log('--> ',tiposChequeados); // <-- OK

  let resultados = eventos.filter(evento => evento.name.toLowerCase().
  includes(textoBusqueda.toLowerCase()));
  console.log("Filtro x busqueda", resultados);

  //Filtrado por Checkbox

  if(tiposChequeados.length > 0) {
    console.log(tiposChequeados.length,' seleccionados');
    console.log('Categorias de Tipos Chequeados ',tiposChequeados);
    resultados = resultados.filter(evento => {      
      // Metodo 1 -- OK
      let pasaFiltro = false;
        if(tiposChequeados.includes(evento.category))
        {
          pasaFiltro = true;
          console.log("Pasó")
        }else{
          console.log("No pudo pasar");
        }
      return pasaFiltro;
       // Metodo 2 -- Revisar
      // return tiposChequeados.some(tipo => 
      //   eventos.includes(tipo));
    });
    console.log('Filtrados ',resultados);
  }
  console.log('resultados filtrados ',resultados);
  // createCards(resultados);
  renderCards(resultados);
}






  // let container = document.querySelector('#principal');
  // let htmlCards = "";
  // eventos.forEach(evento => htmlCards += createCard(evento));
  // container.innerHTML = htmlCards;
// }
// function createCard(evento){
//   return`<div class="evento">
//   <img src="${evento.image}" alt="${evento.name}">
//   <p>${evento.description}</p>
//   <div class="text">
//     <h4>#${evento.id.toString().padStart(3,'0')}</h4>
//     <h3>${evento.name}</h3>
    
//   </div>
//   </div>`;
// }






// let eventos = [
//     {
//         "_id": 1,
//         "image":"https://i.postimg.cc/Fs03hQDt/Collectivities-Party.jpg",
//         "name":"Collectivities Party",
//         "date":"2021-12-12",
//         "description":"Enjoy your favourite dishes, from different countries, in a unique event for the whole family.",
//         "category":"Food Fair",
//         "place":"Room A",
//         "capacity":45000,
//         "assistance":42756,
//         "price":5
//       }
//   ];

  // eventos.forEach(evento =>{
  //   console.log('Esto es un evento');
  //   let cardDivPpal = document.createElement("div");
  //   let cardImg = document.createElement("img");
  //   let cardDiv2 = document.createElement("div");
  //   let cardH5 = document.createElement("h5");
  //   let cardParfo = document.createElement("p");
  //   let cardDiv3 = document.createElement("div");
  //   let cardSpan = document.createElement("span");
  //   let cardLink = document.createElement("a");

  //   cardImg.src = evento.image;
  //   cardImg.classList.add("card-img-top");
  //   cardH5.textContent = evento.name;
  //   cardH5.classList.add("card-title");

  //   cardParfo.textContent = evento.description;
  //   cardParfo.classList.add("card-text");

  //   cardSpan.textContent = "Price: $" + evento.price;

  //   cardLink.href = "./details.html?id=";
  //   cardLink.innerHTML = "Ver más...";
  //   cardLink.classList.add("btn", "btn-primary");

  //   cardDiv3.classList.add("card_info");
  //   cardDiv3.appendChild(cardSpan);
  //   cardDiv3.appendChild(cardLink);

  //   cardDiv2.classList.add("card-body");
  //   cardDiv2.appendChild(cardH5);
  //   cardDiv2.appendChild(cardParfo);
  //   cardDiv2.appendChild(cardDiv3);

  //   cardDivPpal.classList.add("card", "my-3");
  //   cardDivPpal.appendChild(cardImg);
  //   cardDivPpal.appendChild(cardDiv2);

  //   let ppal = document.getElementById("principal");
  //   ppal.appendChild(cardDivPpal);
  // })


// for (let i = 0; i < eventos.length; i++) {
//     let cardDivPpal = document.createElement("div");
//     let cardImg = document.createElement("img");
//     let cardDiv2 = document.createElement("div");
//     let cardH5 = document.createElement("h5");
//     let cardParfo = document.createElement("p");
//     let cardDiv3 = document.createElement("div");
//     let cardSpan = document.createElement("span");
//     let cardLink = document.createElement("a");

//     cardImg.src = eventos[i].image;
//     cardImg.classList.add("card-img-top");
//     cardH5.textContent = eventos[i].name;
//     cardH5.classList.add("card-title");

//     cardParfo.textContent = eventos[i].description;
//     cardParfo.classList.add("card-text");

//     cardSpan.textContent = "Price: $" + eventos[i].price;

//     cardLink.href = "./details.html?id=";
//     cardLink.innerHTML = "Ver más...";
//     cardLink.classList.add("btn", "btn-primary");

//     cardDiv3.classList.add("card_info");
//     cardDiv3.appendChild(cardSpan);
//     cardDiv3.appendChild(cardLink);

//     cardDiv2.classList.add("card-body");
//     cardDiv2.appendChild(cardH5);
//     cardDiv2.appendChild(cardParfo);
//     cardDiv2.appendChild(cardDiv3);

//     cardDivPpal.classList.add("card", "my-3");
//     cardDivPpal.appendChild(cardImg);
//     cardDivPpal.appendChild(cardDiv2);

//     let ppal = document.getElementById("principal");
//     ppal.appendChild(cardDivPpal);

// }