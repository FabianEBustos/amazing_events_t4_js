let urlAPI = 'https://mindhub-xj03.onrender.com/api/amazing';
let eventos = [];
let categories = [];

async function getEventos(){
  try {
    let response = await fetch(urlAPI);    
    let dataAPI = await response.json();
    eventos = dataAPI.events;
    fechaActual = dataAPI.currentDate;
    console.log(fechaActual); 

    categories = extractCategories(eventos);

    loadStats(categories);

  } catch (error) {
    console.log(error.message);
    // return{};
  }
}
getEventos();

//=============================================

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

function loadStats(categories) {
    let container = document.querySelector("tbody");
    let tableBodyHTML = "";
    categories.forEach(category => {
        
    })
}