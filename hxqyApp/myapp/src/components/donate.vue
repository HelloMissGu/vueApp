<template>
    <div class="app_donate">
        <div class="donate_bar">
            <div class="donate_name">活动</div>
        </div>
        <div class="donate_container">
            <div class="empty_donate" v-if="donateList.length === 0">
                <p class="iconfont icon-kong"></p>
                <p>—— 暂无活动信息 ——</p>
            </div>
            <router-link :to="{path:'/donateDetail',query:{id:item.id}}" v-for="(item,key) in donateList" :key="key">
                <div class="donate_item">
                    <img :src="item.img_url" alt="">
                    <div class="donate_info">
                        <span class="donate_title">{{item.title}}</span>
                        <div class="donate_date">
                            <div>
                                <span class="iconfont icon-13"></span>
                                <span class="end_date">{{item.time}}</span>
                            </div>
                            <div>
                                <span class="donate_detail">查看活动详情</span>
                                <span class="iconfont icon-myIcon_right"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </router-link>
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
            donateList:[]
        }
    },
    beforeMount() {
          var that = this
             $.ajax({
                url:'http://192.168.31.119:8003/interface.php/V1/Activity/index',
                type:'POST',
                data:{
                    token:localStorage.getItem('token')
                },
                success(res){
                    console.log(res.data)
                    that.donateList = res.data
                }
            })
    },
    methods: {
      
    },
}
</script>
<style lang="scss">
    @import '../../static/assets/iconfont/font.css';
    .app_donate{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    background: #F9EEDA url("../../static/assets/images/texture.png") repeat repeat;
    .donate_bar{
        width: 100px;
        height: 30px;
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        margin-top: 16px;
        box-sizing: border-box;
        .donate_name{
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
    .donate_container{
        margin-top: 12px;
        position: relative;
        // height: calc(100% - 72px);
        margin-bottom: 80px;
        .empty_donate{
            margin-top: 50px;
            position: absolute;
            width: 100%;
            left: 50%;
            top: 40%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: #382F30;
            font-size: 14px;
            .iconfont{
                font-size: 32px;
                margin: 16px;
            }
        }
        .donate_item{
            width: 92%;
            height: 228px;
            margin: 0 auto 12px auto;
            background: #F3EFEB;
            box-shadow: 0 0 1px 0 rgba(0, 0, 0, .5);
            border-radius: 6px;
            display: flex;
            flex-direction: column;
            img{
                width: 100%;
                height: 160px;
                flex: 0 0 160px;
                border-radius: 6px;
            }
            .donate_info{
                box-sizing: border-box;
                padding: 10px 12px 8px 12px;
                flex: 1 0 auto;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .donate_title{
                    color: #3C160F;
                    font-size: 16px;
                    font-weight: bold;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    line-height: 16px;
                    max-height: 16px;
                }
                .donate_date{ 
                    display: flex;
                    justify-content: space-between;
                    .icon-13{
                        color: #8B623E;
                        font-size: 20px;
                        vertical-align: middle; 
                    }
                    .end_date{
                        color: #8B623E;
                        font-size: 14px;
                        vertical-align: middle; 
                    }
                    .donate_detail,.icon-myIcon_right{
                        color: #A41522;
                        font-size: 13px;
                    }
                }
            }
        }

    }
}
</style>

