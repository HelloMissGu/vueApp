<template>
  <div class="app_account">
    <div class="account_box">
      <div class="account_name">个人信息</div>
    </div>
    <div class="my_account" novalidate="true">
      <div class="account_list">
          <div class="helper"></div>
          <div class="account_item">
              <label for="nick_name">昵称：</label>
              <input v-model="nick_name" type="text" name="nick_name"  placeholder="请输入昵称"></input>
          </div>
          <div class="account_item">
              <label for="email">邮箱：</label>            
              <input v-model="email" type="email" name="email" placeholder="请输入邮箱"></input>
          </div>
          <div class="account_item error" v-if="errors.length">
              <label for="error" v-for="error in errors">{{error}}</label>
          </div>
      </div>
      <button class="log_btn" type="submit" @click="account">提交</button>
      <alert  v-if="show" :message="alertMsg" @close-alert="closeAlert"></alert>
    </div>
    <musicControl></musicControl>
  </div>
</template>

<script>
import $ from 'jquery';
import alert from './alert.vue';
import musicControl from './musicControl.vue';
export default {
    name: 'account',
    components: { 
           alert,musicControl
    },
    data () {
        return {
            errors:[],
            nick_name:'',
            email:'',
            alertMsg:'',
            show:false,
            getName:''
        }
    },
  
    beforeCreate() {
        var that = this;
            $.ajax({
                url:'http://192.168.31.119:8003/interface.php/V1/User/getUserInfo',
                type:'POST',
                data:{
                    token:localStorage.getItem('token')
                },
                success:function(res){
                    console.log(res)
                    that.nick_name = res.data.nick_name;
                    that.email = res.data.email;
                },
            })
    },


    methods:{
        validEmail:function(email){
            var em =/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
            return em.test(email);
        },
       
        account(){
            var nameLen = this.nick_name.length
            // console.log(nameLen)
            this.errors=[];
            if(!this.nick_name){
                this.errors.push('请输入昵称');
                return;
            }else if(nameLen > 6){
                this.errors.push('昵称长度不能超过6个字符');
                return;
            }
            if(this.nick_name && !this.email && this.validEmail(this.email)) {
                this.errors.push('请输入邮箱');
                return;
            }else if(!this.validEmail(this.email)) {
                this.errors.push('请输入正确的邮箱');
                return;
            } 

            var that = this;
            $.ajax({
                url:'http://192.168.31.119:8003/interface.php/V1/User/setUserInfo',
                type:'POST',
                data:{
                    nick_name:that.nick_name,
                    email:that.email,
                    token:localStorage.getItem('token')
                },
                success:function(res){
                    console.log(res.message)
                    that.show = true;
                    that.alertMsg = '保存成功！'
                },
                error:function(res){
                   that.alertMsg = '保存失败！'
                }
            })
        },
        closeAlert(){
            this.show = false;
            this.$router.push('/my')
        }
    }

}
</script>

<style lang="scss">
@import '../../static/assets/iconfont/font.css';
.app_account{
    background: #F3EFEB;
    height: 100%;
    position: relative;
    z-index: 100;
    background: #F9EEDA url("../../static/assets/images/texture.png") repeat repeat;  
    .account_box{
        width: 100px;
        // height: 30px;
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        padding-top: 30px;
        box-sizing: border-box;
        .account_name{
            // color: #382F30;
            color: #A41522;
            font-size: 16px;
            font-weight: bold;
            position: relative;
            text-align: center;
            display: inline-block;
            margin: 0 auto 8px auto;
            &::before,&::after{
                background: url("../../static/assets/images/poem.png");
            }
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
                background-size: 55px 19px;
                transform: scale(-1, 1);
            }
        }
    }
    .my_account{
        width: 100%;
        // height: 100%;
        box-sizing: border-box;
        padding: 80px 16px 12px 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .account_list{
            width: 100%;
            border: 1px solid #8B623E;
            position: relative;
            // box-sizing: border-box;
            padding: 25px 5px;
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
            .account_item{
                display: flex;
                position: relative;
                align-items: center;
                color: #8B623E;
                box-sizing: border-box;
                padding: 10px 0;
                border-bottom: 1px solid rgba(139, 98, 62, .6);
                z-index: 2;
                input{
                    outline-style: none;
                    border: none;
                    background-color: #e9dbbe;
                }
            }
            .error{
                border: none;
                color: #A41522;
            }
        }
        .log_btn{
            display: block;
            margin-top: 60px;
            width: 80%;
            height: 30px;
            border-radius: 6px;
            background: #A41522;
            color: #F3EFEB;
            font-size: 16px;
            text-align: center;
            border: none;
        }
        .reg_btn{
            display: block;
            margin-top: 30px;
            width: 80%;
            height: 30px;
            border-radius: 6px;
            background: #e6d7b9;
            color: #A41522;
            border: 1px solid #A41522;
            font-size: 16px;
            text-align: center;
        }
    }
}
</style>

