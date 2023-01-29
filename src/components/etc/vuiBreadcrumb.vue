<template>
  <div class="vui-breadcrumb container-width">
    <span 
      class="vui-breadcrumb-item"
      :class="item.disalbed ? 'disabled' : ''"
      v-for="(item, idx) in items"
      :key="'vbi-' + item.path"
    >
      <span :class="item.target ? 'target' : ''" @click="goRoute(item.path)">{{$t(item.title)}}</span>
      
      <span class="right" v-if="idx !== items.length - 1">
        <img src="@/assets/image/arrow-right.svg/" alt="arrow" height="12"/>
      </span>
    </span>
  </div>
</template>

<script>
export default {
    computed:{
      items() {
        let items = []

        if(this.$route.matched.length > 0) {
          items.push({
            title:'홈',
            path:'/'
          })
        }

        for(let i = 0; i < this.$route.matched.length; i++) {
          if(this.$route.matched[i].name) {
            items.push({
              title: this.$route.matched[i].name,
              path: this.$route.matched[i].path,
              target: i === this.$route.matched.length - 1
            })
          }
        }

        return items
      }
    },
    data() {
        return {
        }
    },
    methods:{
      goRoute(path){
        this.$router.push(path)
      }
    }

}
</script>

<style lang="scss">

.vui-breadcrumb{
    margin:0 auto;
    width:100%;
    text-align: right;
    top:$header-height;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-content: center;

    .vui-breadcrumb-item{
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 12px;

      &:hover{
        text-decoration: underline;
      }

      &.disabled{
        cursor: default;
        &:hover{
          text-decoration: none;
        }
      }

      .target{
        font-weight: bold;
      }
    }

    .right{
      cursor: default;
      width:12px;
      height: 12px;
      line-height: 12px;
      margin:0 6px;
      display: inline-block;
      position: relative;
      text-align: center;
      img{
        width: 8px;
        height: 8px;
        object-fit: contain;
      }

      
    }
}

</style>