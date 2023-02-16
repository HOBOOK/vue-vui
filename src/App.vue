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
