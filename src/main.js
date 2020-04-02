import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './plugins/event.js'
import 'normalize.css';
// import axios from 'axios';

Vue.config.productionTip = false

// axios.default.headers.common['Authorization']=`Bearer dgtdersf`

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
