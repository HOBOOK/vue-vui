<template>
<div class="vui-full-slide">
    <div class="main-slide-button">
        <!-- <div class="button-wrap">
            <button class="button" @click="prevSlide()">이전</button>
            <button class="button" @click="nextSlide()">다음</button>
        </div> -->

        <span
            v-for="(item, index) in items"
            :key="'slide-' + index"
            class="slide-index-button"
            :class="index === mainIndex ? 'active' : ''"
            @click="mainIndex = index"
        >
        </span>
        <span v-if="autoSlide" class="slide-pause-button" :class="!autoActive ? 'pause' : ''" @click="pauseSlide()">
            <span/><span/>
        </span>
    </div>

    <div class="main-content-wrap"
        v-for="(item, index) in slideItems"
        :key="item.title"
        :class="index === mainIndex ? 'active' : ''"
        :style="['left:' + (getSlideIndex(index) * 100 + (adjustSlidePos)) +'vw !important;', 
                slideSwipeMode ? 'transition:none !important;' : ''
                ]"
    >
        <div class="main-title">
            <h5
            >
                {{$t(item.subtitle)}}
            </h5>
            <h2
                class="page-title"
            >
            {{$t(item.title)}} 
            </h2>
            <div v-if="item.details" class="link" @click="$router.push(item.details)">
                {{$t('상세보기')}}
                <img src="@/assets/image/external-link.svg" height="16"/>
            </div>
        </div>

        

        <div class="main-background"
        :style="[slideSwipeMode ? 'cursor:grab;' : 'cursor:auto;']"
            @mousemove="slideSwipe($event)"
            @mouseup="slideSwipeEnd()"
            @mousedown="slideSwipeStart($event)"
            @mouseleave="slideSwipeEnd()"
        >
            <video v-if="item.type === 'video'" :src="item.url" autoplay loop muted/>
            <img v-else-if="item.type === 'image'" :src="item.url"/>
        </div>

    </div>
</div>
</template>

<script>
export default {
    props:{
        items: {
            type: Array,
            default: () => {
                return []
            }
        },
        autoSlide:{
            type:Boolean,
            default:true
        },
        slideTime:{
            type:Number,
            default:10000
        }
    },
    computed:{
        slideItems() {
            let slideItems = JSON.parse(JSON.stringify(this.items))

            if(this.items.length === 1) {
                slideItems.push(this.items[0])
                slideItems.push(this.items[0])

            } else if(this.items.length === 2){
                slideItems.push(this.items[0])
                slideItems.push(this.items[1])
            }
            return slideItems
        },
        autoActive(){
            return this.autoSlide && !this.autoPause
        }
    },
    data() {
        return {
            slideSwipeMode:false,
            slideStart:0,
            slideEnd:0,
            isSliding:false,
            adjustSlidePos:0,
            mainIndex:0,
            interval: null,
            autoPause:false,
        }
    },
    mounted() {
        if(this.autoActive) {
            this.setAutoSlideInterval()
        }
        this.mainIndex = Math.floor(Math.random() * this.items.length) 
    },
    watch:{
    },
    methods:{
        setAutoSlideInterval() {
            if(this.interval)
                clearInterval(this.interval)

            this.interval = setInterval(()=>{
                this.nextSlide()
            }, this.slideTime)
        },
        prevSlide() {
            if(this.isSliding) return
            this.isSliding = true
            if(this.mainIndex - 1 < 0) {
                this.mainIndex = this.slideItems.length - 1
            } else {
                this.mainIndex--
            }
            setTimeout(()=>{
                this.isSliding = false
            }, 500)
        },
        nextSlide() {
            if(this.isSliding) return
            this.isSliding = true
            if(this.mainIndex + 1 >= this.slideItems.length) {
                this.mainIndex = 0
            } else {
                this.mainIndex++
            }
            setTimeout(()=>{
                this.isSliding = false
            }, 500)
        },

        pauseSlide() {
            this.autoPause = !this.autoPause

            if(this.interval)
                clearInterval(this.interval)

            if(this.autoActive) {
                this.setAutoSlideInterval()
            }
        },

        getSlideIndex(index) {
            let idx = index - this.mainIndex
            if(idx < -1) {
                idx += this.slideItems.length
            } else if(idx > 1) {
                idx -= this.slideItems.length
            }
            return idx
        },
        slideSwipeStart(e){
            e.preventDefault()
            this.slideSwipeMode = true
            this.slideStart = e.clientX
            this.adjustSlidePos = 0
        },
        slideSwipeEnd(){
            this.slideSwipeMode = false

            if(this.adjustSlidePos > 10) {
                this.prevSlide()
            } else if(this.adjustSlidePos < -10) {
                this.nextSlide()
            }
        this.adjustSlidePos = 0
        
        },
        slideSwipe(e) {
            if(this.slideSwipeMode && !this.isSliding) {
                this.adjustSlidePos = ((e.clientX- this.slideStart) / window.innerWidth) * 100
                if(Math.abs(this.adjustSlidePos)  > 50) {
                this.slideSwipeEnd()
                }
            } 
        }
    }

}
</script>

