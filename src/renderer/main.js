import Vue from 'vue';

import App from './App';
import store from './store';

import { VueSpinners } from '@saeris/vue-spinners'

import "weathericons/sass/weather-icons.scss";
import "weathericons/sass/weather-icons-wind.scss";

if (!process.env.IS_WEB) {
    Vue.use(require('vue-electron'));
}

Vue.use(VueSpinners)
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
