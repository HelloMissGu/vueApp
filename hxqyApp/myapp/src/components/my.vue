<template>
    <div class="app_my">
        <div class="my_info">
            <img :src="headimg" alt="">
            <div class="my_name">
                <div class="name">{{user_name}}</div>
                <div class="merit">
                    <span class="iconfont icon-xianglu"></span>
                    <span>{{score}}功德值</span>
                </div>
            </div>
        </div>
        <div class="my_menu">
            <div class="menu_list">
                <div class="helper"></div>
                <router-link to="/payOrder">
                    <div class="menu_item">
                        <span>我的订单</span>
                        <span class="iconfont icon-myIcon_right"></span>
                    </div>
                </router-link>
                <router-link to="/myaccount">
                    <div class="menu_item">
                        <span>个人信息</span>
                        <span class="iconfont icon-myIcon_right"></span>
                    </div>
                </router-link>
                <router-link to="/changePass">
                    <div class="menu_item">
                        <span>修改密码</span>
                        <span class="iconfont icon-myIcon_right"></span>
                    </div>
                </router-link>
                <router-link to="/feedback">
                    <div class="menu_item">
                        <span>反馈中心</span>
                        <span class="iconfont icon-myIcon_right"></span>
                    </div>
                </router-link>
                <div class="menu_item" @click="logout">
                    <span>退出登录</span>
                    <span class="iconfont icon-myIcon_right"></span>
                </div>
            </div>
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
            user_name:'',
            score:'',
            headimg:'',
        }
    },
    beforeMount() {
        var that = this;
        $.ajax({
            url:'http://192.168.31.119:8003/interface.php/V1/User/index',
            type:'POST',
            data:{
                token:localStorage.getItem('token')
            },
            success(res){
                console.log(res.data)
                that.user_name = res.data.user_name
                that.score = res.data.score
                if(res.data.headimg === ""){
                    that.headimg = require('../../static/assets/images/timg.jpg')
                }else{
                    that.headimg = res.data.headimg
                }
                if(res.data.nick_name === ""){
                     that.user_name = res.data.user_name
                }else{
                      that.user_name = res.data.nick_name
                }
            },
        })
    },
    computed: {
       
    },
    methods: {
        logout(){
            localStorage.clear();
            // this.$router.beforeEach();
            this.$router.push('/login');
        }
    },
}
</script>
<style lang="scss">
    @import '../../static/assets/iconfont/font.css';
    .app_my{
    background: #F3EFEB;
    height: 100%;
    .my_info{
        width: 100%;
        height: 160px;
        background-image: url("../../static/assets/images/my.png");
        background-color: #F9EEDA;
        background-repeat: no-repeat no-repeat;
        background-size: 100% 160px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        img{
            width: 75px;
            height: 75px;
            border-radius: 75px;
            border: 2px solid #8B623E;
        }
        .my_name{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            .name{
                font-weight: bold;
                font-size: 16px;
                color: #3C160F;
                margin-bottom: 3px;
            }
            .merit{
                color: #8B623E;
                font-size: 14px;
            }
        }
    }
    .my_menu{
        width: 100%;
        margin-top: 4px;
        height: calc(100% - 164px);
        box-sizing: border-box;
        padding: 20px 16px 12px 16px;
        background: #F9EEDA url("../../static/assets/images/texture.png") repeat repeat;  
        .menu_list{
            width: 100%;
            border: 1px solid #8B623E;
            position: relative;
            box-sizing: border-box;
            padding: 25px 16px;
            &::before,&::after,.helper::before,.helper::after{
                background: url("../../static/assets/images/border.png");
            }
            &::before{
                content: '';
                position: absolute;
                width: 20px;
                height: 20px;
                left: 0;
                top: 0;
                background-size: 20px 20px; 
            }
            &::after{
                content: '';
                position: absolute;
                width: 20px;
                height: 20px;
                right: 0;
                top: 0;
                transform: rotate(90deg);
                background-size: 20px 20px;
            }
            .helper{
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                z-index: 0;
                &::before{
                    content: '';
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    left: 0;
                    bottom: 0;
                    transform: rotate(-90deg);
                    background-size: 20px 20px;
                }
                &::after{
                    content: '';
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    right: 0;
                    bottom: 0;
                    transform: rotate(180deg);
                    background-size: 20px 20px;
                }
            }
            .menu_item{
                display: flex;
                position: relative;
                justify-content: space-between;
                align-items: center;
                color: #8B623E;
                font-size: 16px;
                box-sizing: border-box;
                padding: 14px 0;
                border-bottom: 1px solid rgba(139, 98, 62, .6);
                z-index: 2;
                .iconfont{
                    color: #A41522;
                }
               
            }
        }
    }
}
</style>
