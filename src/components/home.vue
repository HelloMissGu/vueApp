<template>
    <div class="app_home">
        <section class="my-swiper">
            <swiper :options="swiperOption">
                <swiper-slide  class="my-swp-silde" v-for="(banner, key) in bannerList" :key="key">
                    <img class="my-swp-img" :src="banner" alt="">
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
                <div class="notice-content" @click="showNotice">
                    <swiper :options="swiperOption3" class="notice_swiper">
                        <swiper-slide  class="my-swp-silde3" v-for="(notice,key) in noticeList" :key='key'>
                            <span>{{notice}}</span>
                        </swiper-slide>
                    </swiper>
                    <alert v-if="show"></alert>
                </div>
            </div>
            <div class="date">
                <div>
                    <span class="iconfont icon-13"></span>
                    <span class="title">时间</span>
                </div>
                <div class="lunar">
                    <div class="icon">农</div>
                    <span>111</span>
                </div>
                <div class="special">
                    <div class="icon">殊</div>
                    <span>123</span>
                </div>
            </div>
        </div>
        <div class="my-merits">
            <div class="title">
                <div class="title_name">功德芳铭</div>
            </div>
            <div class="merit_content">
                <swiper :options="swiperOption2" class="merit_swiper">
                    <swiper-slide  class="my-swp-silde2" style="height:2px;"  v-for="(merit,key) in meritList" :key='key'>
                       <span>{{merit}}</span>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <div class="my-temple">
            <div class="temple_title">寺庙展示</div>
            <div class="temple_item"  v-for="(item,key)  in templeList" :key="item.id">
                <swiper :options="swiperOption1" class="temple_swiper">
                    <swiper-slide  class="my-swp-silde1" >
                        <img class="my-swp-img1" :src="item.images" alt="">
                    </swiper-slide>
                </swiper>
                <div class="temple_info">
                    <span class="iconfont icon-simiao"></span>
                    <div class="temple_name">
                        <span>{{item.name}}</span>
                        <span class="temple_addr">{{item.address}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import alert from './alert.vue';
    export default {
        name:'home',
        components: { 
            swiper, swiperSlide,alert 
        },
        data(){
            return{
                show:false,
                alertMsg:'',
                swiperOption: {
                    pagination: { el: '.swiper-pagination' }, // 分页按钮
                    autoplay: {
                        disableOnInteraction: false,  // 用户操作swiper之后，是否禁止autoplay
                        delay: 2000, // 自动切换的时间间隔（单位ms）  
                    },
                    loop:true,
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
                        delay: 2000, // 自动切换的时间间隔（单位ms）  
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
                bannerList:[
                    'https://gongde.oss-cn-shenzhen.aliyuncs.com/0b1de4e2bde64ec694111363d37d6b26.png',
                    'https://gongde.oss-cn-shenzhen.aliyuncs.com//b5b74aad71fe4187ba11cce83fe62415.jpeg',
                    'https://gongde.oss-cn-shenzhen.aliyuncs.com//b5b74aad71fe4187ba11cce83fe62415.jpeg'
                ],
                noticeList:[
                    '春节快乐！春节快乐！春节快乐！春节快乐！春节快乐！春节快乐！',
                    '五一放假通知',
                    
                ],
                meritList:[
                   '***捐赠了***功德值***捐赠了',
                   '***捐赠了***功德值***捐赠了***功德值***捐赠了***',
                   '***捐赠了***功德值***捐赠了',
                   '***捐赠了***功德值',
                   '***捐赠了***功德值',
                   '***捐赠了***功德值',
                   '***捐赠了***功德值',
                ],
                templeList:[
                    {
                        id:'1',
                        images:[
                            'https://gongde.oss-cn-shenzhen.aliyuncs.com/3b9654a935b245d1b3b76daa5f23451f.jpeg',
                            // 'https://gongde.oss-cn-shenzhen.aliyuncs.com/03719a4023354795849c87c78606657f.jpeg',
                        ],
                        name:'测试',
                        address:'深圳'
                    },
                    {
                        id:'2',
                        images:[
                            // 'https://gongde.oss-cn-shenzhen.aliyuncs.com/0b1de4e2bde64ec694111363d37d6b26.png',
                            // 'https://gongde.oss-cn-shenzhen.aliyuncs.com//b5b74aad71fe4187ba11cce83fe62415.jpeg',
                            // 'https://gongde.oss-cn-shenzhen.aliyuncs.com/0af8b26e8ed640829b16a87b295c9378.jpeg',
                            'https://gongde.oss-cn-shenzhen.aliyuncs.com/d10d2f61651e43109377e48a423cc91a.jpeg'
                            
                        ],
                        name:'测试',
                        address:'北京'
                    },
                    {
                        id:'3',
                        images:[
                            // 'https://gongde.oss-cn-shenzhen.aliyuncs.com/3b9654a935b245d1b3b76daa5f23451f.jpeg',
                            'https://gongde.oss-cn-shenzhen.aliyuncs.com/03719a4023354795849c87c78606657f.jpeg',
                            // 'https://gongde.oss-cn-shenzhen.aliyuncs.com//b5b74aad71fe4187ba11cce83fe62415.jpeg'
                        ],
                        name:'测试',
                        address:'上海'
                    },
                ]
            }
        },
        beforeMount() {
            // this.axios.get(`operation/banners`)
            // .then(response => {
            //     this.bannerList = 
            // })
        },
        methods: {
            showNotice(){
                this.show = !this.show
            }
        },
    }
</script>

<style lang='scss'>
    @import 'swiper/dist/css/swiper.css';
    @import '../../static/assets/iconfont/font.css';
    @import '../../static/sass/home.scss';
    
</style>
