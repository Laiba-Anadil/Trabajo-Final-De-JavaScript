//CONTACTO HTML
//Coordenadas de la Empresa
const latEmpresa = 39.4699;
const lonEmpresa = -0.3763; 

const map = L.map('map').setView([latEmpresa, lonEmpresa], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Marcador de la empresa
const markerEmpresa = L.marker([latEmpresa, lonEmpresa], {draggable: true})
    .addTo(map)
    .bindPopup('Nuestra empresa está aquí')
    .openPopup();

//Funcion para calcular y mostrar la ruta
function calcularRuta() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition (pos => {
            const latUser = pos.coords.latitude;
            const lonUser = pos.coords.longitude;

            //Marcador del usuario
            const markerUsuario = L.marker([latUser, lonUser])
                .addTo(map)
                .bindPopup('Tu ubicación.')
                .openPopup();

                
            //Mostrar la ruta en el mismo mapa
            L.Routing.control({
                waypoints: [
                    L.latLng(latUser, lonUser),
                    L.latLng(latEmpresa, lonEmpresa)
                ],
                routeWhileDragging: false,
                showAlternatives: false
            }).addTo(map);
        }, 
        () => {
            alert('No se pudo obtener tu ubicación.');
        })
    } else {
        alert('Tu navegador no soporte geolocalizacion.');
    }
}