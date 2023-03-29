import {page} from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';
import {showDashboard} from './views/dashboard.js';



page('/index.html',showDashboard);

page.start();
