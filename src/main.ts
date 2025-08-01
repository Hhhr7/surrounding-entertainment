import './main.scss'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

// 引入 Vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(Vant).use(ElementPlus).mount('#app')

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
