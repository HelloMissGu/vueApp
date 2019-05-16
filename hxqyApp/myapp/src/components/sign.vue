<template>
    <div class="my-sign">
        <div class="sign_info">
            <div class="info_title">
                <div class="merit">今日签到可获得<span class="strong">{{sign_score}}</span>功德值</div>
                <router-link to="./my">
                    <span class="merit_btn">查看我的功德值<span class="iconfont icon-myIcon_right"></span></span>
                </router-link>
            </div>
            <div class="sign_days">
                <div class="days_item">
                    <div class="helper"></div>
                    <div class="days_title">累计签到</div>
                    <div class="days_count"><span>{{score_num}}</span>天</div>
                </div>
                <div class="days_item">
                    <div class="helper"></div>
                    <div class="days_title">累计连续签到</div>
                    <div class="days_count"><span>{{con_sign_num}}</span>天</div>
                </div>
            </div>
        </div>
        <div class="divider"></div>
        <div class="sign_poem">
            <div class="poem_title">《长老偈》
            </div>
            <div class="poem_author">萨曼若卡尼长老作
            </div>
            <div class="poem_content">
               <p>欲证得涅槃，必修八正道。</p> 
               <p>循道勤修持，亦可得禅悦。</p> 
               <p>圣者名声大，随者自不绝。</p> 
            </div>
            <button @click="tosign" class="sign_btn"><span class="iconfont icon-qiandao"></span> 立即签到</button>
        </div>
        <alert  v-if="show" :message="alertMsg" @close-alert="closeAlert"></alert>
        <musicControl></musicControl>
    </div>
</template>
<script>
import alert from './alert.vue';
import musicControl from './musicControl.vue';
import $ from 'jquery';
export default {
    components:{alert,musicControl},
    data() {
        return {
            show:false,
            alertMsg:'',
            sign_score:'',
            score_num:'',
            con_sign_num:'',
        }
    },
    beforeMount() {
    var that = this;
        $.ajax({
            url:'http://192.168.31.119:8003/interface.php/V1/AppIndex/sizeInfo',
            type:'POST',
            data:{
                token:localStorage.getItem('token')
            },
            success(res){
                // console.log(res.data)
                that.sign_score = res.data.sign_score
                that.score_num = res.data.score_num
                that.con_sign_num = res.data.con_sign_num
            },
        })
    },
    methods: {
        tosign(){
             this.show = true;
            
              var that = this;
            $.ajax({
                url:'http://192.168.31.119:8003/interface.php/V1/AppIndex/getSize',
                type:'POST',
                data:{
                    token:localStorage.getItem('token')
                },
                success(res){
                    // console.log(res.message)
                     that.alertMsg = res.message
                },
            })
        },
        closeAlert(){
            this.show =false;
        }
    },
}
</script>
<style lang="scss" scoped>
    @import '../../static/assets/iconfont/font.css';
    .my-sign{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    position: relative;
    z-index: 1001;
    background: #F9EEDA url("../../static/assets/images/texture.png") repeat repeat;
    .sign_info{
        margin-top: 18px;
        width: 100%;
        box-sizing: border-box;
        padding: 0 16px;
        .info_title{
            display: flex;
            height: 30px;
            justify-content: space-between;
            line-height: 30px;
            .merit{
                color: #8b623e;
                font-weight: bold;
                font-size: 14px;
                vertical-align: middle;
                .strong{
                    color: #A41522;
                    font-weight: bold;
                    font-size: 18px;
                }
            }
            .merit_btn{
                color: #A41522;
                font-size: 13px;
                .iconfont{
                    font-size: 13px;
                }
            }
        }
        .sign_days{
            margin-top: 32px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            .days_item{
                width: 130px;
                height: 65px;
                border: 1px solid #8B623E;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                position: relative;
                &::before,&::after,.helper::before,.helper::after{
                    background: url("../../static/assets/images/border.png") repeat repeat;
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
                .days_title{
                    color: #8B623E;
                    font-size: 14px;
                    font-weight: bold;
                    text-align: center;
                }
                .days_count{
                    color: #8B623E;
                    font-size: 13px;
                    text-align: center;
                    span{
                        color: #A41522;
                        font-size: 18px;
                        font-weight: bold;
                    }
                }
            }
            
        }
    }
    .divider{
        width: 100%;
        height: 4px;
        background-color: #F3EFEB;
    }
    .sign_poem{
        width: 100%;
        margin-top: 50px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 9px 16px 16px 16px;
        .poem_title{
            // color: #382F30;
            font-size: 16px;
            font-weight: bold;
            position: relative;
            text-align: center;
            display: inline-block;
            margin: 0 auto 8px auto;
            color: #A41522;
            white-space: nowrap;
            &::before{
                content: '';
                position: absolute;
                width: 55px;
                height: 19px;
                left: -60px;
                top: 0px;
                background-size: 55px 19px;
            }
            &::after{
                content: '';
                position: absolute;
                width: 55px;
                height: 19px;
                right: -60px;
                top: 0px;
                transform: scale(-1, 1);
                background-size: 55px 19px;
            }
            &::before,&::after{
                background: url("../../static/assets/images/poem.png");
            }
        }
        .poem_author{
            font-size: 14px;
            text-align: center;
            display: inline-block;
            margin: 12px auto 20px auto;
            position:relative;
            color: #A41522;
            white-space: nowrap;
        }
        .poem_content{
            text-align: center;
            display: inline-block;
            margin: 0px auto 12px auto;
            position:relative;
            color: #A41522;
            white-space: nowrap;
            p{
                padding: 8px;
                font-size: 16px;
                font-weight: 500;
            }
        }
        .poem_content_strong{
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            color: #A41522;
            white-space: nowrap;
            overflow: hidden;
        }
        .sign_btn{
            display: block;
            margin-top: 40px;
            width: 100%;
            height: 50px;
            border-radius: 6px;
            background: #A41522;
            color: #F3EFEB;
            font-size: 18px;
            text-align: center;
            border: none;
            &::after{
                color: #F3EFEB;
                border: none;
            }
            .iconfont{
                margin-right: 6px;
                font-size: 18px;
            }
        }
    }
}
</style>
