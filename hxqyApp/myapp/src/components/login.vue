<template>
  <div class="app_login">
    <div class="login_box">
      <div class="login_name">登录</div>
    </div>
    <div class="my_login"  novalidate="true">
      <div class="login_list">
          <div class="helper"></div>
          <div class="login_item">
              <label for="phone">账号：</label>
              <input v-model="phone" type="text" name="phone"  placeholder="请输入手机号"></input>
          </div>
          <div class="login_item">
              <label for="pwd">密码：</label>            
              <input v-model="pwd" type="password" name="pwd" placeholder="请输入密码"></input>
          </div>
          <div class="login_item error" v-if="errors.length">
              <label for="error" v-for="error in errors">{{error}}</label>
          </div>
      </div>
      <button class="log_btn" type="submit" @click="login">登录</button>
      <button class="reg_btn" @click="toReg">注册</button>
      <alert  v-if="show" :message="alertMsg" @close-alert="closeAlert"></alert> 
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';
import $ from 'jquery';
import alert from './alert.vue';
export default {
  name: 'login',
   components: { 
           alert
    },
  data () {
    return {
        show:false,
        alertMsg:'',
        errors:[],
        phone:null,
        pwd:null,
        user_name:'',
        nick_name:'',
        email:'',
        token:'',
        heading:'',
        Score:'',
        music_url:'',
        musicStatus:''
    }
  },
  methods:{
     
    validMobile:function(mobile){
        var rm = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        return rm.test(mobile);
    },
    toReg(){
        localStorage.setItem('token',this.token);
       this.$router.push({
        path: '/register',
      })
    },
    login(){   
          this.errors=[];
          if(!this.phone){
              this.errors.push('请输入账号');
          }else if(!this.validMobile(this.phone)) {
              this.errors.push('请输入正确的手机号');
              return
          } 
          if (this.phone && !this.pwd && this.validMobile(this.phone)) {
              this.errors.push('请输入密码');
              return
          }
        var that = this;
        $.ajax({
            url:'http://192.168.31.119:8003/interface.php/V1/index/Login',
            type:'POST',
            data:{
                phone:this.phone,
                pwd:this.pwd
            },
            success:function(res){
                console.log(res)
                that.show = true;
                that.alertMsg = res.message
                if(that.alertMsg == "登录成功！"){
                    console.log(res.data.token)
                    console.log(res.data.music_url)
                    that.token = res.data.token;
                    that.music_url = res.data.music_url;
                    localStorage.setItem('token',that.token);
                    localStorage.setItem('musicUrl',that.music_url);
                    localStorage.setItem('musicStatus', true);
                    if(that.$store.state.token){
                        that.$router.push('/home');
                    }else{
                         that.$router.replace('/login');
                    }
                }else{
                     that.alertMsg = '登录失败！'
                }
            }
        })

    },
     closeAlert(){
        this.show = false;
    }
  }
}
</script>

<style lang="scss" >
.app_login{
    background: #F3EFEB;
    height: 100%;
    position: relative;
    z-index: 100;
    background: #F9EEDA url("../../static/assets/images/texture.png") repeat repeat;  
    .login_box{
        width: 100px;
        // height: 30px;
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        padding-top: 30px;
        box-sizing: border-box;
        .login_name{
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
    .my_login{
        width: 100%;
        // height: 100%;
        box-sizing: border-box;
        padding: 80px 16px 12px 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .login_list{
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
            .login_item{
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

