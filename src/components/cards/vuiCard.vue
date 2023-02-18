<template>
  <div class="vui-card" @click="onClickCard(content)" :class="showSimple ? 'simple' : ''">
    <div class="vui-card-wrap">
        <div class="vui-card-title" v-if="showTitle">
            <span class="category">{{$t(content.category)}}</span>

        </div>

        <div class="vui-card-image">
            <img alt="card-image" :src="content.image || ''" cover @error="replaceImage"/>
        </div>

        <div class="vui-card-content">
            <strong class="vui-card-content-title">{{content.title}}</strong>
            <p class="vui-card-content-subtitle" v-text="content.subtitle">
            </p>

            <div class="vui-card-content-tags" v-if="content.hashTags && !showSimple">
                <span
                    v-for="tag in content.hashTags.slice(0,5)"
                    :key="'hashtag-' + tag"
                    class="tag"
                >
                    #{{tag}}
                </span>
                <span
                    v-if="content.hashTags.length > 5"
                >
                    ..
                </span>
            </div>

            
            <span class="vui-card-content-right" v-if="!showSimple">{{content.editedDate}}</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        content:{
            type: Object,
            default: () => {
                return null
            }
        },
        baseUrl:{
            type:String,
            default: '/'
        },
        listUrl:{
            type: String,
            default:'/'
        },
        showTitle:{
            type: Boolean,
            default:false
        },
        showSimple:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {

        }
    },
    mounted() {

    },
    methods:{
        onClickCard(content) {
            if(content.isExternalLink) {
                window.open(content.externalUrl)
            } else {
                this.$router.push(this.baseUrl + '?id=' + content.id + '&list=' + this.listUrl)
            }
        },

        replaceImage(e) {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            const container = document.getElementsByClassName('vui-card-image')[0]

            canvas.width = container.clientWidth
            canvas.height = 280

            ctx.font = '32px bold Apple SD Gothic Neo, Pretendard-Regular, NotoSansKR, sans-serif '
            ctx.textBaseline = 'middle'
            ctx.textAlign = 'center'
            ctx.fillStyle = "#C4182890";
            ctx.fillRect(0, 0, container.clientWidth, 280);

            ctx.fillStyle = "#C4182830";
            ctx.beginPath();
            ctx.moveTo(container.clientWidth * 0.6, 0);
            ctx.lineTo(container.clientWidth, 0);
            ctx.lineTo(container.clientWidth, 200);
            ctx.fill();
            
            ctx.fillStyle = "#C4182860";
            ctx.beginPath();
            ctx.moveTo(container.clientWidth * 0.6, 280);
            ctx.lineTo(container.clientWidth, 280);
            ctx.lineTo(container.clientWidth, 140);
            ctx.fill();

            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(this.content.title, container.clientWidth / 2, 140)
            let src = canvas.toDataURL('image/png', 1.0)
            e.target.src = src
        }
    }

}
</script>

<style lang="scss" scoped>
.vui-card{
    display: flex;
    border-radius: 14px;
    flex: 0 1 calc(33.3% - 20px);
    max-width: calc(33.3% - 20px);
    box-shadow: 0 2px 24px #00000013;
    cursor: pointer;
    max-width: 420px;

    &:hover{
        transition: all .2s ease-in-out;
        transform: translateY(-10px);
        box-shadow: rgba(149, 157, 165, 0.2) 0px 16px 32px;
    }

    @media screen and (max-width: #{$breakpoint-desktop}) {   
        flex: 0 1 calc(50% - 8px);
        max-width: calc(50% - 8px);
    }
    
    @media screen and (max-width: #{$breakpoint-md}) {   
        flex: 0 1 calc(100% - 0px);
        max-width: calc(100% - 0px);
        border-radius: 0;
        &:hover{
            transform: none;
        }
    }
    
    

    .vui-card-wrap{
        padding:0 0 24px 0;
        margin:0;
        height:calc(100% - 48px);
        width:100%;
    }

    .vui-card-title{
        text-align: left;
        height:24px;
        line-height: 24px;
        margin:10px 20px;
        font-weight: bold;
        font-size: 13px;
        position: relative;
        

        @media screen and (max-width: #{$breakpoint-desktop}) {    
            margin:6px 12px;
            font-size: 12px;

            img{
                width:16px !important;
                height: 16px !important;
            }
        }

        img{
            position: absolute;
            left:0;
            width:18px;
            height:18px;
            margin-top:3px;
        }
        .category{
            position: relative;
            color: $base-background-color;
            font-weight: normal;
            font-size: 12px;
            &::before{
                content:'';
                position: absolute;
                left:-8px;
                top:-4px;
                width:100%;
                border-radius: 6px;
                height: 100%;
                padding:4px 8px;
                background-color: $base-primary-opacity-color;
                z-index: -1;

            }
        }

        
    }

    .vui-card-image{
        display: block;
        width:100%;
        height:280px;
        border-top-right-radius: 14px;
        border-top-left-radius: 14px;

        @media screen and (max-width: #{$breakpoint-desktop}) {    
            height:240px;
        }
        background-color: #eee;

        > img{
            border-radius: inherit;
            width:100%;
            height:100%;
            object-fit: cover;
        }
    }

    .vui-card-content{
        width:calc(100% - 40px);
        padding-bottom: 20px;
        margin:20px;
        position: relative;
        text-align: left;

        @media screen and (max-width: #{$breakpoint-desktop}) {    
            margin:18px;
            padding-bottom: 18px;
        }

        @media screen and (max-width: #{$breakpoint-md}) {    
            margin:16px;
            padding-bottom: 16px;
        }

        .vui-card-content-title{
            font-size:21px;
            font-weight: bold;
            max-width: 100%;
            display: inline-block;
            text-overflow: ellipsis; 
            white-space: nowrap; 
            overflow: hidden;

            @media screen and (max-width: #{$breakpoint-desktop}) {    
                font-size:18px;
            }

            @media screen and (max-width: #{$breakpoint-md}) {    
                font-size:16px;
            }
        }

        .vui-card-content-subtitle{
            font-size:15px;
            display: block;
            text-overflow: ellipsis; 
            word-wrap: break-word;
            -webkit-line-clamp: 2;
            height: 40px;
            line-height: 20px;
            color: $base-foreground-subtitle-color;
            overflow: hidden;
            @media screen and (max-width: #{$breakpoint-md}) {    
                padding:0;
                margin:0;
                font-size: 14px;
            }
        }

        .vui-card-content-tags{
            position: absolute;
            bottom:-20px;
            left:0;
            width:100%;
            height:30px;
            line-height: 30px;
            opacity: 0.7;
            font-size: 12px;

            @media screen and (max-width: #{$breakpoint-md}) {    
                padding:0;
                margin:0;
                height:24px;
                line-height: 24px;
            }

            .tag{
                background-color: $base-border-color;
                margin:3px;
                padding:3px 8px;
                border-radius: 6px;
                
            }
        }

        .vui-card-content-right{
            font-size: 13px;
            position: absolute;
            width:100%;
            bottom:-20px;
            right:0;
            text-align: right;
            height:30px;
            line-height: 30px;
        }
    }
}
</style>