<template>
  <div class="vui-list-card">
    <div class="vui-card-wrap" @click="onClickCard(content)">
        

        <div class="vui-card-image">
            <img alt="card-image" :src="content.image || ''" cover @error="replaceImage"/>
        </div>

        <div class="vui-card-content-wrap">
            <div class="vui-card-content">
                <strong class="vui-card-content-title">{{content.title}}</strong>
                <p class="vui-card-content-subtitle" v-text="content.subtitle">
                </p>

                <div class="vui-card-content-tags" v-if="content.hashTags">
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
            </div>
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

        getCategoryImage(category) {
            return '@/assets/image/category/' + category.toLowerCase() + '.svg'
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
.vui-list-card{
    display: flex;
    flex: 0 1 calc(100%);
    max-width:  calc(100%);
    border-bottom:1px solid $base-border-color;
    padding-bottom:3vh;

    

    .vui-card-wrap{
        margin:32px;
        padding:0;
        width:100%;
        display: flex;
        flex-direction: row;
        cursor: pointer;

        @media screen and (max-width: #{$breakpoint-md}) {   
            padding:0;
        }

        &:hover{
            transition: all .2s ease-in-out;
            .vui-card-content-title{
                &::before{
                    width:100% !important;
                    bottom: calc(20% + 3px) !important;
                    height: 6px !important;
                }
            }
            .vui-card-image{
                img{
                    transform: scale(1.05);
                }
            }
        }
    }
    
    .vui-card-image{
        width:480px;
        max-width: 40%;
        border-radius: 14px;
        height:240px;
        background-color: #eee;
        overflow:hidden;

        > img{
            transition: all 0.5s ease-in-out;
            width:100%;
            height:100%;
            border-radius: inherit;
            object-fit: cover;
        }

        @media screen and (max-width: #{$breakpoint-desktop}) {   
            height:190px;
        }

        @media screen and (max-width: #{$breakpoint-md}) {   
            height:170px;
            border-radius: 0px;
        }
    }

    .vui-card-content-wrap{
         width: 100%;

        .vui-card-content{
            width:calc(100% - 64px);
            margin:0 32px;
            position: relative;
            text-align: left;

            @media screen and (max-width: #{$breakpoint-desktop}) {    
                margin:0 24px;
                width:calc(100% - 48px);
            }

            @media screen and (max-width: #{$breakpoint-md}) {    
                margin:0 12px;
                width:calc(100% - 24px);
            }

            .vui-card-content-title{
                font-size:28px;
                font-weight: bold;
                max-width: 100%;
                display: inline-block;
                text-overflow: ellipsis; 
                white-space: nowrap; 
                overflow: hidden;
                position: relative;
                &::before{
                    transition: all .3s ease-in-out;
                    content:'';
                    position: absolute;
                    width:0;
                    bottom: 20%;
                    height: 0px;
                    z-index: -10;
                    opacity: 0.5;
                    transform: rotate(-2deg);
                    background-color: $base-primary-opacity-color;
                }

                

                @media screen and (max-width: #{$breakpoint-desktop}) {    
                    font-size:18px;
                }

                @media screen and (max-width: #{$breakpoint-md}) {    
                    font-size:16px;
                }
            }

            .vui-card-content-subtitle{
                font-size:16px;
                display: block;
                text-overflow: ellipsis; 
                word-wrap: break-word;
                -webkit-line-clamp:5;
                height: 155px;
                line-height: 30px;
                margin:0;
                color: $base-foreground-subtitle-color;
                overflow: hidden;

                @media screen and (max-width: #{$breakpoint-desktop}) {    
                    height: 120px;
                    line-height: 24px;
                    font-size:15px;
                }

                @media screen and (max-width: #{$breakpoint-md}) {    
                    height: 100px;
                    -webkit-line-clamp:4;
                    padding:0;
                    margin:0;
                    font-size: 14px;
                }
            }

            .vui-card-content-tags{
                position: absolute;
                bottom:-32px;
                left:0;
                width:100%;
                height:24px;
                line-height: 24px;
                opacity: 0.7;
                font-size: 12px;

                .tag{
                    border:0;
                    padding:8px 10px;
                    border-radius: 10px;
                    margin-right:2px;
                    background-color: $base-button-default-background-color;
                }



                @media screen and (max-width: #{$breakpoint-md}) {    
                    padding:0;
                    margin:0;
                    
                    height:24px;
                    line-height: 24px;
                    font-size: 12px;
                }
            }
        }
    }

   
}
</style>