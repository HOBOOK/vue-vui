<template>
    <div class="vui-footer-content container-width">
        <section class="vui-footer-section-menu">
          <div
            class="section-menu-wrap"
            v-for="menu in menus"
            :key="menu.key"
          >
            <router-link :to="menu.path">
              <strong>{{$t(menu.text)}}</strong>
            </router-link>
           

            <div
              v-for="submenu in menu.childrens"
              :key="submenu.key"
              class="section-submenu-wrap"
            >
              <router-link :to="submenu.path">{{$t(submenu.text)}}</router-link>
            </div>
          </div>

          <div
            class="section-menu-addon"
          >
            <div>
              <router-link to="/"><strong>{{$t('기업소개서')}}</strong><img alt="external-link" src="@/assets/image/external-link.svg" height="12" style="margin-left:6px;"/></router-link>
            </div>
            <div>
              <router-link  to="/"><strong>{{$t('개인정보처리방침')}}</strong><img alt="external-link" src="@/assets/image/external-link.svg" height="12" style="margin-left:6px;"/></router-link>
            </div>
          </div>
        </section>

        <section class="vui-footer-section-info">
          <span class="section-info-logo">
            <router-link to="/">
              <img alt="logo" src="@/assets/image/logo.svg"  height="20"/>
            </router-link>
          </span>

          <nav class="section-info-main">
            <div>
              {{$t('(주)바질컴퍼니')}}
            </div>
            <div>
              {{$t('회사주소')}}
            </div>
            <div>
              {{$t('사업자등록번호')}}: 180-88-00809 {{$t('대표')}}: {{$t('황희경')}} FAX: 051.609.9634
            </div>
            <div>
              TEL: 051-609-9633 EMAIL : admin@vazilcompany.com
            </div>
          </nav>

          

          <div class="section-menu-sns">
            <button @click="$utils.openLink('https://blog.naver.com/vazilcompany')">
              <img alt="globe" src="@/assets/image/naver-blog.svg" width="24" height="24"/>
            </button>
            <button @click="$utils.openLink('https://www.youtube.com/@user-yo5xu2gv4q')">
              <img alt="globe" src="@/assets/image/youtube.svg" width="24" height="24"/>
            </button>
          </div>

          <span class="section-info-copyright">
            © Vazil Company {{ new Date().getFullYear() }}. All rights reserved.
          </span>
        </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'vuiFooter',
    props: {
      menus: {
        type: Array,
        default: ()=> {
          return []
        }
      }
    }
  }
  </script>

<style lang="scss">
.vui-footer-content{
  margin:0 auto;
  width:100%;
  height:100%;
  padding: 24px 0;

  .vui-footer-section-menu{
    width:calc(100%);
    display: flex;
    margin:6px 0;
    padding:40px 0 20px 0;
    text-align: left;
    position:relative;

    .section-menu-wrap{
      margin:0;
      padding:0;
      display: inline-block;
      text-align: left;

      a {
        display: inline-block;
        padding:4px 0;

        &:hover{
          color: $base-primary-color;
        }
      }

      .section-submenu-wrap{
        width:100%;
      }
      width:16%;

      @media screen and (max-width: #{$breakpoint-desktop}) {
        display: block;
        padding:16px 0;
        width:100%;
      }
      
    }

    @media screen and (max-width: #{$breakpoint-desktop}) {
      width:calc(100% - 240px);
      display: block;
      padding:0 120px;
    }

    @media screen and (max-width: #{$breakpoint-md}) {
      width:calc(100% - 40px);
      display: block;
      padding:0px;
    }

    .section-menu-addon{
      text-align: right;
      position: absolute;
      right:0;
      height: 100%;
      width:150px;

      @media screen and (max-width: #{$breakpoint-desktop}) {
        position:relative;
        text-align: left;
        bottom:0px;
        left:0;
        width:100%;
        padding-bottom:60px;
      }

      > div{
        margin-bottom:8px;
      }
    }

  }

  

  .vui-footer-section-info{
    
    width:100%;
    margin:6px 0;
    text-align: left;
    padding:40px 0;
    position:relative;

    .section-info-logo{
      position:absolute;
      left:0;
      top:40px;
      height:40px;
      line-height: 40px;

      img{
        filter: invert(19%) sepia(18%) saturate(14%) hue-rotate(357deg) brightness(97%) contrast(87%);
      }
    }

    .section-info-main{
      margin-left:120px;

      letter-spacing: 0px;
      
      @media screen and (max-width: #{$breakpoint-md}) {
        margin-left:0px;
        margin-top: 40px;
      }
    }

    .section-info-copyright{
      position: absolute;
      right:0;
      bottom:40px;

      @media screen and (max-width: #{$breakpoint-desktop}) {
        display: block;
        bottom:0px;
        left:120px;
      }

      @media screen and (max-width: #{$breakpoint-md}) {
        position: relative;
        top:20px;
        left: 0px;
      }
    }

    .section-menu-sns{
        position:absolute;
        top:40px;
        right:0;
        
        button {
          width:40px;
          height:40px;
          cursor: pointer;
          background-color: $base-background-color;
          border:1px solid $base-border-color;
          border-radius: 100%;
          position:relative;
          cursor: pointer;
          z-index: 10;
          margin:0 3px;

          img{
            position:absolute;
            top:calc(50% - 12px);
            left:calc(50% - 12px);
          }

          &:hover{
            
            background-color: $base-border-color;
          }
        }

      }
  }
}
  
</style>
  
  