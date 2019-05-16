<template>
    <div class="app_home">
        <section class="my-swiper">
            <swiper  :options="swiperOption" v-if="bannerList.length">
                <swiper-slide  class="my-swp-silde" v-for="(item, key) in bannerList" :key="key">
                    <img class="my-swp-img" :src="item.img_url" alt="">
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </section>
        <div class="my-info">
            <div class="notice">
                <div>
                    <span class="iconfont icon-gonggao"></span>
                    <span class="title">公告</span>
                </div>
                <div class="notice-content">
                    <swiper :options="swiperOption3" class="notice_swiper" v-if="noticeList.length">
                        <swiper-slide  class="my-swp-silde3"  v-for="(notice,index) in noticeList" :key="index">
                            <div class="notice_msg" @click="showNotice(notice.descript)">{{notice.title}}</div>
                        </swiper-slide>
                    </swiper>
                    <alert  v-if="show" :message="alertMsg" @close-alert="closeAlert"></alert> 
                </div>
            </div>
            <div class="date" @click="showDate(today,o_day,t_day)">
                <div>
                    <span class="iconfont icon-13"></span>
                    <span class="title">{{today}}</span>
                </div>
                <div class="lunar">
                    <div class="icon">农</div>
                    <span>{{o_day}}</span>
                </div>
                <div class="special">
                    <div class="icon">殊</div>
                    <span>{{t_day}}</span>
                </div>
            </div>
            <alert  v-if="show" :message="alertMsg" @close-alert="closeAlert"></alert>
        </div>
        <div class="my-merits">
            <div class="title">
                <div class="title_name">功德芳铭</div>
            </div>
            <div class="merit_content">
                <swiper :options="swiperOption2" class="merit_swiper"  v-if="meritList.length"  >
                    <swiper-slide  class="my-swp-silde2  swiper-slide-active" style="height:2px;"  v-for="(merit,key) in meritList" :key="key">
                       <div>{{merit.nick_name}}获得<span class="red" style="fontWeight:bolder;">{{merit.score}}</span>功德值</div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <div class="my-temple">
            <div class="temple_title">活动展示</div>
            <div class="temple_item"  v-for="(item,key) in templeList" :key="item.id">
                <img class="my-swp-img1" :src="item.img_url" alt="">
                <div class="temple_info">
                    <span class="iconfont icon-simiao"></span>
                    <div class="temple_name">
                        <span>{{item.title}}</span>
                        <span class="temple_addr">{{item.time}}</span>
                    </div>
                </div>
            </div>
        </div>
        <musicControl></musicControl>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import musicControl from './musicControl.vue';
