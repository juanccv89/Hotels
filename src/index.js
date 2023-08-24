// Importación de datos desde la API

import { requestingHotels } from "./hotels.js";

const respuesta = await requestingHotels();
const data = await respuesta.json();

// Creación de etiquetas en el HTML desde JS

const mainSelected = document.getElementById("Main");
const sectionCreated = document.createElement("section");
sectionCreated.className = "HotelsContainer";
mainSelected.appendChild(sectionCreated);

data.forEach((hotel, index) => {
    if (index <= 18) {
        const sectionSelected = document.getElementsByClassName("HotelsContainer");
        const articleCreated = document.createElement("article");
        articleCreated.className = "HotelCard";
        articleCreated.setAttribute("data-categoria", hotel.country);
        articleCreated.setAttribute("data-checkin", hotel.availabilityFrom);
        articleCreated.setAttribute("data-checkout", hotel.availabilityTo);
        articleCreated.setAttribute("data-precio", hotel.price);

        sectionSelected[0].appendChild(articleCreated);

        const articleSelected = document.getElementsByClassName("HotelCard");
        const imageCreated = document.createElement("img");
        imageCreated.className = "HotelCard__Img";
        imageCreated.setAttribute("src", hotel.photo);
        imageCreated.setAttribute("alt", hotel.name);
        articleSelected[index].appendChild(imageCreated);

        const h2Created = document.createElement("h2");
        h2Created.innerText = hotel.name;
        h2Created.className = "HotelCard__Title";
        articleSelected[index].appendChild(h2Created);

        const infoCreated = document.createElement("section");
        infoCreated.className = "HotelCard__Info";
        articleSelected[index].appendChild(infoCreated);

        const countryInfo = document.createElement("div");
        countryInfo.className = "HotelCard__Country-Numbers";
        infoCreated.appendChild(countryInfo);
        
        const countryName = document.createElement("div");
        countryName.className = "HotelCard__Country";
        countryInfo.appendChild(countryName);

        const imgFlagCreated = document.createElement("img");
        imgFlagCreated.className = "HotelCard__Flag";
        imgFlagCreated.setAttribute("alt", "Flag");

        const consulta = hotel.country;

        if (consulta === "Argentina") {
        imgFlagCreated.setAttribute("src", "/argentina.png");
        } else if (consulta === "Brasil") {
        imgFlagCreated.setAttribute("src", "/brasil.png");
        } else if (consulta === "Chile") {
        imgFlagCreated.setAttribute("src", "/chile.png");
        } else if (consulta === "Uruguay") {
        imgFlagCreated.setAttribute("src", "/uruguay.png");
        }

        countryName.appendChild(imgFlagCreated);

        const pCountryCreated = document.createElement("p");
        pCountryCreated.innerText = hotel.country;
        pCountryCreated.className = "HotelCard__CountryName";
        countryName.appendChild(pCountryCreated);

        const countryNumbers = document.createElement("div");
        countryNumbers.className = "HotelCard__Numbers";
        countryInfo.appendChild(countryNumbers);

        const p1NumbersCreated = document.createElement("p");
        p1NumbersCreated.innerText = hotel.rooms + " rooms -";
        p1NumbersCreated.className = "HotelCard__Rooms";
        countryNumbers.appendChild(p1NumbersCreated);

        const p2NumbersCreated = document.createElement("p");
        const precioHotel = hotel.price;
        const simbolosDolar = "$".repeat(precioHotel);
        p2NumbersCreated.innerText = simbolosDolar;
        p2NumbersCreated.className = "HotelCard__Price";
        countryNumbers.appendChild(p2NumbersCreated);

        const buttonCreated = document.createElement("button");
        buttonCreated.innerText = "Book it!";
        buttonCreated.className = "HotelCard__Button";
        articleSelected[index].appendChild(buttonCreated);
    }
});

// Aplicación de filtros

const filterCategory = document.getElementById("filter-countries");
const filterCheckIn = document.getElementById("checkIn");
const filterCheckOut = document.getElementById("checkOut");
const filterPrices = document.getElementById("filter-prices");
const sectionElements = document.querySelector(".HotelsContainer").querySelectorAll(".HotelCard");

const today = new Date().toISOString().split("T")[0];
filterCheckIn.setAttribute("min", today);

filterCategory.addEventListener("change", filterElements);
filterCheckIn.addEventListener("change", filterElements);
filterCheckOut.addEventListener("change", filterElements);
filterPrices.addEventListener("change", filterElements);

function filterByCategory(categoryValue, elements) {
    if (categoryValue === "all") {
    return elements;
    }

return Array.from(elements).filter((HotelCard) => {
    const elementCategory = HotelCard.getAttribute("data-categoria").toLowerCase();
    return elementCategory.includes(categoryValue);
    });
}

function filterByAvailability(checkInValue, checkOutValue, elements) {
    if (!checkInValue || !checkOutValue) {
    return elements;
    }

return Array.from(elements).filter((HotelCard) => {
    const elementCheckIn = parseInt(HotelCard.getAttribute("data-checkin"));
    const elementCheckOut = parseInt(HotelCard.getAttribute("data-checkout"));

    const availabilityDate = elementCheckIn === 0 ? today : new Date(today).getTime() + elementCheckIn;
    return checkInValue <= availabilityDate && checkOutValue >= elementCheckOut;
    });
}

function filterByPrice(priceValue, elements) {
    if (priceValue === "all") {
    return elements;
    }

return Array.from(elements).filter((HotelCard) => {
    const elementPrice = HotelCard.getAttribute("data-precio").toLowerCase();
    return elementPrice === priceValue;
    });
}

function filterElements() {
    const categoryValue = filterCategory.value.toLowerCase();
    const checkInValue = new Date(filterCheckIn.value).getTime();
    const checkOutValue = new Date(filterCheckOut.value).getTime();
    const priceValue = filterPrices.value.toLowerCase();

let filteredElements = sectionElements;

    filteredElements = filterByCategory(categoryValue, filteredElements);
    filteredElements = filterByAvailability(checkInValue, checkOutValue, filteredElements);
    filteredElements = filterByPrice(priceValue, filteredElements);

const errorMessageElement = document.getElementById("error-message");

    if (filteredElements.length === 0) {
    errorMessageElement.textContent = "No search results found. Please refine the entered values.";
    } else {errorMessageElement.textContent = "";
    }

sectionElements.forEach((HotelCard) => {
    if (categoryValue === "all" || filteredElements.includes(HotelCard)) {
        HotelCard.style.display = "block";
    } else {
        HotelCard.style.display = "none";
    }
    });

    if (filteredElements.length === 0) {
        errorMessageElement.style.display = "block";
    } else {
        errorMessageElement.style.display = "none";
    }
}