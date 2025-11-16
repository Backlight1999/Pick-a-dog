import { initPerros } from './modules/perros.js';
import { initRunners, initOwnersRunnersList } from './modules/runners.js';
import { initRatings } from './modules/ratings.js';
import { initPagos } from './modules/pagos.js';
import { initMapView } from './modules/maps.js';
import { initIndexPage } from './modules/indexPage.js';

// DOMContentLoaded to be safe; module scripts are deferred but this is explicit
window.addEventListener('DOMContentLoaded', () => {
    try {
        initIndexPage();
        initPerros();
        initRunners();
        initOwnersRunnersList();
        initRatings();
        initPagos();
        initMapView();
    } catch (err) {
        console.error('Error inicializando módulos:', err);
    }
});
