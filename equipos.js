document.getElementById("buscador").addEventListener("submit", function(event) {
    event.preventDefault();
    let pais = document.getElementById("paises").value.toLowerCase();  // Convertir a minúsculas para la comparación
    consultarEquipos(pais);
});

function consultarEquipos(pais) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        let equipos = JSON.parse(xhr.responseText).TEAM;
        mostrarequipo(pais, equipos);
    };
    xhr.open("GET", "equipos.json");
    xhr.send();
}

function mostrarequipo(pais, equipos) {
    let equipo = null;
    for (let i = 0; i < equipos.length; i++) {
        if (equipos[i].pais === pais) {
            equipo = equipos[i];
            break;
        }
    }

    if (equipo) {
        let tarjeta = "<h1>MEJORES JUGADORES</h1><div id='tarjeta'>";
        for (let i = 0; i < equipo.jugadores.length; i++) {
            if (equipo.jugadores[i] && equipo.imagen[i]) {  // Comprobar que haya datos de jugadores e imágenes
                tarjeta += "<div id='jugador'><img src='" + equipo.imagen[i] + "' alt='Imagen de " + equipo.jugadores[i] + "'><h3> " + equipo.jugadores[i] + "</h3></div>";
            }
        }
        tarjeta += "</div>";
        document.getElementById("resultado").innerHTML = tarjeta;
    } else {
        document.getElementById("resultado").innerHTML = "<p>No se encontraron equipos para el país especificado.</p>";
    }
    document.getElementById("limpiar").addEventListener("click", function() {
        document.getElementById("resultado").innerHTML = "";
    })
}