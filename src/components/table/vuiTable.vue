<template>
  <div class="vui-table">
    <div class="vui-table-top" v-if="!hideTop">
        <h3 class="title">{{title}}</h3>
        
        <div class="vui-table-top-slot">
            <slot name="top">

            </slot>
            <div class="vui-input" v-if="!$slots.top">
                <input class="append-icon" type="text" name="search" id="search" v-model="searchKeyword" placeholder="검색어를 입력하세요."/>
                <img class="icon" src="../../assets/image/magnify.svg" width="16" height="16" alt="magnify" />
            </div>
        </div>
    </div>
    <div class="vui-table-content">
        <table>
            
            <thead v-if="headers">
                <tr v-if="!$slots.head">
                    <th v-if="showIndex">
                        번호
                    </th>
                    <th
                        v-for="header in headers"
                        :key="'vui-table-header-' + header.value"
                        :style="header.width ? 'min-width:' + header.width + 'px; max-width:' + header.width + 'px;' : ''"
                    >
                        {{header.text}}
                    </th>
                </tr>

                <slot name="head">

                </slot>
            </thead>

            <tbody v-if="items && items.length > 0">
                <tr
                     v-for="item, idx in filteredItems.slice(currPage * itemsPerPage, (currPage * itemsPerPage) + itemsPerPage)"
                    :key="'vui-table-item-' + idx"
                >
                    <td v-if="showIndex">
                        {{filteredItems.length - idx - (currPage * itemsPerPage)}}
                    </td>

                    <td
                        v-for="(header, hidx) in headers"
                        :key="idx + '-' + hidx"
                        :style="[header.width ? 'min-width:' + header.width + 'px; max-width:' + header.width + 'px;' : '',
                                    header.align ? 'text-align:' + header.align : ''
                                ]"
                    >
                        <slot :name="'item-'+header.value" v-bind:item="item">

                        </slot>
                        <span v-if="!$slots['item-'+header.value]">
                            {{item[header.value]}}
                        </span>
                    </td>

                    
                </tr>
            </tbody>

            <tbody v-else class="empty-tbody">
                <tr>
                    <td :colspan="headers.length + (showIndex ? 1 : 0)">{{$t('콘텐츠없음')}}</td>
                </tr>
            </tbody>


            <tfoot>
            </tfoot>
        </table>
    </div>

    <div class="vui-table-bottom" v-if="!hideBottom">
        <div class="pagination" v-if="!infinitePage">
            <div class="page-button prev double" @click="toFirst()">
                <span/>
                <span/>
                <span/>
                <span/>
            </div>
            <div class="page-button prev" @click="prev()">
                <span/>
                <span/>
            </div>

            <div class="page-number-wrap">
                <span v-for="page in range(pageTab*10 + 1, (pageTab * 10) + 10)" :key="'vui-page-' + page" class="page-number" :class="{active: currPage === (page - 1)}" @click="currPage = (page - 1)">
                    {{page}}
                </span>
            </div>
            
            <div class="page-button next" @click="next()">
                <span/>
                <span/>
            </div>

            <div class="page-button next double" @click="toLast()">
                <span/>
                <span/>
                <span/>
                <span/>
            </div>
        </div>

        <div class="more" v-else>
            <button class="vui-button" @click="itemsPerPage += 50" v-if="filteredItems.length > itemsPerPage">
                {{$t('더 보기')}}
            </button>

            <button class="vui-button" @click="scrollUp()" v-else-if="itemsPerPage > 100">
                {{$t('처음으로')}}
            </button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:'전체목록'
        },
        perPage:{
            type:Number,
            default:10
        },
        infinitePage:{
            type: Boolean,
            default: false
        },
        headers:{
            type: Array,
            default: () => {
                return []
            }
        },
        hideTop:{
            type: Boolean,
            defualt: false
        },
        hideBottom:{
            type: Boolean,
            defualt: false
        },
        items: {
            type: Array,
            default: () => {
                return []
            }
        },
        showIndex: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        filteredItems() {
            let items = this.items
            if(this.searchKeyword) {
                items = items.filter((e) => {
                    let exist = false
                    for(let k in e) {
                        if(e[k] && e[k].toString().indexOf(this.searchKeyword) !== -1) {
                            exist = true
                        }
                    }
                    return exist
                })
            }
            return items
        },

        pageTab() {
            return Math.floor(this.currPage / 10)
        },
        maxPageTab() {
            return Math.floor(this.filteredItems.length / this.itemsPerPage) + 1
        },
    },
    data() {
        return {
            searchKeyword:'',
            hrefPath:'/investment/notice/',
            hrefKey: 'id',

            itemsPerPage:10,
            currPage:0,

        }
    },
    mounted() {
    },
    methods:{
        prev() {
            this.currPage = this.currPage > 0 ? this.currPage - 1 : this.currPage

        },

        next() {
            this.currPage = this.currPage < this.maxPageTab - 1 ? this.currPage + 1 : this.currPage
        },

        toFirst() {
            this.currPage = 0
        },

        toLast() {
            this.currPage = this.maxPageTab - 1
        },

        range(start, end) {
            if(end > this.maxPageTab) {
                end = this.maxPageTab
            }
            return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start)
        },

        scrollUp() {
            window.scrollTo(0, 0)
        },
    }

}
</script>

