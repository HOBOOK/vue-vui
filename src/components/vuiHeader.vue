<template>
    <div class="vui-header-content container-width" :class="{dynamic:dynamic && !allMenu}" v-click-outside="onClickOutside">
      <span class="vui-header-title">
        <router-link to="/">
          <img class="logo" alt="logo" src=""  height="20"/>
        </router-link>
      </span>

      <nav class="vui-header-menu-wrap">
        <ul class="vui-header-menu" @mouseleave="selectedMenu = null">
          <li 
            v-for="menu in menus" 
            :key="menu.key"
            @mouseover="hoverMenu(menu)"
          >
            <router-link :to="menu.path">
              <strong>{{menu.text}}</strong>
            </router-link>

            <ul class="vui-header-submenu" v-if="selectedMenu === menu && menu.childrens.length > 0">
              <li 
                v-for="submenu in selectedMenu.childrens" 
                :key="submenu.key"
              >
                <a v-if="submenu.outlink" @click="selectedMenu = null, $utils.openLink(submenu.path)" class="outlink">
                  {{submenu.text}}
                  <img alt="external-link" src="@/assets/image/external-link.svg" height="12" style="margin-left:6px;"/>
                </a>
                <router-link v-else :to="submenu.path" @click="selectedMenu = null">
                  {{submenu.text}}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>

        <div class="vui-header-allmenu" v-if="allMenu">
          <ul class="vui-header-allmenu-item-wrap container-width desktop-hide">
            <li 
              v-for="menu in menus" 
              :key="menu.key"
            >
              <div>
                <router-link :to="menu.path" @click="allMenu = false">
                  <strong>{{menu.text}}</strong>
                </router-link>
              </div>
              <div 
                class="header-allmenu-item"
                v-for="submenu in menu.childrens" 
                :key="submenu.key"
              >
                <a v-if="submenu.outlink" @click="allMenu = false, $utils.openLink(submenu.path)" class="outlink">
                  {{submenu.text}}
                  <img alt="external-link" src="@/assets/image/external-link.svg" height="12" style="margin-left:6px;"/>
                </a>
                <router-link v-else :to="submenu.path" @click="allMenu = false">
                  {{submenu.text}}
                </router-link>
              </div>
            </li>
          </ul>

          <div class="vui-header-allmenu-item-wrap desktop-show">
            <ul
                v-for="(menu, idx) in menus" 
                :key="menu.key"
            >
              <li 
                class="container-width"
              >
                <div class="parent-item">
                  <a v-if="menu.childrens.length > 0" @click="onClickArrow(idx)" :class="{ active : activeMenuIndex === idx}"> 
                    <strong>{{menu.text}}</strong>
                    <div class="arrow" v-if="menu.childrens">
                      <span/>
                      <span/>
                    </div>
                  </a>

                  <router-link :to="menu.path" @click="allMenu = false" v-else>
                    <strong>{{menu.text}}</strong>
                  </router-link>
                </div>

                <div v-if="menu.childrens.length > 0 && activeMenuIndex === idx" :class="{ active : activeMenuIndex === idx}">
                  <div 
                    class="header-allmenu-item"
                    v-for="submenu in menu.childrens" 
                    :key="submenu.key"
                  >
                    <a v-if="submenu.outlink" @click="selectedMenu = null, openLink(submenu.path)" class="outlink">
                      {{submenu.text}}
                      <img alt="external-link" src="@/assets/image/external-link.svg" height="12" style="margin-left:6px;"/>
                    </a>
                    <router-link v-else :to="submenu.path" @click="allMenu = false">
                      {{submenu.text}}
                    </router-link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          
        </div>
      </nav>

      <div class="vui-header-util">
        <button class="vui-button round globe">
          <img alt="globe" src="@/assets/image/globe2.svg" width="20" height="20"/>
        </button>

        <div class="vui-header-menu-btn vui-button round" :class="{active: allMenu}" @click="openMenu()">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </template>
  
<script>

export default {
  name: 'vuiHeader',
  props: {
    menus:{
      type: Array,
      default: () => {
        return []
      }
    },
    dynamic:{
      type:Boolean,
      default:false,
    }
  },
  data() {
    return {
      selectedMenu:null,
      allMenu:false,
      activeMenuIndex: -1
    }
  },

  watch:{
    allMenu() {
      if(this.allMenu && this.$utils.isMobile()) {
        document.body.style.overflowY = 'hidden'
        window.scrollTo(0,1)
      } else {
        document.body.style.overflowY = 'auto'
      }
    }
  },

  methods:{
    openMenu() {
      this.allMenu = !this.allMenu
    },
    hoverMenu(menu) {
      if(this.allMenu) return
      this.selectedMenu = menu
    },
    onClickOutside() {
      this.allMenu = false
    },
    onClickArrow(idx) {
      if(idx === this.activeMenuIndex) {
        this.activeMenuIndex = -1
        return
      }
      this.activeMenuIndex = idx
    }
  }
}
</script>

