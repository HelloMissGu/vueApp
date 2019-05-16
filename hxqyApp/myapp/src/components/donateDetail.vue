<template>
    <div class="app_donateDetail">
        <img class="banner" :src="img_url" alt="">
        <div class="detail_title">
            <span>{{title}}</span>
            <div>
                <div>
                    <span class="iconfont icon-13"></span>
                    <span>{{time}}</span>
                </div>
                <span>{{status}}</span>
            </div>
        </div>
        <div class="detail_info">
            <div class="helper"></div>
            <div class="info_done" v-if="surplus==0">
                <div class="done_title">
                    目标已达成
                </div>
                <div class="done_content">
                    <div class="done_progress">
                        <div class="front">
                            <span class="iconfont icon-fobiaozhi"></span>
                        </div>
                        <div class="back">
                            <span class="iconfont icon-fobiaozhi"></span>
                        </div>
                    </div>
                    <div class="done_amount">
                        <div class="done_amount_target">
                            <span>目标众筹</span>
                            <div><span class="done_target_item">{{number}}</span><span class="unit">份</span></div>
                        </div>
                        <div class="done_amount_have">
                            <span>已剩余</span>
                            <div>
                                <span  class="done_have_item" style="visibility:hidden;">0</span>
                                <span class="done_have_item">0</span>
                            </div>
                            <span class="unit">份</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="info_ing" v-else>
                <div class="ing_content">
                    <div class="ing_progress">
                        <div class="front" >
                            <span class="iconfont icon-fobiaozhi"></span>
                        </div>
                        <div class="back">
                            <span class="iconfont icon-fobiaozhi"></span>
                        </div>
                    </div>
                    <div class="ing_amount">
                        <div class="ing_amount_target">
                            <span>目标众筹</span>
                            <div><span class="ing_target_item">{{number}}</span></div>
                            <span class="unit">份</span>
                        </div>
                        <div class="ing_amount_have">
                            <span>已剩余</span>
                            <div>
                                <span class="ing_have_item" style="display:none;">0</span>
                                <span class="ing_have_item">{{surplus}}</span>
                            </div>
                            <span class="unit">份</span>
                        </div>
                    </div>
                </div>
                <div class="ing_form">
                    <span>我要众筹</span>
                    <input type="number" v-model="joinNum" bindinput="handleDonateInput" placeholder="请输入参与众筹份数" placeholder-style="color:rgba(139, 98, 62, .4)">
                    <span>份</span>
                </div>
                <div class="ing_form_tip">注：每份众筹价格￥{{price}}</div>
                <button class="donate_btn" @click="join">参与众筹</button>
            </div>
            <confirm v-if="showConfirm" @cancelBtn="closeBtn" @sureBtn="okBtn"></confirm>
            <alert v-if="showAlert" :message="alertMsg" @close-alert="closeAlert"></alert>
        </div>
        <div class="divider"></div>
        <div class="detail_intro">
            <div class="intro_tab">
                <div @click="changeType1" data-type="yq" ref="dataType1"  :class="introTab === 'yq' ? 'intro_tab_active' : ''">缘起</div>
                <div @click="changeType2" data-type="mx" ref="dataType2"  :class="introTab === 'mx' ? 'intro_tab_active' : ''">明细</div>
            </div>
            <div class="yq_container" v-if="introTab === 'yq'" v-html="content">
               {{content}}
            </div>
            <div class="mx_container" v-if="introTab === 'mx'">
                <div class="mx_amount">
                    <div class="helper"></div>
                    <div class="amount_content">
                        <div><span>{{count_num}}</span>次众筹</div>
                        <div><span>{{count_user}}</span>名众筹者</div>
                    </div>
                </div>
                <div class="user_list">
                    <div class="empty_user" v-if="count_user == 0">
                        <div class="iconfont icon-kong"></div>
                        <div>———— 暂无众筹者信息 ————</div>
                    </div>
                    <div class="user_item"  v-for="(more,key) in moreDetail" :key="key" v-else>
                        <img :src="more.headimg == '' ? require('../../static/assets/images/timg.jpg') : more.headimg" alt="">
                        <div class="user_detail">
                            <div class="user_detail_title">
                                <span class="user_name">{{more.nick_name}}</span>
                                <span class="user_donate">参与众筹了<span>{{more.price}}</span>元</span>
                            </div>
                            <div class="detail_sub">
                                <div>
                                    <span class="iconfont icon-xianglu"></span>
                                    <span>{{more.score}}功德值</span>
                                </div>
                                <span class="user_donate_time">{{more.time}}</span>
                            </div>
                        </div>
                    </div>
                    <span class="load_more" v-if="page < Math.ceil(count/10)" @click="loadMore(page)">点击加载更多</span>
                    <span class="load_more"  v-else>没有更多了</span>
                </div>
            </div>
        </div>
        <musicControl></musicControl>
    </div>
