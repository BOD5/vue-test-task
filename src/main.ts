import { createApp } from 'vue';
import App from './App.vue';

import '@/styles/index.scss';

import 'tippy.js/dist/tippy.css';
import { isWebp } from './helpers/functions';

isWebp();

const app = createApp(App);
app.mount('#app');
