<template>
    <div class="app_news">
        <div class="news_bar">
            <div class="news_name">法讯</div>
        </div>
        <div class="news_container">
            <div class="empty_news" v-if="newsList.length === 0">
                <p class="iconfont icon-kong"></p>
                <p>—— 暂无法讯信息 ——</p>
            </div>
            <router-link :to="{path:'/newsDetail',query:{id:item.id}}" v-for="(item,key) in newsList" :key="key">
                <div class="news_item">
                    <img :src="item.cover" alt="">
                    <div class="news_info">
                        <span class="news_title">{{item.title}}</span>
                        <div class="news_date">
                            <div>
                            <span class="iconfont icon-13"></span>
                            <span class="created_date">发布时间{{item.create_time}}</span>
                            </div>
                            <span class="iconfont icon-myIcon_right"></span>
                        </div>
                    </div>
                </div>
            </router-link>
            <span class="load_more" v-if="page < Math.ceil(count/10)" @click="loadMore(page)">点击加载更多</span>
            <span class="load_more" v-else>没有更多了</span>
            
        </div>
        <musicControl></musicControl>
    </div>
</template>
<script>
import musicControl from './musicControl.vue';
import $ from 'jquery';
export default {
    components:{musicControl},
    data(){
        return{
            page:'',
            count:'',
            newsList:[],
        }
    },
    beforeMount() {
            var that = this;
            $.ajax({
                url:'http://192.168.31.119:8003/interface.php/V1/News/index',
                type:'POST',
                data:{
                    token:localStorage.getItem('token'),
                    pageSize:1
                },
                success(res){ 
                    // console.log(res.data)
                    that.newsList = res.data.data
                    that.count = res.data.count
                    that.page = res.data.page
                }
            })
    },
    methods: {
        loadMore(page){
            console.log(page)
            var that = this;
            var page = Number(page) + Number(1)
            $.ajax({
                url:'http://192.168.31.119:8003/interface.php/V1/News/index',
                type:'POST',
                data:{
                    token:localStorage.getItem('token'),
                    pageSize:page
                },
                success(res){ 
                    // console.log(res.data.data)
                    that.newsList.push.apply(that.newsList,res.data.data)
                    that.count = res.data.count
                    that.page = res.data.page
                }
            })
        },
    },
}
</script>
<style lang="scss">
    // @import '../../static/sass/news.scss';
    @import '../../static/assets/iconfont/font.css';
    .app_news{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    background: #F9EEDA url("../../static/assets/images/texture.png") repeat repeat;
    .news_bar{
        width: 100px;
        height: 30px;
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        margin-top: 16px;
        box-sizing: border-box;
        .news_name{
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
    }
    .news_container{
        margin-top: 20px;
        position: relative;
        margin-bottom: 80px;
        .empty_news{
            position: absolute;
            width: 100%;
            left: 50%;
            top: 40%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: #382F30;
            font-size: 14px;
            margin-top: 40px;
            .iconfont{
                font-size: 32px;
                margin: 16px;
            }
        }
        .news_item{
            width: 92%;
            height: 100px;
            margin: 0 auto 12px auto;
            background: #F3EFEB;
            box-shadow: 0 0 1px 0 rgba(0, 0, 0, .5);
            border-radius: 6px;
            display: flex;
            img{
                flex: 0 0 150px;
                height: 100px;
                border-top-left-radius: 6px;
                border-bottom-left-radius: 6px;
            }
            .news_info{
                height: 100%;
                width: calc(100% - 150px);
                padding: 6px 10px 6px 10px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                flex: 1 0 auto; 
                .news_title{
                    font-size: 13px;
                    font-weight: bold;
                    color: #3C160F;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    line-height: 18px;
                    max-height: 54px;
                }
                .news_date{
                    font-size: 13px;
                    color: #8B623E;
                    font-weight: normal;
                    display: flex;                 
                    justify-content: space-between;
                    align-items: center;
                    .icon-13{
                        font-size: 20px;
                        vertical-align: middle;
                    }
                    .created_date{
                        vertical-align: middle;

                    }
                    .icon-myIcon_right{
                        font-size: 14px;
                        color: #A41522;
                    }
                }
            }
        }
        .load_more{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #8B623E;
        }
    }
}
</style>
