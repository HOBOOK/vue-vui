import vuiCard from '@/components/cards/vuiCard.vue'
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

const components = [
    vuiCard,
    vuiTable,
    vuiSelect,
    vuiSlide,
    vuiEmpty,
    vuiLoading,
    vuiPlayer,
    vuiBreadcrumb,
    vuiStepper,
    vuiHeader,
    vuiFooter
];
  
const install = function(Vue) { 
    components.forEach(component => {
      Vue.component(component.name, component);
    });
};
  
  /* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
  
export default {
    First,
    Second
}