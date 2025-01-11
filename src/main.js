import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)
app.use(createPinia())
app.component('VueDatePicker', VueDatePicker)
app.mount('#app') 
