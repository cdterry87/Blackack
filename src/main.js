import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import "bulma/css/bulma.min.css";
import 'vue-material-design-icons/styles.css';

new Vue({
    render: h => h(App),
}).$mount('#app')
