<template>
<div>
  <div v-if="content" class="card-content-container ">
    <div class="vui-main-content-title">
      <div class="page-subtitle">
        {{content.category}}
      </div>
      <div class="page-title">
        {{content.title}}
      </div>
      <div class="page-subtitle">
        {{content.editedDate}}
      </div>
    </div>

    <div class="page-contents ql-editor" v-html="content.content">
    </div>

    <div class="content-attachment-wrap" v-if="content.attachment">
      <a target="_blank" :href="content.attachment.url" :download="content.attachment.filename">
        {{content.attachment.filename}} 
        <img alt="download" src="@/assets/image/download.svg" height="16"/>
      </a>
    </div>

    <div v-if="!previewContent" class="content-share-wrap">
      <button class="vui-button"  @click="copyUrl()"><img src="@/assets/image/link.svg" alt="list" height="18" width="18"/>
      </button>
      <button class="vui-button"  @click="like()"><img src="@/assets/image/like.svg" alt="list" height="18" width="18"/>
        <span>{{ this.content.likeCount || 0 }}</span>
      </button>
      <button class="vui-button"  @click="print()"><img src="@/assets/image/print.svg" alt="list" height="18" width="18"/>
      </button>
    </div>

    <div class="content-tags-wrap">
      <span
        v-for="tag in content.hashTags"
        :key="tag"
        @click="goList(tag)"
      >
        #{{tag}}
      </span>
    </div>
  </div>

  <div v-if="content && !previewContent" class="content-navigator">

      <div class="list-button">
        <button class="vui-button"  @click="goList()">{{$t('목록보기')}}</button>
      </div>

      
      <h2>
        <strong>{{content.category}}</strong> {{$t('추천글')}}
      </h2>
      
      <div class="featured-list" v-if="content.contentFeaturedList && content.contentFeaturedList.length > 0">
        <vui-simple-card 
          v-for="item in content.contentFeaturedList"
          :key="item.id"
          :content="item"
          :base-url="$route.path"
          :list-url="$route.query.list"
        />
      </div>  
    </div>
</div>
</template>

<script>
import vuiSimpleCard from '@/components/cards/vuiSimpleCard.vue'
export default {
  name: 'ContentIndex',
  components:{
    vuiSimpleCard
  },
  props:{
    id:{
      type:String,
      default:''
    },
    previewContent: {
      type: Object,
    }
  },
  data() {
    return {
      content:null,
    }
  },
  mounted() {
    if(this.id)
      this.getContent(this.id)
    else if(this.previewContent)
      this.content = this.previewContent
  },
  watch:{
    id() {
      this.getContent(this.id)
    },
    '$route.query.id'() {
      this.getContent(this.$route.query.id)
    }
  },
  methods:{
    async getContent(id) {
      await this.$axios.get('/content/details', {
        params:{
          id: id
        }
      })
      .then(res=>{
        this.content = res.data
      })
      .catch(err=>{
        console.log(err)
      })
    },
    copyUrl() {
      const val = window.location.href
      this.$utils.copy(val)
      alert('현재 주소가 클립보드에 복사되었습니다.')
    },
    print() {
      window.print()
    },
    like() {
      this.$axios.post('/content/like',{
        id:this.content.id
      })
      .then(res=>{
        this.content.likeCount = res.data || 0
      })
      .catch(err=>{
        console.log(err)
      })
    },
    goList(tag) {
      let listUrl = this.$route.query.list

      if(!listUrl)
        this.$router.go(-1)
      else {
        let redirectUrl = tag ? listUrl + '?tag=' + tag : listUrl
        this.$router.push(redirectUrl)
      } 
    }
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
