<template>
<div>
  <div v-if="content" class="tech-content-container ">
    <div class="tech-content-title-wrap">
      <div class="title">
        <div class="container-width">
          <h5
            data-aos-duration="500"
            data-aos-offset="100"
            data-aos="fade-right"
            data-aos-easing="ease-in-out"
          >
            {{$t('기술과 서비스')}}
          </h5>
          <h2
            class="page-title"
            data-aos-delay="100"
            data-aos-duration="700"
            data-aos-offset="100"
            data-aos="fade-right"
            data-aos-easing="ease-in-out"
          >
            {{content.title}}
          </h2>
          <p
            data-aos-delay="300"
            data-aos-duration="500"
            data-aos-offset="100"
            data-aos="fade-right"
            data-aos-easing="ease-in-out"
          >
            {{$t('기술과 서비스_설명')}}
            
          </p>

          <br/>

          <p
            data-aos-delay="300"
            data-aos-duration="500"
            data-aos-offset="100"
            data-aos="fade"
            data-aos-easing="ease-in-out"
            v-if="content.isExternalLink"
          >
            <a :href="content.externalUrl" class="vui-link-icon" target="_blank">
              <img src="@/assets/image/home.svg" height="24"/>
            </a>
          </p>

          
        </div>
        
        
        
      </div>
      <img class="scroll-bottom" src="@/assets/image/scroll-bottom.svg" height="36" alt="scroll"/>
    </div>

    <div id="header-top"/>


    <div class="tech-content-wrap">
      <div class="tech-content" v-html="content.content">
      </div>
    </div>

  
    <div class="content-navigator">
      <div class="list-button">
        <button class="vui-button"  @click="goList()">{{$t('목록보기')}}</button>
      </div>

      <h2>
        <strong>{{content.category}}</strong> {{$t('추천글')}}
      </h2>

      <div class="featured-list"  v-if="content.contentFeaturedList.length > 0">

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
</div>
</template>