<style lang="scss">
.vui-table{
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding:0;

    .vui-table-top{
        height: 43px;
        line-height: 43px;
        padding:0;
        margin:16px 0;
        text-align: left;
        position: relative;

        .title{
            padding:0;
            margin:0;
            font-size: 24px;
            font-weight: bold;
            
        }
        

        .vui-table-top-slot{
            position: absolute;
            right:0;
            top:0;

            @media screen and (max-width: #{$breakpoint-md}) {    
                max-width:calc(100% - 160px);
            }
        }
    }

    .vui-table-content{
        max-width: 100%;
        overflow-x: auto !important;
        table{
            width: 100%;
            min-width:640px;
            max-width: 100%;
            overflow-x: auto !important;
            font-size: 15px;
            border-collapse: collapse;
            

            thead{
                border-top: 2px solid $base-primary-opacity-color;
                tr{
                    border-bottom:2px solid $base-border-highlight-color;
                }
            }
            tbody{
                tr{
                    border-bottom:1px solid $base-border-color;
                    
                }

                &.empty-tbody{
                    
                        
                    td{
                        padding:128px 0;
                        font-size: 16px;
                        text-align: center;
                        color: $base-foreground-opacity-color;
                        text-align: center;

                    }
                }

            }
            th{
                padding:12px 6px;
                @media screen and (max-width: #{$breakpoint-md}) {    
                    padding:6px 3px;
                    font-size: 13px !important;
                }
            }
            td{
                vertical-align: middle;
                padding:12px 6px;
                @media screen and (max-width: #{$breakpoint-md}) {    
                    padding:6px 3px;
                    font-size: 13px !important;
                }
                a{
                    cursor: pointer;
                    padding:0;
                    margin: 0;
                    &:hover{
                        font-weight: bold;
                        text-decoration: underline;
                    }
                }
                *{
                    vertical-align: middle;
                    margin:0 4px;
                }
            }

        }
    }

    .vui-table-bottom{
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;
        padding:16px 0;
        margin:16px 0;
        text-align: left;
        position: relative;
        text-align: center;
        width:100%;
        max-width: 100%;
        

        .pagination {
            height: 48px;
            line-height: 48px;
            padding:0;
            margin:0;
            display: flex;
            justify-items: center;
            align-items: center;
            font-size: 16px;
            
            .page-number-wrap{
                padding:0;
                display: inline-block;
                height: 100%;
                margin: 8px;

                .page-number{
                    cursor: pointer;
                    margin:12px;
                    color: $base-foreground-opacity-color;

                    &:hover{
                        font-weight: bold;
                        text-decoration: underline;
                        color:$base-button-hover-color;
                    }

                    &.active{
                        font-weight: bold;
                        color: $base-foreground-color !important;
                        text-decoration: none !important;
                    }

                    @media screen and (max-width: #{$breakpoint-md}) {    
                        margin:6px;
                    }
                }

                @media screen and (max-width: #{$breakpoint-md}) {    
                    margin:0px;
                }
            }

            .page-button{
                padding:0;
                display: inline-block;
                margin:6px;
                height: 32px;
                width:32px;

                border-radius: 100%;
                position: relative;
                transition: 0.2s ease-in-out;
                background-color: $base-button-default-background-color;
                cursor: pointer;


                span {
                    width: 8px;
                    height: 2px;
                    position: absolute;
                    top: calc(50% + 1.5px);
                    left: 11px;
                    transition: all 0.1s ease-in-out;
                    background-color: $base-button-active-color;
                    transform: rotate(45deg);
            
                    &:nth-of-type(2) {
                        top: calc(50% - 3px);
                        right: 11px;
                        transform: rotate(-45deg);
                    }
                }

                &.double {
                    span {
                        width: 8px;
                        height: 2px;
                        position: absolute;
                        top: calc(50% + 1.5px);
                        left: 14px;
                        transition: all 0.1s ease-in-out;
                        background-color: $base-button-active-color;
                        transform: rotate(45deg);
                
                        &:nth-of-type(2) {
                            top: calc(50% - 3px);
                            left: 14px;
                            transform: rotate(-45deg);
                        }

                        &:nth-of-type(3) {
                            top: calc(50% + 1.5px);
                            left: 8px;
                            transform: rotate(45deg);
                        }

                        &:nth-of-type(4) {
                            top: calc(50% - 3px);
                            left: 8px;
                            transform: rotate(-45deg);
                        }
                    }

                }

                &.prev{
                    transform: rotate(0);
                    &:active {
                        transform: rotate(0) scale(0.9);
                    }
                }

                &.next{
                    transform: rotate(180deg);
                    &:active {
                        transform: rotate(180deg) scale(0.9);
                    }
                }

                &:hover{
                    span {
                        background-color: $base-button-background-color;
                    }
                }

                
                
            }
        }

        
    }
   
    
}
</style>