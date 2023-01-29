<template>
  <div class="vui-video-player" :class="rounded ? 'rounded' :''">
        <div class="video-wrap"  @mouseover="videoOver()" @mouseleave="videoLeave()" >
            <video class="video" id="video" @click="togglePlay()"  @timeupdate="timeUpdate()">
                <source :src="source + '#t=' + thumbnail" type="video/mp4"  v-if="source"/>
            </video>
            <div class="video-controls-container" v-if="isControlShow && source">
              <div class="video-title">
                {{title}}
              </div>

              <div class="video-controls">

                  <div class="video-progress" 
                    @mouseover="progressOver = true" 
                    @mouseleave="progressOver = false"
                    @mousemove="onUpProgress($event)"
                    @click="onClickProgress($event)"
                  >
                      <div class="progress-wrap" :class="progressOver ? 'on' : ''" :style="'width:' + progressWidth + '%;'">
                        <div class="thumb"/>
                      </div>
                  </div>

                  <div class="video-button-wrap">
                    <div class="button" :class="playIcon"   @click="togglePlay()">
                        <span/>
                        <span/>
                        <span/>
                        <span/>
                    </div>

                    <div class="sound-wrap">
                      <div class="button sound"  @click="onClickVolume()" :class="volume === 0 ? 'mute' : ''">
                          <img src="@/assets/image/volume-md.svg" height="18"/>
                          <span/>
                      </div>
                      <div class="sound-slide">
                        <div class="slide" 
                          @mouseover="soundOver = true" 
                          @mouseleave="soundOver = false"
                          @mousemove="onUpSound($event)"
                          @click="onClickSound($event)"
                        >
                            <div class="progress-wrap" :class="soundOver ? 'on' : ''" :style="'width:' + volume + '%;'">
                              <div class="thumb"/>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  

                  <!-- <div class="button stop"   @click="stop()">
                      <span/>
                  </div> -->

                  <span class="video-time-text">
                    <span class="now">{{time.minutes + ':' + time.seconds}}</span> 
                    <span class="divider">|</span> 
                    <span class="max">{{durationTime.minutes + ':' + durationTime.seconds}}</span>
                  </span>


                  <span class="video-utils">
                    <div class="button" @click="fullscreen()">
                      <img v-if="!isFullScreen" height="20" src="@/assets/image/fullscreen.svg" alt="full"/>
                      <img v-else height="20" src="@/assets/image/collapse.svg" alt="collapse"/>
                    </div>
                    <div class="logo-button" @click="openBaseUrl()">
                      <img height="16" src="@/assets/image/collapse.svg" alt="logo"/>
                    </div>
                  </span>
              </div>

            </div>

            <div class="video-click-effect" :class="clickEffectOn ? 'on':''">
                <div class="button" :class="playEffectIcon">
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                </div>
            </div>

            
        </div>

        <div class="video-overlay" absolute v-if="isInit" @click="start()">
            <div class="video-title">
              {{title}}
            </div>
            <div class="button play"   v-if="source">
                <span/>
                <span/>
                <span/>
                <span/>
            </div>

            <div v-else class="empty">
                비디오 파일이 없습니다.
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        source:{
            type:String,
            default:''
        },
        title:{
          type:String,
          default:''
        },
        thumbnail:{
          type:String,
          default:''
        },
        rounded:{
          type:Boolean,
          default: false
        }
    },
  data: () => ({
    file: null,
    video: null,
    videoControls: null,
    videoWorks: null,

    volume:100,
    volumeCache:100,
    volumeMute:false,

    isInit: true,
    isControlShow: false,
    playIcon: "play",
    playEffectIcon: "pause",

    clickEffectOn: false,

    resultEffectOn: false,

    progressWidth:0,
    progressOver: false,
    progressUp: false,

    soundWidth:0,
    soundOver: false,
    soundUp:false,

    time: {
      minutes: "00",
      seconds: "00",
    },
    durationTime: {
      minutes: "00",
      seconds: "00",
    },

    isShowDetail: true,

    inferenceResult: null,

    requestSequence: 0,
    currentSequence: 0,

    isFullScreen:false,
  }),

  mounted() {
    this.init();
  },

  watch: {
    isInit() {
      if (this.isisInit) {
        this.isControlShow = false;
        this.video.stop();
      } else {
        this.durationTime = this.formatTime(Math.round(this.video.duration));
      }
    },
    clickEffectOn() {
      if (this.clickEffectOn) {
        setTimeout(() => {
          this.clickEffectOn = false;
        }, 500);
      }
    },
    resultEffectOn() {
      if (this.resultEffectOn) {
        setTimeout(() => {
          this.resultEffectOn = false;
        }, 300);
      }
    },
  },

  computed: {},
  methods: {
    clickVideoUploader() {
      this.$refs.videoUploader.$children[0].$el.click();
    },

    init() {
      this.video = document.getElementById("video");
      this.video.controls = false;
      document.addEventListener('keydown', (e) => {
        if (e.which ===32) {
          e.preventDefault()
          this.togglePlay()
        } else if (e.which === 37) {
          if(!this.isInit) {
            e.preventDefault()
            this.video.currentTime -= 10
          }
        } else if (e.which === 39) {
          if(!this.isInit){
            e.preventDefault()
            let interval = this.video.duration > 300 ? 10 : 5
            let leftTime = this.video.duration - this.video.currentTime
            if(leftTime <= interval) {
              this.stop()
            } else {
              this.video.currentTime += interval
            }
          }
          
        }
      })

      this.volume = this.video.volume * 100
    },

    isPaused() {
      return this.video.paused || this.video.ended;
    },

    togglePlay() {
      if (!this.source) {
        this.clickVideoUploader();
        return;
      }
      this.clickEffectOn = true;
      if (this.isPaused()) {
        this.play();
      } else {
        this.pause();
      }
    },

    start() {
      this.video.currentTime = 0;
      this.play()
    },

    play() {
      this.video.play();
      this.isInit = false;
      this.playIcon = "pause";
      this.playEffectIcon = "play";
      this.video.focus()
    },

    pause() {
      this.playIcon = "play";
      this.playEffectIcon = "pause";
      this.video.pause();
    },

    stop() {
      this.isInit = true;
      this.playIcon = "play";
      this.video.currentTime = this.thumbnail;
      this.video.pause();
    },

    fullscreen() {
      if(!this.isFullScreen) {
        const player = document.getElementsByClassName('vui-video-player')[0]
        player.requestFullscreen()
      } else {
        document.exitFullscreen()
      }

      this.isFullScreen = !this.isFullScreen
      // if (this.video.webkitRequestFullscreen) {
      //   // Need this to support Safari
      //   this.video.webkitRequestFullscreen();
      //   this.video.controls = false;
      // } else {
      //   this.video.requestFullscreen();
      // }
    },

    onClickProgress(e){
      this.video.currentTime = this.video.duration * (e.offsetX / e.target.clientWidth);
      this.progressWidth = (e.offsetX * 100 / e.target.clientWidth)
    },

    onUpProgress(e){
      if((e.buttons | e.button) === 1 ) {
        this.progressUp = true
        this.video.currentTime = this.video.duration * (e.offsetX / e.target.clientWidth);
        this.progressWidth = (e.offsetX * 100 / e.target.clientWidth)
      } else {
        this.progressUp = false
      }
    },

    onClickSound(e){
      this.volume = Math.round(e.offsetX * 100 / e.target.clientWidth);
      this.video.volume = this.volume / 100
    },

    onUpSound(e){
      if((e.buttons | e.button) === 1 ) {
        this.soundUp = true
        this.volume = Math.round(e.offsetX * 100 / e.target.clientWidth);
        this.video.volume = this.volume / 100
      } else {
        this.soundUp = false
      }
    },

    onClickVolume() {
      this.volumeMute = !this.volumeMute

      if(this.volumeMute) {
        this.volumeCache = this.video.volume * 100
        this.volume = 0
      } else {
        this.volume = this.volumeCache
      }
      this.video.volume = this.volume / 100
    },

    timeUpdate() {
      if(this.video.currentTime >= this.video.duration) {
        this.stop()
        return
      }

      this.time = this.formatTime(Math.round(this.video.currentTime));

      this.resultEffectOn = true;

      if (!this.progressUp) {
        this.progressWidth = this.video.currentTime * 100 / this.video.duration
      }
    },

    videoOver() {
      this.isControlShow = true;
    },
    videoLeave() {
      console.log()
      if(this.video.paused)
        this.isControlShow = true;
      else
        this.isControlShow = false
    },

    formatTime(timeInSeconds) {
      if (!timeInSeconds) {
        return {
          minutes: "00",
          seconds: "00",
        };
      }
      const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
      return {
        minutes: result.substr(3, 2),
        seconds: result.substr(6, 2),
      };
    },

    openBaseUrl() {
      window.open("https://www.vazilcompany.com", "_blank");
    },
  },
};
</script>