<script>
export default {
  name: 'TechLayout',
  props:{
    id:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      content:null,
      solutions:[{
          title:'인공지능 비전검사',
          subtitle: '솔루션',
          content:'2D/3D 비전 카메라를 활용한 인공지능 검사 솔루션',
          image:'/image/service/vridge/solution1.png',
        },{
          title:'공구 수명 예측',
          subtitle: '솔루션',
          content:'공구수명을 예측하여 효율적인 공구 관리 솔루션',
          image:'/image/service/vridge/solution2.png',
        },{
          title:'챔버 온도 관리',
          subtitle: '솔루션',
          content:'실시간 온도 상태를 체크하고 모니터링 솔루션',
          image:'/image/service/vridge/solution3.png',
        }],
      
      info:[{
          title:'데이터 관리',
          subtitle: '서비스 기능',
          content:'클라우드 스토리지를 통해 인공지능 개발을 위한 학습 데이터를 간편하게 업로드하고 관리할 수 있습니다. 또한 API를 통해 개발 중인 프로젝트에 연동하여 자동으로 학습용 데이터를 업로드할 수 있습니다.',
          image:'/image/service/vridge/dataset.png',
          url:'https://www.vridgeai.com'
        },{
          title:'이미지 분류',
          subtitle: '서비스 기능',
          content:'웹 기반 라벨링 도구를 통해 학습 데이터 셋에 업로드된 이미지및 정형데이터의 어노테이션(Annotation) 정보를 생성할 수 있습니다. 다수의 작업자들이 한 프로젝트에서 실시간으로 같이 라벨링을 참여할 수 있으며, 추론 서버와 연동하여 오토 라벨링(Auto Labeling)을 통한 빠르게 어노테이션 정보를 생성할 수 있습니다.',
          image:'/image/service/vridge/classification.png',
          url:'https://www.vridgeai.com'
        },{
          title:'이미지 객체 감지',
          subtitle: '서비스 기능',
          content:'웹 기반 라벨링 도구를 통해 학습 데이터 셋에 업로드된 이미지및 정형데이터의 어노테이션(Annotation) 정보를 생성할 수 있습니다. 다수의 작업자들이 한 프로젝트에서 실시간으로 같이 라벨링을 참여할 수 있으며, 추론 서버와 연동하여 오토 라벨링(Auto Labeling)을 통한 빠르게 어노테이션 정보를 생성할 수 있습니다.',
          image:'/image/service/vridge/object_detection.png',
          url:'https://www.vridgeai.com'
        },{
          title:'이미지 세그멘테이션',
          subtitle: '서비스 기능',
          content:'웹 기반 라벨링 도구를 통해 학습 데이터 셋에 업로드된 이미지및 정형데이터의 어노테이션(Annotation) 정보를 생성할 수 있습니다. 다수의 작업자들이 한 프로젝트에서 실시간으로 같이 라벨링을 참여할 수 있으며, 추론 서버와 연동하여 오토 라벨링(Auto Labeling)을 통한 빠르게 어노테이션 정보를 생성할 수 있습니다.',
          image:'/image/service/vridge/segmentation.png',
          url:'https://www.vridgeai.com'
        },{
          title:'시계열 분석',
          subtitle: '서비스 기능',
          content:'웹 기반 라벨링 도구를 통해 학습 데이터 셋에 업로드된 이미지및 정형데이터의 어노테이션(Annotation) 정보를 생성할 수 있습니다. 다수의 작업자들이 한 프로젝트에서 실시간으로 같이 라벨링을 참여할 수 있으며, 추론 서버와 연동하여 오토 라벨링(Auto Labeling)을 통한 빠르게 어노테이션 정보를 생성할 수 있습니다.',
          image:'/image/service/vridge/time_series.png',
          url:'https://www.vridgeai.com'
        },{
          title:'분석 및 테스트',
          subtitle: '서비스 기능',
          content:'적용된 모델의 사용 데이터를 수집하여 통계 분석 도구를 사용할 수 있습니다. 또한 배포된 모델을 웹에서 테스트할 수 있는 인터페이스를 제공합니다.',
          image:'/image/service/vridge/test.png',
          url:'https://www.vridgeai.com'
        },{
          title:'인공지능 배포',
          subtitle: '서비스 기능',
          content:'브릿지에서 개발한 AI 모델을 엣지 디바이스 S/W(엣지 포인트) 또는 웹 API(웹 포인트) 두 가지 형태로 배포할 수 있습니다.',
          image:'/image/service/vridge/deploy.png',
          url:'https://www.vridgeai.com'
        },{
          title:'모니터링 및 이상감지',
          subtitle: '서비스 기능',
          content:'배포한 인공지능 데이터를 수집하여 통계 및 분석 모니터링 화면을 제공합니다. 또한 모델의 정확도가 이상치에 벗어날 경우 드리프트를 감지하여 알림기능을 제공합니다.',
          image:'/image/service/vridge/monitoring.png',
          url:'https://www.vridgeai.com'
        }],

      sectionContent:[{
        title:'클라우드 인공지능 통합 플랫폼',
        image: '/image/service/vridge/section1.png',
        content:`한 번 개발에서 끝나는 게 아니라 지속적으로 데이터를 추가하고 새롭게 AI 모델 버전을 업데이트할 수 있는 클라우드기반 S/W 서비스(SaaS)입니다. 인공지능 시스템 구축에 필요한 데이터 관리부터 AI 학습 및 평가, 배포까지 누구나 쉽게 AI 개발을 할 수 있는 통합 파이프라인을 제공합니다.`,
        url:'https://www.vridgeai.com'
      },{
        title:'학습데이터 관리',
        subtitle: '',
        image: '/image/service/vridge/section6.png',
        content:`웹 관리 도구를 통해 수동으로 데이터를 업로드를 하거나, SDK를 통해 연동한 엣지 디바이스로 부터 자동 업로드를 지원합니다.`,
          url:'https://www.vridgeai.com'
      },{
        title:'쉽고 간편한 데이터 라벨링',
        subtitle: '',
        image: '/image/service/vridge/section5.png',
        content:`웹 라벨링 도구를 통해 다수의 작업자가 함께 라벨링 작업을 할 수 있는 환경을 제공합니다. 또한, AI 추론 서버를 오토 라벨링 기능으로 활용하여 빠르게 라벨링 작업이 가능합니다.`,
          url:'https://www.vridgeai.com'
      },{
        title:'누구나 쉽게 인공지능을 학습',
        subtitle: '',
        image: '/image/service/vridge/section2.png',
        content:`간단한 학습 설정으로 인공지능 전문가가아니더라도 누구나 쉽게 강력한 성능의 인공지능 모델 학습을 할 수 있습니다.`,
          url:'https://www.vridgeai.com'
      },{
        title:'인공지능을 연결된 장비에 배포',
        subtitle: '',
        image: '/image/service/vridge/section3.png',
        content:`브릿지에서 학습한 인공지능 모델을 웹 포인트, 엣지 포인트를 연동하여 지속적으로 새로운 버전의 인공지능 모델을 배포하고 성장시킬 수 있습니다.`,
          url:'https://www.vridgeai.com'
      },{
        title:'인공지능을 모니터링하고 분석',
        subtitle: '',
        image: '/image/service/vridge/section4.png',
        content:`배포한 인공지능의 통계 데이터를 수집하고 분석할 수 있습니다. 또한 웹에서 모델 성능을 테스트 해볼 수 있습니다.`,
          url:'https://www.vridgeai.com'
      }]
    }
  },
  creted(){
  },
  mounted() {
    // if(!this.$route.query.dynamicHeader){
    //   this.$router.push(this.$route.fullPath + '&dynamicHeader=true')
    // }
    this.getContent(this.id)
    window.addEventListener('scroll', () => {
      const fiexdLayer = document.getElementsByClassName('fixed-layer')
      let find = false
      for(let i = fiexdLayer.length - 1; i >= 0; i--) {

        if(fiexdLayer[i].getBoundingClientRect().top === 0 && !find) {
          fiexdLayer[i].classList.add('active')
          
          // if(i < fiexdLayer.length - 1) {
          //   if(this.$refs.slide) {
          //     this.$refs.slide.slide = Math.floor(this.$refs.slide.items.length * ( 1 - (fiexdLayer[i+1].getBoundingClientRect().top / fiexdLayer[i].clientHeight)))
          //   }
          // }

          find = true
        } else {
          fiexdLayer[i].classList.remove('active')
        }
      }

      const titleWrap = document.getElementsByClassName('tech-content-title-wrap')[0]
      if(titleWrap) {
          const title = titleWrap.getElementsByClassName('page-title')[0]
          if(title) {
            title.style.fontSize = Math.min(5,((titleWrap.getBoundingClientRect().top + titleWrap.clientHeight) * 3 / titleWrap.clientHeight) + 2) + 'vh'
          }
          let opacity = (titleWrap.getBoundingClientRect().top + titleWrap.clientHeight) / titleWrap.clientHeight
          titleWrap.style.opacity = ''  + Math.max(opacity, 0) 
      }
    })
  },
  watch:{
    id() {
      this.getContent(this.id)
    },
    '$route.query.id'() {
      this.getContent(this.$route.query.id)
    },
    
  },
  methods:{
    async getContent(id) {
      if(!id) return
      await this.$axios.get('/content/details', {
        params:{
          id: id
        }
      })
      .then(res=>{
        this.setContent(res.data)
      })
      .catch(err=>{
        console.log(err)
      })
    },

    goList() {
      let listUrl = this.$route.query.list
      if(!listUrl)
        this.$router.go(-1)
      else {
        this.$router.push(listUrl)
      } 
    },

    setContent(content) {
      this.content = content

      this.$nextTick(()=>{
        const container = document.getElementsByClassName('tech-content-container')[0]
        if(container) {
          let style = container.style
          if(content && content.image) {
            style.setProperty('--background', 'url(' + content.image + ')')
          } else {
            style.setProperty('--background', 'url(@/assets/image/background/bg20.jpg)')
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.tech-content-container {
  text-align: left;
  margin:0 auto;
  padding:0;

  .tech-content-title-wrap{
    width:100%;
    height:100vh;
    min-height: 480px;
    position: relative;
    padding:0;
    margin:0;
    z-index: 0;
    &::before{
      content:'';
      position: absolute;
      z-index: 0;
      width:100vw;
      height: 80vh;
      top:20vh;
      left:calc(50% - 50vw);
      background-image: var(--background) !important;
      background-attachment: fixed;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      filter: brightness(90%);
    }

    
    *{
      margin:0;
      padding:0;
    }

    .scroll-bottom{
        width:36px;
        position: absolute;
        object-fit: contain;
        left:calc(50% - 36px);
        bottom:10vh;
        filter: invert(100%) sepia(3%) saturate(12%) hue-rotate(103deg) brightness(105%) contrast(105%);
        animation: up_down 3000ms linear infinite;
      }

    .title{
      background-color: $base-background-color;
      position: fixed;
      text-align: left;
      width:100%;
      left:0;
      top:0;
      z-index: 2;
      padding-top:calc(10vh);
      padding-bottom:5vh;
      .container-width{
        margin:0 auto;
      }
      h5{
        font-size: 1.5vh;
      }
      h2{
        font-size: 5vh;
        font-weight: bold;
      }
      p{
        font-size: 1.25vh;
      }

      
    }
  }

  .tech-content-wrap{
    padding:0;
    margin:0;
    border-bottom:1px solid $base-border-color;
    position: relative;
    z-index:10;
    background-color: $base-background-color;
    &::before{
      position: absolute;
      content:'';
      z-index: -10;
      top: 0;
      height: 30vh;
      width:100vw;
      left:calc(50% - 50vw);
      background-attachment: fixed;
    }

    .tech-content{
      .fixed-container{
        position: relative;
        width:100%;
        

        .fixed-layer{
          left:0;
          width:100%;
          max-width: 100%;
          height: 100vh;
          width:$full-width;
          position: sticky;
          top:0;
          font-size:16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-attachment: fixed;
          transition: all .3s ease-in-out;
          z-index: -1;
          opacity: 0;
          animation-name: fade_out;
          animation-duration: 500ms;
          animation-timing-function: ease-in-out;

          img{
            object-fit: cover;
            border-radius: 12px;
          }


          @media screen and (max-width: #{$breakpoint-desktop}) {   
            position: static;
            opacity: 1;
            margin:24px 0;
            height: auto !important;

            &.layer-last{
              display: none !important;
            }
          }

          .detail-wrap{
            color: $base-foreground-color;
            font-size: 18px;
            width: 100%;

            .vui-video-player {
              max-width: 720px !important;
              display: inline-block;
            }

            h1{
              color: #000;
              height: 60px;
            }

            p {
              height: 100px;
            }

            img{
              max-width: 100%;
            }
          }

          &.active{
            z-index: 10 !important;
            opacity: 1;
            animation-name: fade;
            animation-duration: 500ms;
            animation-timing-function: ease-in-out;
          }

          &.layer-last{
            opacity: 1;
            margin-bottom:40vh;
            &::before{
              content:'';
              position: absolute;
              z-index: 0;
              width:100vw;
              height: 40vh;
              bottom:-40vh;
              left:calc(50% - 50vw);
              background-image: var(--background);
              background-attachment: fixed;
              background-size: cover;
              background-repeat: no-repeat;
              background-position: center center;
              filter: brightness(100%);
            }
          }
        }
      }

      

      .tech-section{
        padding:128px 0;
        width:100%;
        display: flex;
        text-align: left;
        flex-direction: row;
        flex-wrap: nowrap;
        column-gap: 96px;

        &:nth-child(even){
          flex-direction: row-reverse;
        }

        @media screen and (max-width: #{$breakpoint-desktop}) {   
          flex-wrap: wrap;
          flex-direction: row;
          padding:48px 0;
          .section-info{
            flex: 0 1 100% !important;
            h2{
              font-size: 21px !important;
            }
            p{
              font-size: 16px !important;
              line-height: 26px !important;
              color: $base-foreground-color;
            }
          }
          .section-image{
            
            flex: 0 1 100% !important;

            > img{
              min-height: 120px !important;
              height: 240px !important;
            }
          }
        }

        .section-info{
          flex: 0 1 40%;
          width:100%;
          height: 100%;

          h2{
            font-size: 36px;
            font-weight: bold;
            margin:0;
            padding:0;
          }

          p{
            font-size: 18px;
            line-height: 26px;
          }

          a{
            font-size: 16px;
            cursor: pointer;
            color: $base-primary-color;

            &:hover{
              color: $base-primary-color;
              font-weight: bold;
            }
          }

          
        }

        .section-image{
          flex: 0 1 60%;
          width:100%;
          height: 100%;
          max-height: 480px;
            border-radius: 12px;
          > img{
            min-height: 360px;
            object-fit: cover;
            width:100%;
            height: 100%;
          }
        }
      }
    }

    
  }
  
  .content-navigator{
    width:100%;
    padding: 72px 0 0 0;
    margin:0;
    position: relative;

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
      z-index: 10;

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

  
}


</style>
