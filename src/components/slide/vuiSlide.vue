<template>
<div class="vui-slide" :style="overflowHidden? 'overflow-x:hidden;' : ''">
    <div 
        class="vui-slide-container"
        @scroll="onScroll"
    >
        <div class="slide-item-wrap" >
            <div class="slide-item container-width"
                v-for="(item, index) in items"
                :key="item.title"
                :class="index < slide + maxCount && index >= slide ? 'active' : ''"
            >
                <div class="item"
                    :style="[
                        'left:' + ((index-slide) * 100 / maxCount) + '% !important;',
                        'max-width:calc(' + (100 / maxCount) + '% - ' + 16 + 'px);' 
                    ]"
                    :class="item.externalUrl ? 'link' : ''"
                    @click="onClickItem(item, index)"
                >
                    <div class="item-image-cover">
                        <div class="item-image" :style="[item.image.indexOf('@') !== -1 ? { backgroundImage: 'url(' + item.image + ')' } : {backgroundImage: 'url(' + item.image + ')'},
                                                        contain ? 'background-size:contain !important;' : ''
                                                        ]"
                        >
                            <img v-if="item.image.indexOf('@') !== -1" :src="require(item.image)" height="24"/>
                        </div>
                    </div>

                    <div class="item-content">
                    <h3>{{item.title}}</h3>
                    <h4>{{item.subtitle}}</h4>
                    </div>
                </div>
            </div>
        </div>

        
    </div>

    <div class="slide-button-wrap" v-if="isMoveable">
        <div class="slide-button prev" @click="prev()">
            <span/>
            <span/>
        </div>

        <div class="slide-button next" @click="next()">
            <span/>
            <span/>
        </div>

        <div class="slide-sequence">
            <span v-for="n in items.length" :key="'sequence-' + n" :class="(n - 1) <= (slide+(maxCount-1)) && (n-1) >=slide? 'active': ''">
            </span>
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
        showCount:{
            type: Number,
            default: 1
        },
        overflowHidden:{
            type: Boolean,
            default: false
        },
        contain:{
            type: Boolean,
            default:false
        }
    },
    computed:{
        isMoveable() {
            return this.items.length > this.maxCount
        },
    },
    data() {
        return {
            slide:0,
            maxCount: 1,
        }
    },
    mounted() {
        this.setMaxItemCount()
        window.addEventListener('resize', () => {
            this.setMaxItemCount()
        })
    },
    watch:{
    },
    methods:{
        setMaxItemCount() {
            this.maxCount = window.innerWidth < 520 ? 1 : window.innerWidth < 768 ? 2 : this.showCount
        },
        prev() {
            this.slide = this.slide > 0 ? this.slide - 1 : this.items.length - this.maxCount
        },
        next() {
            this.slide = this.slide < this.items.length - this.maxCount ? this.slide + 1 : 0
        },

        onScroll(){
            //const item = document.getElementsByClassName('item')[0]
        },

        onClickItem(item, index) {
            if(index < this.slide + this.maxCount && index >= this.slide) {
                if(item.externalUrl) {
                    this.$utils.openLink(item.externalUrl)
                }
            } else if(this.isMoveable){
                this.slide = index
            }
            
        }
    }

}
</script>

<style lang="scss">

.vui-slide{
    height: 600px;
    position: relative;
    width:100%;
    padding-bottom:64px;

    @media screen and (max-width: #{$breakpoint-md}) {    
        height: 320px;
        overflow-x: hidden;;
        padding-bottom:32px;
    }
    .vui-slide-container{
        position: absolute;
        left:0;
        width:calc(100vw - 48px);
        max-width: calc(100vw - 48px);
        height: 600px;
        
        @media screen and (max-width: #{$breakpoint-md}) {    
            height: 320px;
            width: 100%;
            max-width: 100%;
        }

        &::-webkit-scrollbar {
            width: 4px;
            height: 4px;
        }

        &::-webkit-scrollbar-thumb {
            background: rgba(90, 90, 90, 0);
        }

        &::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0);
        }

        .slide-item-wrap {
            display: block;
            height: 100%;
            max-width: 100% !important;
            transition: all 0.3s ease-in-out;
            position: relative;
            .slide-item{
                width:100%;
                height: 100%;
                padding:0;
                margin:0;
                position: absolute;
                display: inline-block;
                opacity: 0.1;
                pointer-events: none;

                &.active{
                    opacity: 1;
                }
                .item{
                    pointer-events: all;
                    transition: all 0.3s ease-in-out;
                    position: absolute;
                    width:calc(100% - 16px);
                    margin:0 8px;
                    height: 100%;
                    z-index: 1;
                    &.link{
                        cursor: pointer;
                    }

                    .item-image-cover{
                        width:100%;
                        height: calc(100% - 100px);
                        overflow:hidden;
                        border-radius: 14px;
                    }
                    
                    

                    .item-image{
                        transition: all 0.3s ease-in-out ;
                        background-size: cover;
                        background-repeat: no-repeat;
                        width:100%;
                        height: 100%;
                        background-position: center center;
                        background-color: rgba(0,0,0,0.05);
                        border-radius: inherit;
                        
                    }

                    &:hover{
                        &.link{
                            h3{
                                color:$base-primary-color;
                            }
                        }
                        .item-image {
                            transform: scale(1.05);
                        }
                    }

                    .item-content{
                        width: 100%;
                        display: block;
                        margin:0;
                        padding:0;
                        

                        h3{
                            font-size: 24px;
                            max-width: 100%;
                            text-overflow: ellipsis; 
                            white-space: nowrap; 
                            overflow: hidden;
                            margin-bottom: 0;
                            @media screen and (max-width: #{$breakpoint-md}) {    
                                font-size: 18px;
                            }
                            
                        }

                        h4{
                            margin:6px 0;
                            font-size: 16px;
                            text-overflow: ellipsis; 
                            white-space: nowrap; 
                            overflow: hidden;
                            @media screen and (max-width: #{$breakpoint-md}) {    
                                font-size: 15px;
                            }
                        }
                        
                    }
                }
            }
        }

        

        
    }
    .slide-button-wrap{
            position: absolute;
            bottom:0;
            left:0;
            display: flex;
            justify-items: center;
            .slide-sequence{
                padding:0;
                margin: 6px 6px 6px 24px;
                height: 32px;
                display: inline-flex;
                flex-direction: row;
                align-items: center;
                span {
                    width:18px;
                    height: 2px;
                    background-color: $base-button-default-background-color;
                    transition: all 0.2s ease-in-out;
                    display: inline-block;
                    margin:0 0;

                    &.active{
                        background-color: $base-primary-color;
                    }
                }
            }
            .slide-button{
                padding:0;
                display: inline-block;
                margin:6px;
                height: 32px;
                width:32px;

                border-radius: 100%;
                position: relative;
                border:1px solid $base-button-default-background-color;
                cursor: pointer;

                span {
                    width: 8px;
                    height: 2px;
                    position: absolute;
                    top: calc(50% + 1.5px);
                    left: 11px;
                    transition: all 0.1s ease-in-out;
                    background-color: $base-button-background-color;
                    transform: rotate(45deg);
            
                    &:nth-of-type(2) {
                        top: calc(50% - 3px);
                        right: 11px;
                        transform: rotate(-45deg);
                    }
                }

                &.prev{
                    transform: rotate(0);
                    &:active{
                        transform: scale(0.95);
                    }
                }

                &.next{
                    transform: rotate(180deg);
                    &:active{
                        transform: scale(0.95) rotate(180deg);
                    }
                }

                &.disabled{
                    opacity: 0.5;
                }

                
            }

        }
}


</style>