<template>
  <div class="vui-stepper">
    <div 
      class="vui-stepper-item"
      v-for="(item, idx) in items"
      :key="'vsi-' + idx"
    >
      <div class="step">
        <h3>{{(idx.toString().length === 1 ? '0' : '')  + (idx + 1)}}</h3>

        <div class="title">
          {{item.title}}
        </div>
      </div>

      
      <slot class="content" name="content"></slot>
      <div class="content" v-if="!$slots.content">
        {{item.content}}
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
    props:{
      items:{
        type: Array,
        default: () => []
      }
    },
    data() {
        return {
        }
    },
    methods:{
    }

}
</script>

<style lang="scss">

.vui-stepper{
    margin:24px auto;
    width:100%;
    text-align: right;
    top:$header-height;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    column-gap: 24px;

    @media screen and (max-width: #{$breakpoint-md}) {   
      column-gap: 0px;
    }

    .vui-stepper-item{
      display: flex;
      flex-direction: column;
      width:100%;
      align-items: center;
      flex:2 1 auto; 
      text-align: center;
      position:relative;

      &:nth-of-type(4){
        &::before{
          display: none !important;
        }

        .step{
           &::after{
            animation-delay: 12s;
          }
        }
      }

      &:nth-of-type(3){
        &::before{
          animation-delay: 11s;
        }

        .step{
           &::after{
            animation-delay: 8s;
          }
        }
      }

      &:nth-of-type(2){
        &::before{
          animation-delay: 7s;
        }

        .step{
           &::after{
            animation-delay: 4s;
          }
        }
      }

      &:nth-of-type(1){
        &::before{
          animation-delay: 3s;
        }

        .step{
           &::after{
            animation-delay: 0s;
          }
        }
      }

      

      .step{
        width:196px;
        height:196px;
        border-radius: 100%;
        position:relative;
        border:1px solid $base-border-color;;
        display: flex;
        font-size: 21px;
        font-weight: bold;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: column;
        column-gap: 0;

        @media screen and (max-width: #{$breakpoint-desktop}) {   
          width:128px;
          height:128px;
          font-size: 19px;
        }
        @media screen and (max-width: #{$breakpoint-md}) {   
          width:76px;
          height:76px;
          font-size: 16px;
        }
        h3{
          padding:0;
          margin:0;
          font-size: 1em;
          color: $base-primary-color;
        }

        .title{
          font-size: 0.9em;
        }

        &::after{
          opacity:0;
          transition: all 0.3s ease-in-out;
          content:'';
          position:absolute;
          top:-2px;
          left:-2px;
          width:100%;
          height:100%;
          border-radius: 100%;
          animation: step 3s ease-in-out;
          border:2px dashed $base-primary-shadow-color;
        }
      }

      .content {
        
        font-size: 1em;
        margin:24px 10%;
        color: $base-foreground-sub-color;
      }

      

      &::before{
        content:'';
        position:absolute;
        height: 16px;
        width:16px;
        top:106px;
        right:-20px;
        filter: brightness(0) saturate(100%) invert(17%) sepia(33%) saturate(6657%) hue-rotate(340deg) brightness(97%) contrast(97%);
        opacity: 0;
        background-image: url('@/assets/image/arrow-right.svg');
        background-size: contain;
        background-repeat: no-repeat;
        animation: fade_right 1s ease-in-out;

        @media screen and (max-width: #{$breakpoint-desktop}) {   
          height: 12px;
          width:12px;
          top:72px;
          right:-18px;
        }

        @media screen and (max-width: #{$breakpoint-md}) {   
          height: 8px;
          width: 8px;
          top: 42px;
          right:-4px;
        }

      }

      
    }

  @keyframes step {
    0% {
      opacity:0;
      -ms-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    20% {
      opacity:1;
    }
    80% {
      opacity:1;
    }
    100% {
      opacity:0;
      -ms-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
    

}

</style>