<template>
    <div class="app_feedback">
        <div class='feedback_box'>
            <div class='feedback_box_container'>
                <div class="helper"></div>
                <textarea v-model="contentMsg"  @click='inputs' placeholder='想对我们说点什么呢...' name='textarea' maxlength='120'></textarea>
                <span class="currentWordNumber">{{currentWordNumber}} / {{max}}</span>
                <span class="hint">{{tips}}</span>
            </div>
            <button type='submit' @click="submit">提交</button>
            <div class='contact'><span>*</span>如有问题请咨询 : 181 1872 1730</div>
            <alert  v-if="show" :message="alertMsg" @close-alert="closeAlert"></alert> 
        </div>
        <musicControl></musicControl>
    </div>
</template>
<script>
import alert from './alert.vue';
import musicControl from './musicControl.vue';
import $ from 'jquery';
export default {
    name:'feedback',
    components: { 
        alert,musicControl
    },
    data() {
        return {
            show:false,
            max:120,
            alertMsg:'',
            tips:'',
            currentWordNumber:"",
            textContent:"111",
            contentMsg:''
        }
    },
    methods: {
        inputs:function(){
            var len = parseInt(this.contentMsg.length);
            console.log(len)
            if(len > this.max) return;
            this.currentWordNumber = len;
            if(len >= 120){
                this.tips="不能超过120字"
            }else{
                this.tips=""
            }
        },
        submit:function(e){
           this.show=true;
           var text = this.contentMsg.trim();
           console.log(text)
           var that = this;
           if(text == ''){
               that.alertMsg = '留言不能为空'
           }else{
            $.ajax({
                url:'http://192.168.31.119:8003/interface.php/V1/User/setMessage',
                type:'POST',
                data:{
                    token:localStorage.getItem('token'),
                    content:text
                },
                success(res){
                    console.log(res.success)
                    if(res.success="200"){
                        that.alertMsg = '留言成功！' 
                    }else{
                        text=''
                    }
                },
            })
           }
        },
        closeAlert(){
            this.show = false;
            if(this.alertMsg == '留言成功！'){
                this.$router.push('/my')
            }
        }
    },
}
</script>
<style lang="scss">
@import '../../static/assets/iconfont/font.css';
.app_feedback{
    width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  position: relative;
  z-index: 99;
  background: #F9EEDA url("../../static/assets/images/texture.png") repeat repeat;
  .feedback_box{
    width: 100%;
    height: 100%;
    padding: 20px 16px 12px 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    .feedback_box_container::before,.feedback_box_container::after,.helper::before,.helper::after{
        background: url("../../static/assets/images/border-red.png")
    }
    .feedback_box_container{
        width: 100%;
        height: 30%;
        border: 1px solid #A41522;
        position: relative;
        box-sizing: border-box;
        padding: 25px 16px;
        textarea{
            width: 100%;
            height: 100%;
            font-size: 15px;
            padding: 10px;
            box-sizing: border-box;
            position: relative;
            background-color: #e8dabd;
            // border-color: #e8dabd;
            outline-style: none;
            border: none;

        }
        .currentWordNumber{
            font-size: 10px;
            color: #8B623E;
            position: absolute;
            left: 270px;
            top: -3px;
            padding-top: 10px;
        }
        .hint{
            font-size: 10px;
            position: absolute;
            bottom: 7px;
            left: 25px;
            color: #A41522;
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
    }
    button{
        display: inline-block;
        margin-top: 10px;
        color: #F3EFEB;
        font-size: 15px;
        width: 100px;
        height: 30px;
        line-height: 25px;
        background: #A41522;
        outline-style: none;
        border: none;
        border-radius: 10px;
    }
    .contact{
        color: #8B623E;
        font-size: 12px;
        margin-top: 15px;
        span{
            color: #A41522;
            font-size: 15px;
            padding-right: 3px;
            vertical-align: middle;
        }
    }
  }
}
</style>