<style lang="scss">
.vui-video-player {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  background: #000;
  display: inline-block;
  display: flex;
  justify-items: center;
  align-items: center;
  margin:0;
  padding:0;
  overflow: hidden;

  &.rounded{
    border-radius: 1.2em;
  } 

  .video-wrap{
    padding:0;
    padding-bottom:56.25%;
    margin:0;
    width:100%;
    height: 0;
    position: relative;
  }

  video {
    position: absolute;
    top:0;
    left:0;
    max-width: 100%;
    min-width: 100%;
    min-height: 100%;
    width: 100%;
    height: 100%;
    padding:0;
    margin:0;
    object-fit: contain;

    &::-webkit-media-controls {
        display:none !important;
    }
    &::-webkit-media-controls {
        display:none !important;
    }
    &::-webkit-media-controls-enclosure {
        display:none !important;
    }
    &::-webkit-media-controls-fullscreen-button {
        display:none !important;
    }
    
    &::-webkit-media-controls-panel {
        display: none!important;
        -webkit-appearance: none;
    }
    
    &::--webkit-media-controls-play-button {
        display: none!important;
        -webkit-appearance: none;
    }
    
    
    &::-webkit-media-controls-start-playback-button {
        display: none!important;
        -webkit-appearance: none;
    }

  }

  .video-controls-container{
    pointer-events: none;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    position: absolute;
    z-index: 2147483647; 
    bottom: 0;
    width: 100%;
    height: 100%;
    
      background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.36),
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.1),
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.36)
      );
  }

  .video-controls {
    pointer-events: auto;
    animation-name: fade;
    animation-duration: 200ms;
    animation-timing-function: ease-in-out;
    transition: all .2s ease-in-out;
    position: absolute;
    z-index: 2147483647; 
    bottom: 0;
    width: 100%;
    height: 64px;
    margin:0;
    padding:0;

    display: flex;
    align-items: center;

    .video-button-wrap{
      display: flex;
      margin:0 12px;
      padding:0;
    }

    .video-progress {
      position: absolute;
      background-color: #ffffff80;
      height:4px;
      display: flex;
      top: 0;
      width: calc(100% - 24px);
      margin-left: 12px;
      cursor: pointer;
      pointer-events: auto;

      &:hover{
        &::before{
          content: "";
          overflow: 0;
          width: 100%;
          position: absolute;
          top:calc(50% - 15px);
          height: 30px;
        }
      }

      

      .progress-wrap{
        pointer-events: none;
        width:0;
        background: $base-primary-opacity-color;
        position: relative;
        transition: all 0ms ease-in-out;

        .thumb{
          position: absolute;
          z-index: 10;
          width:6px;
          height: 6px;
          right:-3px;
          top:calc(50% - 3px);
          border-radius: 100%;
          background: $base-primary-color;
          opacity: 0;
          transition: all .2s ease-in-out;
        }

        &.on {
          
          box-shadow: 0 0px 3px $base-primary-shadow-color;
          .thumb{
            opacity: 1;
            width:12px;
            height: 12px;
            right:-6px;
            top:calc(50% - 6px);
          }
        }
      }
    }

    .video-time-text {
      font-size: 14px;
      color: #fff;
      margin: 0px;
      z-index: 5;
      height: 40px;
      line-height: 40px;
      .now{
        opacity: 1;
      }

      .max{
        opacity: 0.5;
      }

      .divider{
        font-size: 0.8em;
        margin:0 6px;
        opacity: 0.5;
      }
    }

    .video-utils{
      position: absolute;
      right:16px;
      top:calc(50% - 20px);
      height: 40px;
      display: flex;
      flex-direction: row;

      > .button{
        filter: brightness(0) saturate(100%) invert(100%) sepia(15%) saturate(0%) hue-rotate(11deg) brightness(103%) contrast(103%);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right:6px;
      }

      .logo-button{
        filter: brightness(0) saturate(100%) invert(100%) sepia(15%) saturate(0%) hue-rotate(11deg) brightness(103%) contrast(103%);
        cursor: pointer;
        display: flex;
        margin-left:6px;
        align-items: center;
        justify-content: center;
        transition: all .2s ease-in-out;

        &:hover{
          filter: none;
        }
      }
    }
  }

  .video-click-effect {
    pointer-events: none;
    opacity: 0;
    position: absolute;
    border-radius: 100%;
    background-color: $base-foreground-opacity-color;
    z-index: 5;
    top: calc(50% - 24px);
    left: calc(50% - 24px);
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    &.on {
      animation-name: video-click-animation;
      animation-duration: 500ms;
      animation-timing-function: ease-in-out;
    }

    span{
      transition: none !important;
    }
  }

  .video-title{
    position: absolute;
    left:0;
    top:0;
    margin:18px;
    font-size: 18px;
    color: #fff;
  }

  .video-overlay {
    transition: all .2s ease-in-out;
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height: 100%;
    background-color: rgba(0,0,0,0.3);
    color: #fff;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;

    
    cursor: pointer;

    .button{
      transform: scale(1.5);
      background-color: $base-background-opacity-color;
      //background: linear-gradient(to right bottom, $base-primary-color 15%, #99e5a2 95%);
      padding:6px;
      span {
        &:nth-child(1) {
          background: linear-gradient(90deg, $base-primary-color 0%, $base-primary-shadow-color 100%);
        }

        &:nth-child(2) {
          background: linear-gradient(90deg, $base-primary-shadow-color 0%, $base-primary-color 100%);
        }

        &:nth-child(3) {
          background: linear-gradient(90deg, $base-primary-color 0%, $base-primary-shadow-color 100%);
        }
      }
      position: relative;
      border-radius:100% !important;

      &:hover{
        background-color: $base-background-opacity-color;
      }
    }

    &:hover{
      .button{
        transform: scale(1.55);
        &::before{
          animation: rotating 2s linear infinite;
        }
      }
    }

    
  }

  .sound-wrap{
    display: flex;
    padding-right:0;
    align-items: center;
    .sound-slide{
      transition: all .1s ease-in-out;
      position: relative;
      margin-left:6px;
      width:0;
      opacity: 0;
    }

      
    &:hover{
      .sound-slide{
        width: 52px;
        opacity: 1;
        .slide{
          position: absolute;
          background-color: #ffffff80;
          height:3px;
          display: flex;
          top: -1.5px;
          left:0;
          width: 100%;
          cursor: pointer;
          pointer-events: auto;
          .progress-wrap{
            pointer-events: none;
            width:0;
            background: $base-background-color;
            position: relative;
            transition: all 0ms ease-in-out;

            .thumb{
              position: absolute;
              z-index: 10;
              width:6px;
              height: 6px;
              right:-3px;
              top:calc(50% - 3px);
              border-radius: 100%;
              background: $base-background-color;
              opacity: 0;
              transition: all .2s ease-in-out;
            }

            &.on {
              
              box-shadow: 0 0px 3px $base-primary-shadow-color;
              .thumb{
                opacity: 1;
                width:12px;
                height: 12px;
                right:-6px;
                top:calc(50% - 6px);
              }
            }
          }
        }
      }
    }
  }

  .button{
    width:40px;
    height: 40px;
    border-radius: 100%;
    position: relative;
    cursor: pointer;
    transition: all .2s ease-in-out;
    background-color: transparent;

    &.sound{
      span{
        position: absolute;
        width:0px;
        height: 2px;
        border-radius: 2px;
        opacity: 1;
        left:12px !important;
        top:11px !important;
        transform:rotate(45deg) !important;
      }
      img{
        position: absolute;
        width:18px;
        height: 18px;
        top:calc(50% - 9px);
        left:calc(50% - 9px);
        filter: brightness(0) saturate(100%) invert(100%) sepia(15%) saturate(0%) hue-rotate(11deg) brightness(103%) contrast(103%);
      }

      &.mute {
        span{
          position: absolute;
          width:24px;
          height: 2px;
          border-radius: 2px;
          opacity: 1;
          left:8px !important;
          top:19px !important;
          transform:rotate(45deg);
        }
      }
    }

    span {
        position: absolute;
        transition: all .2s ease-in-out;
        width:18px;
        height:4px;
        background-color: #fff;
        border-radius: 3px;
        &:nth-child(1) {
            top:calc(50% - 5.75px);
            left:calc(50% - 7px);
            transform:rotate(30deg);
        }
        &:nth-child(2) {
            top:calc(50% - 1.75px);
            left:calc(50% - 14px);
            transform:rotate(90deg);
        }
        &:nth-child(3) {
            top:calc(50% + 2.25px);
            left:calc(50% - 7px);
            transform:rotate(-30deg);
        }
    }

    &:active{
        background-color: $base-button-active-default-color;
    }

    &:hover{
        background-color: $base-button-active-default-color;
    }

    &.play{
        span {
            &:nth-child(1) {
                opacity: 1;
            }
            &:nth-child(2) {
                top:calc(50% - 1.75px);
                left:calc(50% - 14px);
                transform:rotate(90deg);
            }
            &:nth-child(3) {
                opacity: 1;
            }
            &:nth-child(4) {
                top:calc(50% - 0.5px);
                left:calc(50% - 14px);
                width:4px;
                height:1px;
                opacity: 0;
            }
        }
    }

    &.pause{
        span {
            &:nth-child(1) {
                opacity: 0;
            }
            &:nth-child(2) {
                top:calc(50% - 1.75px);
                left:6px;
                transform:rotate(90deg);
            }
            &:nth-child(3) {
                opacity: 0;
            }
            &:nth-child(4) {
                top:calc(50% - 9px);
                left:24px;
                width:4px;
                height:18px;
                opacity: 1;
            }
        }
    }

    &.stop{

    }
  }

}

@keyframes video-click-animation {
  0% {
    opacity: 1;
    transform: scale(2);
  }

  100% {
    opacity: 0;
    transform: scale(3);
  }
}
</style>