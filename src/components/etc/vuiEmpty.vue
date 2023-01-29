<template>
  <div class="vui-empty">
    <div class="empty-text">{{!text ? this.$t('콘텐츠없음') : text}}</div>
  </div>
</template>

<script>
export default {
    props:{
        text:{
            type: String,
            default: ''
        }
    },
    data() {
        return {

        }
    },
    mounted() {

    },

}
</script>

<style lang="scss">

.vui-empty{
    text-align: center;
    display: flex;
    justify-items: center;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    padding:64px 0;
    height: 25vh;
    width: 100%;
    font-size: 16px;

    .empty-text{
        flex: 0 1 100%;
    }
}

</style>