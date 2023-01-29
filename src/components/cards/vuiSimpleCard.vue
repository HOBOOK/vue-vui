<template>
    <div
        class="vui-simple-card"
        :class="!content.image ? 'no-image' : ''"
        @click="onClickCard(content)"
    >
        <div class="content">
            <div class="background" v-if="content.image" :style="'background-image:url(' + content.image + ')'"/>

            <h3>
                {{content.title}}
                
                <!-- <div class="button next" @click="next()">
                <span/>
                <span/>
                </div> -->
            </h3>

            <div class="tag-wrap">
                <span v-for="tag in content.hashTags" :key="'tag-' + content.id + tag" class="tag">
                #{{tag}}
                </span>
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
.vui-simple-card{
    flex:1 1 calc(25% - 24px);
    height: 100% !important;
    border-bottom: 1px solid $base-border-color;
    margin:12px;
    padding:0;
    background-color: $base-background-color;
    border-radius: 14px;
    box-shadow: 0 2px 24px #00000013;
    color: $base-foreground-color;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    transition: all .2s ease-in-out;

    @media screen and (max-width: #{$breakpoint-desktop}) {   
    flex: 1 1 50%;
    max-width: calc(50% - 12px);
    }

    @media screen and (max-width: #{$breakpoint-mobile}) {   
    flex: 1 1 100%;
    max-width: 100%;
    }

    &:hover{
    transform: translateY(-6px);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 16px 32px;
    }

    &.no-image{
    > .background{
        display: none;
    }
    }

    .background{
    transition: all .3s ease-in-out;
    width:100%;
    height: 210px;
    border-radius: inherit;
    background-size: cover;
    }
    
    > .content{
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: left;
    }


    .tag-wrap{
    font-size: 14px;
    z-index: 10;
    margin:20px; 
    height: 20px;
    .tag{
        margin:4px;
    }
    }

    

    h3{
    margin:20px; 
    cursor:pointer;
    position: relative;
    z-index: 10;
    font-size: 20px;
    text-align: left;
    height: 58px;
    text-overflow: ellipsis; 
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    overflow: hidden;

    @media screen and (max-width: #{$breakpoint-md}) {    
        font-size: 16px;
        height: 46px;
    }
    }
}
</style>