import alert from './alert.vue';
import vueResource from 'vue-resource';
import $ from 'jquery';
    export default {
        name:'home', 
        components: { 
            swiper, swiperSlide,alert,musicControl
        },
        data(){
            return{
                show:false,
                alertMsg:'',
                bannerList:[],
                noticeList:[],
                timeList:[],
                today:'',
                o_day:'',
                t_day:'',
                templeList:[],
                meritList:[],
                swiperOption: {
                    pagination: { el: '.swiper-pagination' }, // 分页按钮
                    autoplay: {
                        disableOnInteraction: false,  // 用户操作swiper之后，是否禁止autoplay
                        delay: 2000, // 自动切换的时间间隔（单位ms）  
                    },
                    loop:true,
                    observer:true,
                    observeParents:true,
                },
                swiperOption1: {
                    autoplay: {
                        disableOnInteraction: false,  // 用户操作swiper之后，是否禁止autoplay
                        delay: 2000, // 自动切换的时间间隔（单位ms）  
                    },
                    loop:true,
                },
                swiperOption2: {
                    autoplay: {
                        disableOnInteraction: false,  // 用户操作swiper之后，是否禁止autoplay
                        delay: 3000, // 自动切换的时间间隔（单位ms）  
                    },
                    loop:true,
                    direction: 'vertical',
                },
                swiperOption3: {
                    autoplay: {
                        disableOnInteraction: false,  // 用户操作swiper之后，是否禁止autoplay
                        delay: 2000, // 自动切换的时间间隔（单位ms）  
                    },
                    loop:true,
                    direction: 'vertical',
                },
                iconSwiperOption: {
                    pagination: { el: '.swiper-pagination' },
                },
                
            }
        },
        beforeMount() {
            var that = this
             $.ajax({
                url:'http://192.168.31.119:8003/interface.php/V1/AppIndex/indexBanner',
                type:'POST',
                data:{
                    token:localStorage.getItem('token')
                },
                success(res){
                    // console.log(res.data)
                    that.bannerList = res.data
                }
            })

            $.ajax({
                url:'http://192.168.31.119:8003/interface.php/V1/AppIndex/indexNotice',
                type:'POST',
                data:{
                    token:localStorage.getItem('token')
                },
                success(response){
                    // console.log(response.data)
                    that.noticeList = response.data
                }
            })

             $.ajax({
                url:'http://192.168.31.119:8003/interface.php/V1/AppIndex/indexData',
                type:'POST',
                data:{
                    token:localStorage.getItem('token')
                },
                success(res){
                    console.log(res.data.today)
                    that.today = res.data.today
                    that.o_day = res.data.o_day
                    that.t_day = res.data.t_day
                },
            })
            $.ajax({
                url:'http://192.168.31.119:8003/interface.php/V1/AppIndex/indexScoreLog',
                type:'POST',
                data:{
                    token:localStorage.getItem('token')
                },
                success(res){
                    console.log(res.data)
                    that.meritList = res.data
                },
            })

            $.ajax({
                url:'http://192.168.31.119:8003/interface.php/V1/AppIndex/indexActivity',
                type:'POST',
                data:{
                    token:localStorage.getItem('token')
                },
                success(res){
                    that.templeList = res.data 
                },
            })

        },
        methods: {
            showNotice(notice){
                this.show = true;
                this.alertMsg = notice;
                console.log(notice)
            },
            closeAlert(){
                this.show = false;
            },
            showDate(today,o_day,t_day){
                this.show = true;
                this.alertMsg = today+"\n"+o_day+"\n"+t_day;
            }
        },
    }
</script>

