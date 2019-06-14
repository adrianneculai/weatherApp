document.getElementById("vremea").addEventListener("click", vremea);
document.getElementById("prognoza").addEventListener("click", prognoza);

var URL_CURRENT_WEATHER = "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";
var URL_FORECAST_WEATHER = "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";
var URL_WEATHER_ICON_PREFIX = "http://openweathermap.org/img/w/"; // sufix .png



function vremea() {
    var inputNume = document.getElementById("afisVrm").value;

    if (inputNume == "bucuresti") {
        inputNume = "bucharest";
    }

    console.log(inputNume);
    var xhr = new XMLHttpRequest();

    xhr.open("GET", URL_CURRENT_WEATHER + inputNume, true);
    // xhr.open("GET", URL_WEATHER_ICON_PREFIX + inputNume + ".png")

    xhr.onload = function () {
        if (this.status == 200) {
            var vremeAstazi = JSON.parse(this.responseText);
            console.log(vremeAstazi);
            var lista = document.querySelectorAll("li");
            console.log(lista);
            lista[0].innerHTML = `<img src="http://openweathermap.org/img/w/${vremeAstazi.weather[0].icon}.png">`;
            lista[1].innerHTML = `Descriere: <b>${vremeAstazi.weather[0].description} </b>`;
            lista[2].innerHTML = `Umiditate: <b>${vremeAstazi.main.humidity} g/m<sup>3</sup></b>`;
            lista[3].innerHTML = `Presiune: <b>${vremeAstazi.main.pressure} mb</b>`;
            lista[4].innerHTML = `Temperatura curenta: <b>${vremeAstazi.main.temp}<sup>o</sup>C</b>`;
            lista[5].innerHTML = `Minima zilei: <b>${vremeAstazi.main.temp_min}<sup>o</sup>C</b>`;
            lista[6].innerHTML = `Maxima zilei: <b>${vremeAstazi.main.temp_max}<sup>o</sup>C</b>`;
            eraseMap();
            harta(vremeAstazi.coord.lon, vremeAstazi.coord.lat);
        } else {
            alert("date indisponibile");
        }

    }
    xhr.send();
}

function harta(lng, lat) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGVtaXJ1Z2UiLCJhIjoiY2p3dm9zNmhoMWl5djN6cDVzenQwem9scCJ9.89Vq1hap3JzpcxvNsQcd0A';
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [lng, lat], // starting position [lng, lat]
        zoom: 12 // starting zoom
    });
}

function prognoza() {
    erase();
    var inputNume = document.getElementById("afisVrm").value;
    if (inputNume == "bucuresti") {
        inputNume = "bucharest";
    }

    console.log(inputNume);
    var xhr = new XMLHttpRequest();

    xhr.open("GET", URL_FORECAST_WEATHER + inputNume, true);
    // xhr.open("GET", URL_WEATHER_ICON_PREFIX + inputNume + ".png")

    xhr.onload = function () {
        if (this.status == 200) {
            var progCinci = JSON.parse(this.responseText);
            console.log(progCinci);

            var data = new Date();
            var dataAzi = data.getDate();
            var dataMili = data.getTime() / 1000;
            console.log(dataAzi);
            console.log(dataMili);


            for (var j = 0; j < 5; j++) {


                if (j == 0) {

                    let a = 0;
                    wraper = "wrp1";
                    document.getElementById("wrp1").innerHTML +=
                        ` <div class="ziua"> Ziua: ${progCinci.list[a].dt_txt.substr(8, 2)}/${progCinci.list[a].dt_txt.substr(5, 2)}/${progCinci.list[a].dt_txt.substr(0, 4)}
                        </div>`;

                } else if (j == 1) {
                    let a = 6;
                    wraper = "wrp2";
                    document.getElementById("wrp2").innerHTML +=
                        ` <div class="ziua"> Ziua: ${progCinci.list[a].dt_txt.substr(8, 2)}/${progCinci.list[a].dt_txt.substr(5, 2)}/${progCinci.list[a].dt_txt.substr(0, 4)}
                    </div>`;
                } else if (j == 2) {

                    let a = 12;
                    wraper = "wrp3";
                    document.getElementById("wrp3").innerHTML +=
                        ` <div class="ziua"> Ziua: ${progCinci.list[a].dt_txt.substr(8, 2)}/${progCinci.list[a].dt_txt.substr(5, 2)}/${progCinci.list[a].dt_txt.substr(0, 4)}
                    </div>`;

                } else if (j == 3) {

                    let a = 23;
                    wraper = "wrp4";
                    document.getElementById("wrp4").innerHTML +=
                        ` <div class="ziua"> Ziua: ${progCinci.list[a].dt_txt.substr(8, 2)}/${progCinci.list[a].dt_txt.substr(5, 2)}/${progCinci.list[a].dt_txt.substr(0, 4)}
                    </div>`;

                } else if (j == 4) {

                    let a = 30;
                    wraper = "wrp5";
                    document.getElementById("wrp5").innerHTML +=
                        ` <div class="ziua"> Ziua: ${progCinci.list[a].dt_txt.substr(8, 2)}/${progCinci.list[a].dt_txt.substr(5, 2)}/${progCinci.list[a].dt_txt.substr(0, 4)}
                    </div>`;
                }
                for (var i = 0; i < progCinci.list.length; i++) {
                    // console.log("Data vreme ", progCinci.list[i].dt, "este mai ? ", "data de azi= ", dataAzi + (60 * 60 * 24))

                    if (progCinci.list[i].dt_txt.substr(8, 2) == dataAzi + j && dataMili < progCinci.list[i].dt) {
                        draw(
                            `<img src="http://openweathermap.org/img/w/${progCinci.list[i].weather[0].icon}.png">`,
                            `Ora: ${progCinci.list[i].dt_txt.substr(10, 6)}`,
                            `Temperatura: ${progCinci.list[i].main.temp}<sup>o</sup>C`,
                            `Descriere: ${progCinci.list[i].weather[0].description}`,
                            wraper
                        );
                    }
                }
            }
        } else {
            alert("date indisponibile");
        }
    }
    xhr.send();
}

function draw(icon, ora, temp, descriere, wraper) {
    var date = document.getElementById(wraper);
    date.innerHTML += `<ul class="center">
<li>${icon}</li>
<li>${ora}</li>
<li>${temp}</li>
<li>${descriere}</li>
</ul>
`}

function erase() {
    document.getElementById("wrp1").innerHTML = "";
    document.getElementById("wrp2").innerHTML = "";
    document.getElementById("wrp3").innerHTML = "";
    document.getElementById("wrp4").innerHTML = "";
    document.getElementById("wrp5").innerHTML = "";
}


function eraseMap() {
    document.getElementById("map").innerHTML = "";
}
