const queryString = location.search;

const params = new URLSearchParams(queryString);

const id =params.get("id");

let urlAPI = 'https://mindhub-xj03.onrender.com/api/amazing';

let eventos;

let fechaActual;

async function getEventos(){
    try {
      let response = await fetch(urlAPI);    
      let dataAPI = await response.json();
      eventos = dataAPI.events;
      fechaActual = dataAPI.currentDate;
      console.log(fechaActual);     
   
      detalles(eventos);
  
    } catch (error) {
      console.log(error.message);

    }
}
// const operacion = sumar(222, 11);
// uno(223, 56);

getEventos();

function detalles(eventos) {
    const eventDetail = eventos.find(event => event._id == id);
    createCard();
    function createCard(){


        const detailCard = document.querySelector('.details');
        card = `<div class="d-flex h-100 flex-md-row flex-column">
                <div class="col d-flex justify-content-center">
                    <img id="detail-img" src="${eventDetail.image}" class="img-fluid w-100 rounded-start" alt="...">
                </div>
                <div class="d-flex col align-items-center">
                    <div class="card-body">
                        <h5 class="card-title">${eventDetail.name}</h5>
                        <p class="card-text">${eventDetail.description}</p>
                        <div class="d-flex flex-wrap flex-column flex-sm-row border-top border-1 border-secondary">
                            <div class="d-flex text-center align-items-center justify-content-center card-text col-sm-6 col-12">
                                <i class="bi bi-person-square text-danger fs-1 pe-2"></i>
                                <span class="col-7">Capacity: ${eventDetail.capacity}</span>
                            </div>
                            <div class="d-flex text-center align-items-center justify-content-center card-text col-sm-6 col-12">
                                <i class="bi bi-currency-dollar text-danger fs-1 pe-2"></i>
                                <span class="col-7">Price: ${eventDetail.price}</span>
                            </div>
                            <div class="d-flex text-center align-items-center justify-content-center card-text col-sm-6 col-12">
                                <i class="bi bi-bookmark-fill text-danger fs-1 pe-2"></i>
                                <span class="col-7">Category: ${eventDetail.category}</span>
                            </div>
                            <div class="d-flex text-center align-items-center justify-content-center card-text col-sm-6 col-12">
                                <i class="bi bi-geo-alt-fill text-danger fs-1 pe-2"></i>
                                <span class="col-7">Place: ${eventDetail.place}</span>
                            </div>
                            <div class="d-flex text-center align-items-center justify-content-center card-text col-sm-6 col-12">
                                <i class="bi bi-calendar-event text-danger fs-1 pe-2"></i>
                                <span class="col-7">Date: ${eventDetail.date}</span>
                            </div>
                            <div class="d-flex text-center align-items-center justify-content-center card-text col-sm-6 col-12">
                                <i class="bi bi-person-fill-up text-danger fs-1 pe-2"></i>
                                <span class="col-7"> ${(eventDetail.assistance != undefined) ? ("Assistance: ") : ("Estimate: ")}  ${(eventDetail.assistance != undefined) ? (eventDetail.assistance) : (eventDetail.estimate)}</span>
                            </div>
    
                        </div>
                    </div>
                </div>
            </div>`
    
        detailCard.innerHTML = card;
    }
}
// const eventoss = data.find(evento => evento._id === id);

// const div = document.querySelector(".details");
// div.innerHTML = `<div class="card2">
// div class="card-body2">
// <img src="${eventos.image}" alt="foto de ${eventos.name}">
// <h5 class="card-title">${eventos.name}</h5>
// <a href=./inicio.html">Inicio</a>
// </div>
// </div>`