<style lang='scss'>
    @import 'swiper/dist/css/swiper.css';
    @import '../../static/assets/iconfont/font.css';
    .swiper-wrapper{
        transition-timing-function:linear !important;
    }
    .app_home{
    background: #F3EFEB;
    height: 100%;
    .my-swiper{
        width: 100%;
        .my-swp-silde{
            height: 140px;
            .my-swp-img{
                width: 100%;
                height: 100%;
            }
        }
        .swiper-pagination{
            .swiper-pagination-bullet-active{
                background: #000;
            }
        }
    }
    .my-info{
        width: 100%;
        height: 80px;
        box-sizing: border-box;
        display: flex;
        padding: 9px 16px 9px 16px;
        background: #F9EEDA url("../../static/assets/images/texture.png") repeat repeat;
        .notice,.date{
            width: 50%;
            display: flex;
            flex-direction: column;
            position: relative;
            div{
                display: flex;
                align-items: center;
                .title{
                    color: #382F30;
                    font-size: 14px;
                    font-weight: bold;
                    margin-left: 8px;
                    vertical-align: middle;
                }
            }
            .notice-content{
                font-size: 13px;
                margin-top: 5px;
                color: #8B623E;
                line-height: 16px;
                max-height: 40px;
                width: 90%;
                &::before{
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    background-color: transparent;
                    z-index: 1;
                }
                .notice_swiper{
                    height: 50px!important;
                    .notice_msg{
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                    }
                }
            }
            .lunar,.special{
                font-size: 13px;
                color: #8B623E;
                display: flex;
                align-items: center;
                margin-top: 6px;
                .icon{
                    display: flex;
                    align-items: center;
                    width: 25px;
                    height: 14px;
                    line-height: 14px;
                    background: #3C160F;
                    text-align: center;
                    border-radius: 10px;
                    margin-left: 16px;
                    display: inline-block;
                    font-size: 13px;
                    color: #E5C89D;
                }
                span{
                    margin-left: 14px;
                    display: inline-block;
                    width: calc(100% - 50px);
                    vertical-align: middle;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            .special{
                .icon{
                    background: #A41522;
                }
            }
        }
        .date {
            &::before{
                content: '';
                width: 1px;
                height: 40px;
                position: absolute;
                background-color: rgba(60, 15, 22, .25);
                top: 25px;
                left: 0;
            }
            .iconfont{
                font-size: 18px;
                box-sizing: border-box;
                padding-left: 16px;
            }
        }
    }
    .my-merits{
        width: 100%;
        height: 100px;
        margin-top: 4px;
        padding: 10px 16px 10px 16px;
        box-sizing: border-box;
        background: #F9EEDA url("../../static/assets/images/merit.png") no-repeat no-repeat;
        background-position: center center;
        background-size: 100% 155px;
        position: relative;
        .title{
            display: flex;
            height: 30px;
            line-height: 30px;
            justify-content: space-between;
            position: relative;
            &::after{
                content: '';
                width: 100%;
                height: 1px;
                background: rgba(139, 98, 62, .6);
                position: absolute;
                bottom: 0px;
            }
            .title_name{
                font-size: 16px;
                color: #382F30;
                font-weight: bold;
            }
        }
        .merit_content{
            font-size: 12px;
            margin-top: 5px;
            color: #8B623E;
            overflow: hidden;
            width: 100%;
            height: 40px;
            .merit_swiper{
                height: 40px;
                line-height: 40px;
                .my-swp-silde2{
                    // height: 10px;
                    height: 20px ;
                    overflow: scroll;
                    overflow-y: hidden;
                    .swiper-slide-active{
                        height: 105px;
                        width: 100%;
                    }
                }
            }
        }
    }
    .my-temple{
        width: 100%;
        margin-top: 4px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        padding: 9px 16px 16px 16px;
        padding-bottom: 80px;
        background: #F9EEDA url("../../static/assets/images/texture.png") repeat repeat;
        .temple_title{
            color: #382F30;
            font-size: 16px;
            font-weight: bold;
            position: relative;
            text-align: center;
            display: inline-block;
            margin: 0 auto 8px auto;
            &::before,&::after{
                background: url("../../static/assets/images/cloud.png") no-repeat no-repeat;
            }
            &::before{
                content: '';
                position: absolute;
                width: 32px;
                height: 14px;
                left: -40px;
                top: 4px;
                background-size: 32px 14px;
            }
            &::after{
                content: '';
                position: absolute;
                width: 32px;
                height: 14px;
                right: -40px;
                top: 4px;
                background-size: 32px 14px;
                transform: scale(-1, 1);
            }
        }
        .temple_item{
            display: flex;
            position: relative;
            width: 100%;
            height: 150px;
            border-radius: 6px;
            margin-top: 12px;
            overflow: hidden;
            .temple_swiper{
                width: 100%;
                height: 150px;
                position: absolute;
                left: 0;
                top: 0;
                z-index: 0;
                border-radius: 6px;
                &::before{
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    background-color: transparent;
                    z-index: 1;
                }
                .my-swp-silde1{
                    height: 150px;
                    .my-swp-img1{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        left: 0;
                        top: 0;
                        z-index: 0;
                        border-radius: 6px;
                    }
                }
            }
            .temple_info{
                height: 45px;
                width: 100%;
                background: rgba(60, 22, 15, .6);
                position: absolute;
                bottom: 0;
                z-index: 2;
                border-bottom-left-radius: 6px;
                border-bottom-right-radius: 6px;
                display: flex;
                box-sizing: border-box;
                padding: 4px 16px 4px 16px;
                color: white;
                .iconfont{
                    font-size: 16px;
                }
                .temple_name{
                    margin-left: 10px;
                    span{
                        font-size: 15px;
                        font-weight: bold;
                        display: block;
                    }
                    .temple_addr{
                        color: #D1C0B2;
                        font-size: 13px;
                        font-weight: normal;
                        margin-top: 5px;
                    }
                }
            }
        }
    }
}
</style>
