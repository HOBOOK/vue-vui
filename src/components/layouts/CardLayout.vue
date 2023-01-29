<template>
  <div>
    <div class="vui-card-filter-container" v-if="!hideFilter">
      <ul  v-if="tabs.length > 1">
        <li
          v-for="item in tabs"
          :key="item.value"
        >
          <button class="vui-button" @click="setTab(item.value)" :class="{active: tab === item.value}">{{item.text}}</button>
        </li>
      </ul>

      <vui-select 
        v-model="sortBy" 
        :items="[{text:$t('최신순'), value:'newest'}, {text:$t('좋아요 높은순'), value:'like'}, {text:$t('많이 본 순서'), value:'view'}]" 
        item-key="text"
        item-value="value"
      />

      <span class="search-wrap">
        <div class="vui-input">
          <input class="append-icon" type="text" name="search" id="search" v-model="searchKeyword" :placeholder="$t('검색어입력')"/>
          <img class="icon" src="@/assets/image/magnify.svg" width="16" height="16" alt="magnify" />
        </div>
        
      </span>
    </div>
    
    <div class="vui-card-container">
      <vui-empty v-if="filteredContents.length === 0 && !loading"/>
      <vui-card 
        v-for="content in filteredContents.slice(0, viewLimit)"
        :key="content.id"
        :content="content"
        :base-url="baseUrl"
        :list-url="listUrl"
      />

      <div class="vui-card-more-container"> 
        <button class="vui-button" @click="viewLimit += 9" v-if="filteredContents.length > viewLimit">
          {{$t('더 보기')}}
        </button>

        <button class="vui-button" @click="scrollUp()" v-else-if="filteredContents.length > 12">
          {{$t('처음으로')}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardLayout',
  props:{
    contents:{
      type: Array,
      default: () => {
        return []
      }
    },
    baseUrl:{
      type: String,
      default:'/'
    },
    listUrl:{
      type: String,
      default:'/'
    },
    hideFilter:{
      type:Boolean,
      default:false
    },
    disableScroll:{
      type: Boolean,
      default:false
    }
  },
  computed:{
    filteredContents() {
      let filteredContents = []

      if(!this.tab || this.tab === 'all') {
        filteredContents = this.contents.filter((e) => 
                              this.searchKeyword ? (e.hashTags && e.hashTags.length > 0 ? e.hashTags.filter(h => h.indexOf(this.searchKeyword.toLowerCase()) !== -1).length > 0 : false) 
                              || e.title.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) !== -1
                              || e.category.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) !== -1 : true
                            )
      } else {
        filteredContents = this.contents.filter((e) => 
                              e.hashTags && e.hashTags.length > 0 ? e.hashTags.filter(h => h.indexOf(this.tab) !== -1).length > 0 : false
                            )
                            .filter((e) => 
                              this.searchKeyword ? (e.hashTags && e.hashTags.length > 0 ? e.hashTags.filter(h => h.indexOf(this.searchKeyword.toLowerCase()) !== -1).length > 0 : false) 
                              || e.title.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) !== -1 
                              || e.category.toLowerCase().indexOf(this.searchKeyword.toLowerCase()) !== -1 : true
                            )
      }
      if(this.sortBy) {
        if(this.sortBy === 'like') {
          filteredContents.sort((a,b)=> b.likeCount - a.likeCount)
        } else if(this.sortBy === 'view') {
          filteredContents.sort((a,b)=> b.viewCount - a.viewCount)
        }
      }
      return filteredContents
    },
  },
  data() {
    return {
      searchKeyword: '',
      tab:'all',
      tabs:[],
      viewLimit: 9,
      loading:true,
      sortBy: 'newest'
    }
  },

  watch:{
    contents() {
      this.generateTabs(this.contents)
    }
  },

  mounted() {
    this.generateTabs(this.contents)
    setTimeout(()=>{
      this.loading = false
    }, 1000)

    this.setTab(this.$route.query.tag)

    // 무한 스크롤 로딩
    window.addEventListener('scroll', () => {
      let scrollY = window.innerHeight + window.scrollY
      let bodyHeight = document.body.offsetHeight
      let heightRate = window.innerHeight * 0.3

      if(!this.disableScroll) {
        if(scrollY > bodyHeight - heightRate && this.filteredContents.length > this.viewLimit) {
          this.viewLimit+=9
        }
      }

      
    })
  },

  methods:{
    scroll(e){
      console.log(e)
    },  
    scrollUp() {
      window.scrollTo(0, 0)
    },
    setTab(tab){
      if(tab)
        this.tab = tab
    },
    generateTabs(contents) {
      if(!this.contents) return
      let tabs = [{
        text:this.$t('전체'),
        value: 'all'
      }]
      let tabMap = {}
      for(let i = 0; i < contents.length; i++) {
        for(let tag in contents[i].hashTags) {
          tabMap[contents[i].hashTags[tag]] = contents[i].hashTags[tag]
        }
      }

      for(let tab in tabMap) {
        tabs.push({
          text:tab,
          value:tab
        })
      }
      this.tabs = tabs
    },
  }
}
</script>

<style lang="scss">
.vui-card-container{
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    flex-basis: auto;
    margin:12px 0;
    column-gap: 30px;
    row-gap: 30px;

    @media screen and (max-width: #{$breakpoint-desktop}) {   
        column-gap: 16px;
        row-gap: 16px;
    }

    .vui-card-more-container{
        width:100%;
        text-align: center;
        padding: 32px 0;

        > button {
            font-weight: bold;
            padding:16px 32px;
        }
    }
}

.vui-card-filter-container{
    padding:0px 0 48px 0;
    text-align: left;
    margin:0 auto 24px auto;
    position: relative;

    @media screen and (max-width: #{$breakpoint-md}) {    
        margin:24px 0px;
    }
    ul{
        display: inline-block;
        list-style: none;
        padding:0;
        margin:0;
        li{
            display: inline-block;
            margin:6px 0;


            button {
                margin-right:12px;
            }

        }
    }
    

    > .search-wrap{
        float: right;
        margin:6px 0;

        @media screen and (max-width: #{$breakpoint-md}) {    
            width:100%;
            .vui-input {
                width:100%;
            }
        }
    }

}
</style>
