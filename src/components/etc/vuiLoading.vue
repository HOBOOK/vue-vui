<template>
  <div class="vui-loading">
    로딩중
  </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    mounted() {

    },

}
</script>

<style lang="scss">

.vui-loading{
    text-align: center;
    display: flex;
    justify-items: center;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    padding:64px 0;
    height: 32px;
    width: 100%;
    font-size: 16px;

    .empty-text{
        flex: 0 1 100%;
    }
}

</style>