<style lang="scss">
.vui-header-content{
  position: relative;

  &::before{
    content:'';
    position: absolute;
    left:calc(50% - 50vw);
    top:0;
    z-index:-1;
    height: 100%;
    width:100vw;
    background-color: $base-background-color;
  }

  @media screen and (min-width: #{$breakpoint-tablet}) {   
    &.dynamic {
      &::before{
        background-color: transparent;
      }
      .vui-header-title {
        img{
        }
      }

      .vui-header-menu{
        > li {
          > a{
            color: $base-background-color !important;
          }
        } 

        
      }
      .vui-header-util{
        .vui-header-menu-btn{
          span{
            background-color: $base-background-color !important;
          }
        }
        .add{
          color: $base-background-color !important;
        }
        
        img{
          filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(261deg) brightness(104%) contrast(103%) !important;
        }
      }

    }
  }

  


  position: relative;
  margin:0 auto;
  height:100%;
  
  min-height: $header-height;
  @media screen and (max-width: #{$breakpoint-md}) {   
    min-height: $header-mobile-height;
  }
  width:100%;
  

  .vui-header-title{
    position:absolute;
    height: 36px;
    line-height: 36px;
    top: calc(50% - 18px);
    left:0px;
    z-index: 11;

    .logo{
      padding:8px;
    }
  }

  .vui-header-menu-wrap{
    position:relative;
    margin:0;
    padding:0;
    height: 100%;
    width: 100%;


    .outlink{
      position: relaitve;
      img{
        opacity:0;
        transition: .15s ease-in-out;
      }

      
      &:hover{
        img{
          opacity:1;
        }
      }

    }

    .vui-header-menu{
      position:relative;
      text-align: center;
      list-style: none;
      display: inline-block;
      margin:0;
      padding:0;
      font-size: 16px;
      letter-spacing: -.5px;
      line-height: $header-height;
      @media screen and (max-width: #{$breakpoint-md}) {   
        line-height: $header-mobile-height;
      }
      @media screen and (max-width: #{$breakpoint-desktop}) {    
        display: none;
      }

      li{
        display: inline-block;
        position: relative;

        

        a{
          padding:28px 40px;
          position: relative;
          color: $header-menu-foreground-color;


          &.active{
            font-weight: bold;
            color: $base-primary-color;

            /* &:before{
              display: inline-block;
              position:absolute;
              top:calc(50% + 16px);
              left: 40px;
              content: '';
              width:calc(100% - 80px);
              height: 2px;
              background: $base-primary-color !important;
              animation-name: stretch_right;
              animation-duration: 300ms;
              animation-timing-function: ease-in-out;
            } */
          }
        }
      }

      

      :hover{
        > a {
          font-weight: bold;
          color: $base-primary-color;

          strong {
            &:before{
              display: inline-block;
              position:absolute;
              top:calc(50% + 16px);
              left: 40px;
              content: '';
              width:calc(100% - 80px);
              height: 2px;
              background: $base-primary-color !important;
              animation-name: stretch_right;
              animation-duration: 300ms;
              animation-timing-function: ease-in-out;
            }
          } 
          
        }
      }
    }

    .vui-header-submenu{
      position: absolute;
      top: $header-height;
      left:0;
      margin:0;
      padding:14px 42px;
      border:1px solid rgba(0, 0, 0, 0.06);
      box-shadow: rgba(149, 157, 165, 0.1) 0px 0px 2px;
      border-radius: 12px;
      background-color: $base-background-color;
      text-align: left;
      width: auto;
      white-space: nowrap;

      li {
        display: block;
        padding:0;
        line-height: 42px;
        margin:0;
        a {
          cursor:pointer;
          display: block;
          width:calc(100%-42px);
          padding:0;
          margin:0;
          color: $header-submenu-foreground-color;
        }
      }

    }

    .vui-header-allmenu{
      position: fixed;
      z-index:10;
      top: 0;
      left:0;
      width:100%;
      margin:0;
      padding: 0;
      border:1px solid rgba(0, 0, 0, 0.06);

      padding: $header-height 0 30px 0;
      background-color: $base-background-color;

      animation-name: slide_down_fixed_top;
      animation-duration: 200ms;
      animation-timing-function: ease-in-out;

      *{
        font-size: 16px;
      }

      

      @media screen and (max-width: #{$breakpoint-desktop}) { 
        width:100%;
        height:100vh;

        animation-name: slide_left_fixed_top;
        animation-duration: 200ms;
      }
      

      

      
      
      .vui-header-allmenu-item-wrap{

        margin:0 auto;
        padding:12px 0 24px 0;
        max-height: calc(100% - 60px);
        overflow-y: auto;

        @media screen and (max-width: #{$breakpoint-desktop}) { 
          padding:0;
        }
        
        position:relative;

        ul {
          display: inline;
          margin:0;
          padding:0;
        }

        .parent-item{
          cursor: pointer;
          position: relative;

          .arrow{
            position: absolute;
            right:16px;
            top:calc(50% - 10px);
            width: 20px;
            height:20px;

            display: flex;
            justify-content: center;
            align-items: center;
            transform: rotate(0deg);
            transition: .2s;
            
            span {
                width: 10px;
                height: 2px;
                position: absolute;
                top: 50%;
                left: 2px;
                transform: translate(-50%, -50%);
                transition: all 0.2s ease-in-out;
                background-color: #222222;
                transform: rotate(45deg);
        
                &:nth-of-type(2) {
                  top: calc(50%);
                  left:calc(50% - 2px);
                  transform: rotate(-45deg);
                }
            }

          }
        }
        


        .active{
          strong{
            color: $base-primary-color;
          }

          a {
            animation-name: slide_down;
            animation-duration: 300ms;
            animation-timing-function: ease-in-out;
          }

          .arrow{
            transform: rotate(180deg);
          }

        }

      }
      .header-allmenu-item{
        margin:18px 0;
      }

      strong{
        font-size:18px;
      }


      li{
        text-align: left;
        display: inline-block;
        position: relative;
        vertical-align: top;
        
        @media screen and (max-width: #{$breakpoint-desktop}) {    

          display: block;
          margin-left:60px;
          margin:4px auto 24px auto;
          

          strong{
            font-size:20px;
          }

          a{
            padding:2px 18px !important;
            display: block;
            font-size: 16px;
          }
        }

        a{
          cursor: pointer;
          color: $header-menu-foreground-color;
          padding:0 56px;
        }
      }

      :hover{
        > a {
          font-weight: bold;
          color: $base-primary-color;
        }
      }
    }
  }

  .vui-header-util{
    z-index: 11;
    position:absolute;
    display: flex;
    column-gap: 20px;
    justify-items: center;
    align-items: center;
    height: 36px;
    line-height: 36px;
    top: calc(50% - 18px);
    right:0px;

    @media screen and (max-width: #{$breakpoint-md}) {
      column-gap: 6px;
    }
    .vui-header-menu-btn{
        display: inline-block;
        width: 20px;
        height: 20px;
        position: relative;
        z-index:2;
        overflow: hidden;
        cursor: pointer;

        span {
          width: 16px;
          height: 2px;
          position: absolute;
          top: 50%;
          left: calc(50% + 2px);
          transform: translate(-50%, -50%);
          transition: all 0.2s ease-in-out;
          background-color: $base-foreground-color;

          &:nth-of-type(2) {
            top: calc(50% - 7px);
            left: calc(50% - 2px);
          }
          &:nth-of-type(3) {
            top: calc(50% + 7px);
            left: calc(50% - 2px);
          }
        }

        &:hover {
          span {
            width: 16px;

            &:nth-of-type(1) {
              top: 50%;
              left: 50%;
            }
            &:nth-of-type(2) {
              top: calc(50% - 7px);
              left:50%;
            }
            &:nth-of-type(3) {
              top: calc(50% + 7px);
              left:50%;
            }
          }
        }


        &.active{
          transform: translateX(0);

          span{
            width: 20px;

            &:nth-of-type(1) {
              display: none;
            }
            &:nth-of-type(2) {
              top: 50%;
              left:50%;
              transform: translate(-50%, 0%) rotate(-45deg);  
            }
            &:nth-of-type(3) {
              top: 50%;
              left:50%;
              transform: translate(-50%, 0%) rotate(45deg); 
            }
          }
        }
    }
  }
}
</style>
  
  