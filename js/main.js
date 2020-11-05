let listEl = null;

const init = () => {

    listEl = document.querySelector('ul');
    const centerLoc = [46.858859, 2.3470599];

    // const locations = [{
    //     name: 'Arc de Triomphe',
    //     lat: 48.8737917,
    //     lon: 2.2950275 
    // }, {
    //     name: 'Musée du Louvre',
    //     lat: 48.8606111,
    //     lon: 2.33545
    // }, {
    //     name: 'Les Invalides',
    //     lat: 48.8561572,
    //     lon: 2.3083152
    // }];

    const map = L.map('map').setView(centerLoc, 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // addMarkerToMap(locations[0], map);
    // addMarkerToMap(locations[1], map);
    // addMarkerToMap(locations[2], map);

    

    const locations = administrativeHeadquarters.map((hq) => {
        const props = hq.properties;
        
        const name = `${props.Commune} - ${props.DeptNom}`;
        const lat = props.LatDD;
        const lon = props.LonDD;
        // console.log('name', name);
        // console.log('lat', lat);
        // console.log('---');

        return {
            name,
            lat,
            lon
        };
    }); 

    // console.log(locations);

    const frag = document.createDocumentFragment();
    locations.forEach((location) => {
        // console.log(location.name);
        const liEl = document.createElement('li');
        liEl.innerText = location.name;
        liEl.dataset.lat = location.lat;
        liEl.dataset.lon = location.lon;

        // listEl.append(liEl);
        frag.appendChild(liEl);
        addMarkerToMap(location, map);
    });

    listEl.append(frag);

    listEl.addEventListener('click', ({ target }) => {
        console.log(target);
        if (target.nodeName !== 'LI') {
            return;
        }
        const lat = Number(target.dataset.lat);
        const lon = Number(target.dataset.lon);

        console.log(lat, lon);
        map.flyTo([lat, lon], 11);
    });
    
};

const addMarkerToMap = ({
    lat,
    lon,
    name
}, map) => {
    L.marker([lat, lon]).addTo(map)
        .bindPopup(name);
};

window.onload = init;