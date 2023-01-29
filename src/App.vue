<template>
  <div class="vui-container">
    <header class="vui-header">
      <vui-header :menus="menus"/>
    </header>

    <main class="vui-main">
      <router-view class="vui-main-content  container-width full"/>
    </main>

    <footer class="vui-footer">
      <vui-footer :menus="menus"/>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      menus: [{
          text:'메뉴1',
          path: '/',
          childrens: [{
            text:'메뉴1-1',
            path: '/'
          },{
            text:'매뉴1-2',
            path: '/'
          },{
            text:'메뉴1-3',
            outlink:true,
            path: '/'
          }]
        },{
          text:'메뉴2',
          path: '/service',
          childrens:[{
            text:'메뉴2-1',
            path: '/'
          },{
            text:'메뉴2-2',
            path: '/'
          },{
            text:'메뉴2-3',
            path: '/'
          },{
            text:'메뉴2-4',
            path: '/'
          }]
        },{
          text:'메뉴3',
          path: '/',
          childrens:[{
            text:'메뉴3-1',
            path: '/'
          },{
            text:'메뉴3-2',
            path: '/'
          },{
            text:'메뉴3-3',
            path: '/'
          }]
        },{
          text:'메뉴4',
          path: '/',
          childrens:[]
        },{
          text:'메뉴5',
          path: '/',
          childrens:[]
        }],

    }
  },

  mounted() {
  },
  watch:{
    '$route'() {

    }
  },
  methods:{
    drawBackground() {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

 
      canvas.width = window.innerWidth 
      canvas.height = document.body.offsetHeight

      ctx.font = '32px bold Apple SD Gothic Neo, Pretendard-Regular, NotoSansKR, sans-serif '
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#C4182805";
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.6, 0);
      ctx.lineTo(canvas.width, 0);
      ctx.lineTo(canvas.width, canvas.height * 0.8);
      ctx.fill();
      
      ctx.fillStyle = "#C4182803";
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.6, canvas.height);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(canvas.width, canvas.height * 0.5);
      ctx.fill();
      let src = canvas.toDataURL('image/png', 1.0)

      document.body.style.backgroundImage = "url(" + src + ")";
    },
  }
}
</script>

<style lang="scss">
#app {
  text-align: center;
  color: $base-foreground-color;
  min-width: $min-width;
}

.vui-container{
    margin-top: $header-height;
    width:100%;

    @media screen and (max-width: #{$breakpoint-md}) {   
      margin-top: $header-mobile-height;
    }

    .vui-header{
        position: fixed;
        width: 100%;
        max-width: 100vw;
        min-width: $min-width;;
        height: $header-height;
        z-index: 2000;
        top: 0;
        left: 0;
        right: 0;
        animation-timing-function: ease-in-out;
        animation-duration: 300ms;
        border-bottom: none;

        @media screen and (max-width: #{$breakpoint-md}) {   
          height: $header-mobile-height;
        }
        &.show{
          top: 0;
          animation-name: slide_down_fixed_top;
        }
        &.hide{
          top: -$header-height;
          @media screen and (max-width: #{$breakpoint-md}) {   
            top: -$header-mobile-height;
          }
          animation-name: slide_up_fixed_top;
        }
    }
    
    .vui-main{
        width:100%;
        min-width: $min-width;
        .vui-main-content{
            margin:0 auto;
            width:calc(100% - 32px);
            min-height:75vh;
            padding: 0 16px 120px 16px;

            @media screen and (max-width: #{$breakpoint-md}) {  
              width:100%; 
              padding: 0 0px 120px 0px;
            }

            .vui-main-content-title{
              padding:32px 0 16px 0;

              @media screen and (max-width: #{$breakpoint-desktop}) {   
                  padding-top:24px;
              }

              @media screen and (max-width: #{$breakpoint-md}) {   
                padding:4px 0;
              }

              .page-title {
                font-weight: bold;
                font-size: 42px;
                letter-spacing: -2px;
                margin:0;
                padding:10px;
                animation-duration: 600ms;
                animation-name: fade_up;
                animation-timing-function: ease-in-out;

                @media screen and (max-width: #{$breakpoint-desktop}) {   
                    font-size: 36px;
                }

                @media screen and (max-width: #{$breakpoint-md}) {   
                    font-size: 28px;
                }
              }

              .page-subtitle{
                color: $base-foreground-subtitle-color;
                font-size:20px;
                margin:0;
                padding:6px;
                animation-duration: 900ms;
                animation-name: fade_up;
                animation-timing-function: ease-in-out;
                letter-spacing: -0.5px;

                @media screen and (max-width: #{$breakpoint-desktop}) {   
                    font-size: 18px;
                }

                @media screen and (max-width: #{$breakpoint-md}) {   
                    font-size: 16px;
                }
              }

              

              
            }

            .page-submenus{
                padding:32px;
                .page-submenus-item{
                  font-size: 20px;
                  font-weight: bold;
                  opacity: 0.8;
                  color: $base-foreground-sub-color;
                  &:hover{
                    opacity: 1.0;
                    color: $base-foreground-color;
                  }

                  &.active{
                    opacity: 1.0;
                    color: $base-foreground-color;
                  }

                  @media screen and (max-width: #{$breakpoint-md}) {   
                    font-size: 16px;
                  }
                  
                }


                .page-submenus-divider{
                  font-size: 18px;
                  margin: 0 16px;
                  opacity: 0.8;
                  color: $base-foreground-sub-color;
                  @media screen and (max-width: #{$breakpoint-md}) {   
                    font-size: 16px;
                    margin: 0 10px;
                  }
                  
                }
              }
        }
        .page-background{
          width: 100%;
          max-height: 360px;
          margin: 32px auto 32px auto;
          left:0;
          z-index: -1;

          border-radius: 24px;
          overflow: hidden;
          position: relative;
          
            background-attachment: fixed;

          img{
            object-fit: cover;
            border-radius: inherit;
            width:100%;
            height: 100%;
            filter: grayscale(30%);
            
            animation-name: zoom_in;
            animation-duration: 1500ms;
            animation-timing-function: ease-in-out;
            
          }

          @media screen and (max-width: #{$breakpoint-desktop}) {   
            max-height: 260px;
          }

          @media screen and (max-width: #{$breakpoint-tablet}) {   
            width:100%;
            min-width: 300px;
            margin: 0;
            margin-bottom:24px;
            max-height: 180px;
            height: 180px;
            border-radius: 12px;
          }
        }
    }

    .vui-footer{
        background-color: $base-background-color;
        border-top: 1px solid $base-border-color;
        width:100%;
        bottom:0;
    }
}
</style>
