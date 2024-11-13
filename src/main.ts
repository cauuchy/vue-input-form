import 'bootstrap/dist/css/bootstrap.min.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'; // ルーターをインポート

const app = createApp(App);
app.use(router); // ルーターをアプリケーションに適用
app.mount('#app');