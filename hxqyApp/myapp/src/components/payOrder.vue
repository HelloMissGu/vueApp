<template>
    <div class="app_myDonate">
        <div class="myDonate_bar">
            <div class="myDonate_name">我的订单</div>
        </div>
        <!-- <div class="empty_order">
            <span class="iconfont icon-kong"></span>
            <span>—— 暂无订单 ——</span>
        </div> -->
        <div class="order_item">
            <div class="helper"></div>
            <div class="order_item_content">
                <div class="status_bar">
                    <div class="data_activity">
                        <span class="iconfont icon-simiao"></span>
                        <span class="activity_name">测试寺庙</span>
                        <span class="iconfont icon-myIcon_right"></span>
                    </div>
                    <span class="activity_status">订单已完成</span>
                </div>
                <div class="goods_info">
                    <img src="../../static/assets/images/logo.png" alt="">
                    <div class="goods_order_info">
                        <div class="info1">
                            <span class="goods_name">测试寺庙 X 20 份</span>
                            <span class="goods_unit">2 元 / 份</span>
                        </div>
                        <div class="info2">合计：<span>￥40</span></div>
                    </div>
                </div>
                <div class="btns">
                    <button class="go_detail" @click="toDonateDetail">查看详情</button>
                </div>
            </div>
        </div>
        <musicControl></musicControl>
    </div>
</template>
<script>
import musicControl from './musicControl.vue';
export default {
    components: { 
        musicControl
    },
    methods: {
        toDonateDetail(){
            this.$router.push('/donateDetail')
        }
    },
}
</script>
<style lang="scss">
    @import '../../static/assets/iconfont/font.css';
    .app_myDonate{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow: auto;
        position: relative;
        z-index: 100;
        background: #F9EEDA url("../../static/assets/images/texture.png") repeat repeat;
        .myDonate_bar{
            width: 100px;
            height: 30px;
            display: flex;
            flex-direction: column;
            margin: 0 auto;
            margin-top: 16px;
            box-sizing: border-box;
            .myDonate_name{
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
        .empty_order{
            position: absolute;
            width: 100%;
            left: 50%;
            top: 40%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: #382F30;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .inconfont{
                font-size: 32px;
                margin-bottom: 16px;
            }
        }
        .order_item{
            width: calc(100% - 64rpx);
            position: relative;
            border: 1px solid #8B623E;
            padding: 14px;
            margin:  20px;
            box-sizing: border-box;
            &::before{
                left: 0;
                top: 0;
            }
            &::after{
                 right: 0;
                top: 0;
                transform: rotate(90deg);
            }
        }
        .order_item::before,.order_item::after,.helper::before,.helper::after{
            background: url("../../static/assets/images/border.png") repeat repeat;
            width: 20px;
            height: 20px;
            background-size: 20px 20px;
            position: absolute;
            content: '';
        }
        .helper{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: -1;
            &::before{
                left: 0;
                bottom: 0;
                transform: rotate(-90deg);
            }
            &::after{
                right: 0;
                bottom: 0;
                transform: rotate(180deg);
            }
        }
        .status_bar{
            width: 100%;
            display: flex;
            justify-content: space-between;
            color: #8B623E;
            font-size: 14px;
            span{
                 margin-right: 12px; 
            }
            .activity_status{
                color: #A41522;
            }
        }
        .goods_info{
            margin-top: 16px;
            display: flex;
            justify-content: flex-start;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(139, 98, 62, .6);
            img{
                 width: 50px;
                height: 50px;
                border: 1px solid #fff;
                border-radius: 6px;
                margin-right: 15px;
            }
            .goods_order_info{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                flex: 1 1 auto;
                .info1{
                    display: flex;
                    justify-content: space-between;
                    .goods_name{
                          color: #3C160F;
                        font-size: 14px;
                        font-weight: bold;
                    }
                    .goods_unit{
                        color: #8B623E;
                        font-size: 14px;
                    }
                }
                .info2{
                    display: flex;
                    justify-content: flex-end;
                    color: #8B623E;
                    font-size: 14px;
                    span{
                        color: #3C160F;
                        font-size: 16px;
                        font-weight: bold;
                    }
                }
            }
        }
        .btns{
            display: flex;
            justify-content: flex-end;
            margin-top: 10px;
            button{
                margin: 0;
                margin-left: 16px;
                color: #8B623E;
                font-size: 14px;
                width: 90px;
                height: 30px;
                line-height: 30px;
                border-radius: 6px;
                border: 1px solid #8B623E;
                background: none;
                &::after{
                    border-radius: 6px;
                }
            }
            .go_detail{
                color: #A41522;
                border-color: #A41522;
            }
        }
    }
</style>