</template>
<script>
import $ from 'jquery';
import musicControl from './musicControl.vue';
import confirm from './confirm.vue'
import alert from './alert.vue'
export default {
     components: { 
            confirm,alert,musicControl
        },
    data() {
        return {
           introTab:'yq',
           show:false,
           id:this.$route.query.id,
           img_url:"",
           title:'',
           time:'',
           status:'',
           number:'',
           surplus:'',
           price:'',
           content:'',
           page:'',
           count:'',
           count_num:'',
           count_user:'',
           moreDetail:[],
           showConfirm:false,
           showAlert:false,
           alertMsg:'',
           joinNum:''
        }
    },
    beforeMount() {
        var donateId = parseInt(this.id)
        var that = this;
        $.ajax({
            url:'http://192.168.31.119:8003/interface.php/V1/Activity/detail',
            type:'POST',
            data:{
                token:localStorage.getItem('token'),
                id:donateId
            },
            success(res){ 
                console.log(res.data)
                that.img_url = res.data.img_url,
                that.title = res.data.title,
                that.time = res.data.time,
                that.status = res.data.status,
                that.number = res.data.number,
                that.surplus = res.data.surplus,
                that.price = res.data.price,
                that.content = res.data.content
            }
        })
    },
    methods: {
        changeType1(e,type){
            this.introTab = this.$refs.dataType1.dataset.type;
        },
        changeType2(e,type){
            this.introTab = this.$refs.dataType2.dataset.type;
            var donateId = parseInt(this.id)
            var that = this;
            $.ajax({
                url:'http://192.168.31.119:8003/interface.php/V1/Activity/moreDetail',
                type:'POST',
                data:{
                    token:localStorage.getItem('token'),
                    id:donateId,
                    pageSize:1
                },
                success(res){ 
                    console.log(res)
                    that.count = res.data.count
                    that.page = res.data.page
                    that.count_num = res.data.count_num
                    that.count_user = res.data.count_user
                    that.moreDetail.push.apply(that.moreDetail,res.data.data)
                    
                }
            })
        },
        loadMore(page){
            var donateId = parseInt(this.id)
            var that = this;
            var page = Number(page) + Number(1)
            $.ajax({
                url:'http://192.168.31.119:8003/interface.php/V1/Activity/moreDetail',
                type:'POST',
                data:{
                    token:localStorage.getItem('token'),
                    id:donateId,
                    pageSize:page
                },
                success(res){ 
                    console.log(res)
                    that.count = res.data.count
                    that.page = res.data.page
                    that.count_num = res.data.count_num
                    that.count_user = res.data.count_user
                    that.moreDetail.push.apply(that.moreDetail,res.data.data)
                }
            })
        },
        join(){
            if(!this.joinNum){
                this.showAlert = true
                this.alertMsg = '请输入参与众筹份数'
            }else{
                this.showConfirm = true
            }

           
        },
        closeBtn(){
            this.showConfirm = false;
        },
        okBtn(){
            var donateId = parseInt(this.id);
            var join_num = this.joinNum;
            var that = this;
            $.ajax({
                url:'http://192.168.31.119:8003/interface.php/V1/PayOrder/createOrder',
                type:'POST',
                data:{
                    token:localStorage.getItem('token'),
                    activity_id:donateId,
                    pay_number:join_num
                },
                success(res){
                    console.log(res.data)
                    console.log(res.success)
                    if(res.success == 200){
                        that.showConfirm = false;
                        that.$router.push({
                            path:'pay',
                            query:{
                                pay_url:res.data.mweb_url,
                                total:res.data.price
                            }
                        })
                    }
                     if(res.success == 300){
                        that.showConfirm = false;
                        that.showAlert = true;
                        that.alertMsg = '您输入的份数已超过最大值，请刷新后再提交！'
                    }
                    // that.user_name = res.data.user_name
                    // that.score = res.data.score
                    // if(res.data.headimg === ""){
                    //     that.headimg = require('../../static/assets/images/timg.jpg')
                    // }else{
                    //     that.headimg = res.data.headimg
                    // }
                    // if(res.data.nick_name === ""){
                    //     that.user_name = res.data.user_name
                    // }else{
                    //     that.user_name = res.data.nick_name
                    // }
                },
            })

            
        },
        closeAlert(){
            this.showAlert = false;
        }
    },
}
</script>
<style lang="scss">
    @import '../../static/assets/iconfont/font.css';
    .app_donateDetail{
    width: 100%;
    height: 100%;
    box-sizing:content-box;
    overflow: auto;
    z-index: 101;
    position: relative;
    background: #F9EEDA url("../../static/assets/images/texture.png") repeat repeat;
    img{
        width: 100%;
        height: 160px;
        .banner{
            width: 100%;
            height: 100%;
        }
    }
    .detail_title{
        width: calc(100% - 32px);
        margin: 18px auto 0 auto;
        display: flex;
        flex-direction: column;
        >span{
            font-weight: bold;
            font-size: 16px;
            color: #3C160F;
            text-align: center;
            margin-bottom: 14px;
        }
        >div{
            display: flex;
            justify-content: space-between;
            margin-top: 6px;
            >div{
                color: #8B623E;
                font-size: 13px;
                display: flex;
                align-items: center; 
                .iconfont{
                    margin-right: 6px;
                }
            }
            >span{
                color: #A41522;
                font-size: 13px;
                font-weight: bold;
            }
            
        }
    }
    .detail_info::before, .detail_info::after,
    .mx_amount::before, .mx_amount::after,
    .helper::before, .helper::after {
        background: url("../../static/assets/images/border.png") repeat repeat;
        width: 20px;
        height: 20px;
        background-size: 20px 20px;
        position: absolute;
        content: '';
    }
    .detail_info,.mx_amount{
        width: calc(100% - 32px);
        margin: 16px auto;
        box-sizing: border-box;
        padding: 16px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        border: 1px solid #8B623E;
        &::before{
            left: 0;
            top: 0;
        }
        &::after{
            right: 0;
            top: 0;
            transform: rotate(90deg);
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
        .done_title {
            width: calc(100% - 32px);
            margin: 0 auto;
            border-bottom: 1px solid #8B623E;
            color: #8B623E;
            font-weight: bold;
            font-size: 18px;
            text-align: center;
            padding-bottom: 3px;
        }
        .info_ing,.info_done{
            display: flex;
            flex-direction: column;
            align-items: center;
            .ing_content,.done_content{
                width: calc(100% - 32px);
                margin: 16px auto 0 auto;
                display: flex;
                justify-content: space-between;
                .ing_content{
                    margin-top: 0;
                    padding-bottom: 18px;
                    border-bottom: 1px solid rgba(139, 98, 62, .6);
                } 
               .ing_progress,.done_progress{
                    flex: 0 0 50px;
                    position: relative;
                    width: 50px;
                    height: 50px;
                    border-radius: 25px;
                    box-shadow: 0 0 2px 0 rgba(0, 0, 0, .5);
                    .front,.back{
                        width: 50px;
                        height: 50px;
                        border-radius: 25px;
                        background: #8B623E;
                        line-height: 50px;
                        text-align: center;
                        position: absolute;
                        z-index: 1;
                        left: 0;
                        top: 0;
                    }
                    .front{
                        background: #fff;
                        position: absolute;
                        z-index: 2;
                        left: 0;
                        top: 0; 
                        .iconfont{
                            color: #8B623E;
                            font-size: 36px;
                        }
                    }
                    .back .iconfont{
                        color: #fff;
                        font-size: 36px;
                    }
                }
                .ing_amount,.done_amount{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin-left: 36px;
                    flex: 1 1 auto; 
                    .ing_amount_target,.ing_amount_have,.done_amount_target,.done_amount_have{
                        display: flex;
                        justify-content: flex-start;
                        color: #8B623E;
                        font-size: 14px;
                        div{
                            flex: 1 0 auto;
                            display: flex;
                            justify-content: flex-end;
                        }
                        >span{
                            flex: 0 0 70px;
                        }
                        .unit{
                            margin-left: 6px;
                            flex: 0 1 70px;
                        }
                        .ing_target_item,.done_target_item{
                            color: #fff;
                            font-weight: bold;
                            background: #8B623E;
                            border-radius: 6px;
                            display: inline-block;
                            line-height: 20px;
                            text-align: center;
                            margin-right: 4px;
                            padding: 2px;
                        }
                        .ing_have_item,.done_have_item{
                            color: #fff;
                            font-weight: bold;
                            background: #A41522;
                            border-radius: 6px;
                            display: inline-block;
                            line-height: 20px;
                            text-align: center;
                            margin-right: 4px;
                            padding: 2px;
                        }
                    }
                }
            }
            .ing_form,.ing_form_tip{
                width: calc(100% - 32px);
                margin: 16px auto 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #3C160F;
                font-size: 15px;
                input{
                    border: none;
                    outline-style: none;
                    background-color: #e8dabd;
                    text-overflow:clip;
                    overflow:hidden;
                    white-space:nowrap;

                }
            }
            .ing_form_tip{
                margin-top: 4px;
                color: #A41522;
                font-size: 13px;
            }
            .donate_btn{
                display: block;
                margin-top: 32px;
                margin-bottom: 16px;
                color: #F3EFEB;
                font-size: 18px;
                width: calc(100% - 32px);
                height: 40px;
                line-height: 40px;
                background: #A41522;
                border: none;
                border-radius: 10px;
                &::after{
                    color: #F3EFEB;
                    border: none;
                }
            }
        }
    }
    .divider{
        width: 100%;
        height: 6px;
        background: #F3EFEB;
    }
    .detail_intro{
        width: calc(100% - 32px);
        // width: 100%;
        margin: 16px auto;
        padding-bottom: 60px;
        .intro_tab{
            width: 200px;
            height: 30px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            font-size: 16px;
            color: #A41522;
            border: 1px solid #A41522;
            line-height: 32px;
            margin-bottom: 32px;
            >div{
                width: 50%;
                text-align: center;
            }
            .intro_tab_active{
                background: #A41522;
                color: #F3EFEB;
                font-weight: bold;
            }
        }
        .yq_container{
            color: #382F30;
        }
        .mx_container{
            .mx_amount{
                .amount_content{
                     display: flex;
                     justify-content: space-around;
                     align-items: center;
                     div{
                         color: #8B623E;
                         font-size: 16px;
                         span{
                             color: #A41522;
                             font-weight: bold;
                             margin-right: 6px;
                         }
                     }
                }
            }
            .user_list{
                // width: calc(100% - 32px);
                .empty_user{
                    text-align: center;
                    color: #382F30;
                    font-size: 14px;
                    margin: 48px auto 12px auto;
                    .iconfont{
                        font-size: 32px;
                        margin-bottom: 8px;
                    }
                }
                .user_item{
                    display: flex;
                    justify-content: space-between;
                    padding: 12px 0;
                    border-bottom: 1px solid rgba(139, 98, 62, .6);
                    &:nth-last-child(1){
                        border: none;
                        margin-bottom: 32px;
                    }
                    img{
                        width: 50px;
                        height: 50px;
                        border-radius: 50px;
                        border: 2px solid #8B623E;
                        margin-right: 16px;
                    }
                    .user_detail{
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        flex: 1 1 auto;
                        .user_detail_title{
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            .user_name{
                                font-weight: bold;
                                font-size: 14px;
                                color: #3C160F;
                            }
                            .user_donate{
                                color: #8B623E;
                                font-size: 14px;
                                margin-left: 16px;
                                font-weight: normal;
                                span{
                                    color: #A41522;
                                    font-weight: bold;
                                }
                            }
                        }
                        .detail_sub{
                            display: flex;
                            justify-content: space-between;
                            color: #8B623E;
                            font-size: 13px;
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
    }
}
</style>