<style lang="scss">

.vui-full-slide{
    width:100%;
    height:calc(100vh - 70px);
    max-width: 100%;
    position: relative;

    @media screen and (max-width: #{$breakpoint-tablet}) {    
        height: 260px;
        top:0;
        left:0;
        overflow-x: hidden;

        .main-title{
            width:100%;
            h2{
                font-size: 21px !important;
                text-align: center;
            }
            h5{
                font-size: 14px !important;
                text-align: center;
            }
            .link{
                font-size: 14px !important;
                text-align: center;

                img{
                    width:12px !important;
                    height:12px !important;

                }
            }
        }
        .main-slide-button{
            display: none !important;
        }
    }
  .main-slide-button{
    bottom:$header-height;
    width:100%;
    z-index:11;
    position: absolute;
    bottom:15vh;
    color: $base-background-opacity-color;

    .button-wrap{
      position:relative;
      width:100%;
      text-align: left;

      .button{
        cursor:pointer;
        pointer-events: all !important;
        z-index:10;
        margin-right:12px;
      }
    }

    .slide-index-button{
        border-radius: 100%;
        background-color: $base-background-opacity-color;
        opacity: 0.8;
        width:10px;
        height:10px;
        margin:12px 16px;
        display: inline-block;
        position:relative;
        cursor:pointer;

        &.active{
            &::before{
                content:'';
                position:absolute;
                left:calc(50% - 11px);
                top:calc(50% - 11px);
                border-radius: 100%;
                border: 1px solid $base-background-opacity-color;
                width:20px;
                height:20px;
                // clip:rect(0px,16px,16px,0px);
                // animation-name: rotating;
                // animation-timing-function: linear;
                // animation-duration: 2000ms;
                // animation-iteration-count: infinite;
            }
        }

        &:hover{
            opacity: 1;
        }


        &:active{
            transition: all .15s ease-in-out;
            transform: scale(0.95);
        }
    }

    .slide-pause-button{
        border-radius: 100%;
        width:10px;
        height:10px;
        margin:12px 16px;
        display: inline-block;
        position:relative;
        cursor:pointer;
        opacity: 0.8;

        span {
            position:absolute;
            width:2px;
            height:10px;
            background-color: $base-background-opacity-color;
            left:0;

            &:nth-child(2) {
                left:6px;
            }
        }

        &.pause{
            border-color: transparent transparent transparent $base-background-opacity-color;
            border-style: solid; border-width: 5px 0 5px 10px;
            border-radius: 0;
            height: 0; 
            width: 0;
            span{
                opacity:0;
            }
        }

        &:hover{
            opacity: 1;
        }

        &:active{
            transition: all .15s ease-in-out;
            transform: scale(0.95);
        }
    }

  }

  .main-content-wrap{
    position: absolute;
    width:100%;
    transition: all .3s ease-in-out;
    height: 100%;
    z-index: 0;
    pointer-events: none;
    &.active{
        
      z-index:1;
      .main-title{
        opacity:1;
        animation-name:fade_right;
        animation-duration: 1500ms;
        animation-timing-function: ease-in-out;
      }
    }
  }
  .main-title{
    position: absolute;
    opacity:0;
    z-index: 10;
    pointer-events: none;
    color: $base-background-color;
    text-align: left;
    height: 100%;
    top:0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h2{
      margin:0;
      font-size: 5vh;
    }
    h5{
      font-size: 2vh;
      margin:0;
    }
    .link{
        pointer-events: all;
        cursor: pointer;
        font-size: 1.5vh;
        opacity: 0.8;

        img{
            filter: invert(100%) sepia(74%) saturate(179%) hue-rotate(353deg) brightness(118%) contrast(100%);
        }
    }
  }
  .main-background{
    max-width: 100vw;
    width:100vw;
    height: calc(100% + 70px);
    overflow: hidden;
    position: absolute;
    pointer-events: all;
    top:-$header-height;
    left:calc(50% - 50vw);
    overflow: hidden;
    filter: brightness(50%);

    video{
      max-width: 100%;
      width: 100%;
      height:100%;
      object-position: center center;
      object-fit: cover;
    }

    img{
        width:100%;
        height:100%;
        object-fit: cover;
    }
  }
}


</style>