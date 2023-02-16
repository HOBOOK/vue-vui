<template>
<div>
  <div v-if="content" class="card-content-container ">
    <div class="vui-main-content-title">
      <div class="page-subtitle">
        {{subtitle}}
      </div>
      <div class="page-title">
        {{title}}
      </div>
      <div class="page-subtitle">
        {{date}}
      </div>
    </div>

    <div class="page-contents" v-html="content">
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ContentIndex',
  props:{
    title:{
      type:String,
      default:''
    },
    subtitle:{
      type:String,
      default:''
    },
    date:{
      type:String,
      default:''
    },
    content:{
      type:String,
      default:''
    },
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

<style lang="scss">
.card-content-container{
  max-width: $view-optimal-max-width;
  width:calc(100% - 24px) !important;
  margin:0 auto 64px auto;
  padding:12px 0 64px 0;
  border-bottom: 1px solid $base-border-color;

  .page-contents {
    text-align: left;
    padding:64px 0;
    font-size: 15px;

    img{
      max-width:100% !important;
      object-fit: contain !important;
    }
  }

  .content-attachment-wrap{
    margin:16px 0;
    height:32px;
    line-height: 32px;
    a {
      color: $base-foreground-subtitle-color !important;
      display: inline-flex;
      justify-content: center;
      align-content: center;
      vertical-align: middle;
      border:1px solid $base-border-color;
      border-radius: 4px;
      padding:2px 0 2px 8px;
      &:hover{
        text-decoration: underline;
      }
      margin: 0 8px;
      
      img{
        padding:8px;
        filter: brightness(0) saturate(100%) invert(39%) sepia(5%) saturate(5%) hue-rotate(339deg) brightness(96%) contrast(81%);
      }
    }
  }

  .content-tags-wrap{
    width:100%;
    font-size: 13px;
    padding:32px 0;
    color: $base-foreground-subtitle-color;
    > span{
      cursor: pointer;
      border:0;
      padding:10px 12px;
      border-radius: 12px;
      margin:6px;
      background-color: $base-button-default-background-color;
    }
  }

  .content-share-wrap{
    width:100%;
    margin:32px 0;
    > .vui-button{
      border-radius: 100%;
      background-color: $base-background-color;
      border:1px solid $base-border-color;
      width:48px;
      height:48px;
      margin:8px;
      position: relative;

      img{
        position: absolute;
        left:calc(50% - 9px);
        top:calc(50% - 9px);
      }

      > span{
        font-size:12px;
        position: absolute;
        width:20px;
        height:20px;
        bottom:-38px;
        left:calc(50% - 10px);
      }

      &:hover{
        background-color: $base-button-hover-color;
      }
    }
  }

  

  
}

.content-navigator{
  width:100%;
  padding: 24px 0 0 0;
  margin:48px 0 0 0;

  .list-button{
    margin:48px 0;
    text-align: center;
    > .vui-button{
      padding:16px 32px;
      font-weight: bold !important;
    }
  }

  h2{
    font-size: 28px;
    font-weight: blod;
    text-align: left;
    margin-top: 64px;
    padding:0;

    @media screen and (max-width: #{$breakpoint-md}) {    
      font-size: 18px;
    }

    strong{
      color: $base-primary-color;
    }
  }
  

  .featured-list{
    margin:24px 0 0 0;

    display: flex;
    flex-direction: row;
    row-gap: 24px;
    width:100%;
    max-width:100%;
    flex-wrap: wrap;
    justify-content: space-between;

    
    
  }
}


</style>
