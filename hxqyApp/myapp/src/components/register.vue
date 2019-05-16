<template>
  <div class="app_reg">
    <div class="reg_box">
      <div class="reg_name">注册</div>
    </div>
    <div class="my_reg"   novalidate="true">
      <div class="reg_list">
          <div class="helper"></div>
          <div class="reg_item">
              <label for="phone">账号：</label>
              <input v-model="phone" type="text" name="phone" placeholder="请输入手机号"></input>
          </div>
          <div class="reg_item">
              <label for="pwd">密码：</label>            
              <input  v-model="pwd" type="password" name="pwd" placeholder="请输入密码"></input>
          </div>
          <div class="reg_item error" v-if="errors.length">
              <label for="error" v-for="error in errors">{{error}}</label>
          </div>
      </div>
      <button class="reg_btn" type="submit" @click="register">注册</button>
       <alert  v-if="show" :message="alertMsg" @close-alert="closeAlert"></alert> 
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import alert from './alert.vue';
import { mapMutations } from 'vuex';
export default {
  name: 'register',
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
    }
  },
  methods: {
   
    validphone:function(phone){
        var rm = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        return rm.test(phone);
    },
    register(){
        this.errors=[];
        if(!this.phone){
            this.errors.push('请输入账号');
        }else if(!this.validphone(this.phone)) {
            this.errors.push('请输入正确的手机号');
            return
        } 
        if (this.phone && !this.pwd && this.validphone(this.phone)) {
            this.errors.push('请输入密码');
            return
        }
        var that = this;
        $.ajax({
            url:'http://192.168.31.119:8003/interface.php/V1/index/Register',
            type:'POST',
            data:{
                phone:this.phone,
                pwd:this.pwd
            },
            ...mapMutations(['set_token']),
            success:function(res){
                console.log(res)
                that.show = true;
                that.alertMsg = res.message
                if(res.message == "注册成功！"){
                    that.token=res.data.token;
                    that.music_url = res.data.music_url;
                    localStorage.setItem('token',that.token);
                    localStorage.setItem('musicUrl',that.music_url);
                    that.$router.push('/home');
                }else{
                     that.alertMsg = res.message
                }
            },
            error:function(res){
               that.alertMsg = res.message
            }
        })
    },
    closeAlert(){
        this.show = false;
    }
  },
}
</script>
<style lang="scss" >
.app_reg{
    background: #F3EFEB;
    height: 100%;
    position: relative;
    z-index: 100;
    background: #F9EEDA url("../../static/assets/images/texture.png") repeat repeat;  
    .reg_box{
        width: 100px;
        // height: 30px;
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        padding-top: 30px;
        box-sizing: border-box;
        .reg_name{
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
    .my_reg{
        width: 100%;
        // height: 100%;
        box-sizing: border-box;
        padding: 80px 16px 12px 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .reg_list{
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
            .reg_item{
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
        .reg_btn{
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
    }
}

</style>

