import { createApp } from 'vue'
import App from './App.vue'
import global from './plugins/global.js'


import vuiCard from '@/components/cards/vuiCard.vue'
import vuiSimpleCard from '@/components/cards/vuiSimpleCard.vue'
import vuiListCard from '@/components/cards/vuiListCard.vue'
import vuiTable from '@/components/table/vuiTable.vue'
import vuiSelect from '@/components/inputs/vuiSelect.vue'
import vuiSlide from '@/components/slide/vuiSlide.vue'
import vuiEmpty from '@/components/etc/vuiEmpty.vue'
import vuiLoading from '@/components/etc/vuiLoading.vue'
import vuiPlayer from '@/components/video/vuiPlayer.vue'
import vuiBreadcrumb from '@/components/etc/vuiBreadcrumb.vue'
import vuiStepper from '@/components/stepper/vuiStepper.vue'

import vuiHeader from '@/components/vuiHeader.vue'
import vuiFooter from '@/components/vuiFooter.vue'


const app = createApp(App)
app.use(global)

app.component("vui-card", vuiCard)
app.component("vui-simple-card", vuiSimpleCard)
app.component("vui-list-card", vuiListCard)
app.component("vui-table", vuiTable)
app.component("vui-select", vuiSelect)
app.component("vui-slide", vuiSlide)
app.component("vui-empty", vuiEmpty)
app.component("vui-loading", vuiLoading)
app.component("vui-player", vuiPlayer)
app.component("vui-breadcrumb", vuiBreadcrumb)
app.component("vui-stepper", vuiStepper)


app.component("vui-header", vuiHeader)
app.component("vui-footer", vuiFooter)

app.mount('#app')


