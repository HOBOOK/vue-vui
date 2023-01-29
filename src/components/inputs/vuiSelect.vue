<template>
<div class="vui-input" :class="fullWidth ? 'full' : ''">
    <label v-if="label" class="vui-input-label" for="select">{{label}}</label>
    <div class="select">
        <select
            name="select" 
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :class="[label ? 'label' : '', {empty : !modelValue}]"
            :required="required"
        >
            <option v-if="placeholder" value="" class="placeholder">{{placeholder}}</option>
            <option
                v-for="(opt, idx) in items"
                :key="'vui-input-option-' + idx"
                :value="opt[itemValue] ? opt[itemValue] : opt"
            >
                {{opt[itemKey] ? opt[itemKey] : opt }}
            </option>
        </select>
        <div class="arrow">
            <span/>
            <span/>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props:{
        content:{
            type: Object,
            default: () => {
                return null
            }
        },
        modelValue: {
            type: String,
            default: '',
            required:true
        },
        itemKey:{
            type: String,
            default: ''
        },
        itemValue:{
            type: String,
            default: ''
        },
        items: {
            type: Array,
            default: () => {
                return []
            }
        },
        label:{
            type:String,
            default: () => {
                return ''
            }
        },
        placeholder:{
            type:String,
            default: () => {
                return ''
            }
        },
        required:{
            type:Boolean,
            default: false
        },
        fullWidth:{
            type: Boolean,
            default: false
        }
    },
    data() {
        return {

        }
    },
    mounted() {

    },
    methods:{
        
    }

}
</script>

<style lang="scss" scoped>
</style>