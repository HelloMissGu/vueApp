<template>
    <div class="app_changePass">
    <div class="changePass_box">
      <div class="changePass_name">修改密码</div>
    </div>
    <div class="my_changePass" novalidate="true">
      <div class="changePass_list">
          <div class="helper"></div>
          <div class="changePass_item">
              <label for="newpass">新密码：</label>            
              <input v-model="newpass" type="password" name="newpass" placeholder="请输入新密码"></input>
          </div>
          <div class="changePass_item">
              <label for="repass">确认密码：</label>            
              <input v-model="repass" type="password" name="repass" placeholder="请确认密码"></input>
          </div>
          <div class="changePass_item error" v-if="errors.length">
              <label for="error" v-for="error in errors">{{error}}</label>
          </div>
      </div>
      <button class="log_btn" type="submit" @click="changePass">提交</button>
      <alert  v-if="show" :message="alertMsg" @close-alert="closeAlert"></alert> 
    </div>
    <musicControl></musicControl>
  </div>
</template>
<script>
import alert from './alert.vue';
import $ from 'jquery';
import musicControl from './musicControl.vue';
export default {
    name: 'changePass',
     components: { 
           alert,musicControl
    },
  data () {
        return {
            errors:[],
            oldpass:null,
            newpass:null,
            repass:null,
            show:false,
            alertMsg:''
        }
  },
  methods: {
      changePass:function(){
        this.errors=[];
        if(!this.newpass){
            this.errors.push('请输入新密码');
            return
        } 
        if (this.newpass != this.repass) {
            this.errors.push('两次密码不一致');
            return
        }
        var that = this;
        $.ajax({
            url:'http://192.168.31.119:8003/interface.php/V1/User/changePwd',
            type:'POST',
            data:{
                token:localStorage.getItem('token'),
                new_pwd:that.newpass,
            },
            success:function(res){
                console.log(res)
                that.show = true;
                that.alertMsg = '修改成功！'
            },
            error:function(res){
               that.alertMsg = res.message
            }
        })
      },
    closeAlert(){
        this.show = false;
        if(this.alertMsg = '修改成功！'){
            this.$router.push('/my')
        }
    }
  },
}
</script>
<style lang="scss">
@import '../../static/assets/iconfont/font.css';
.app_changePass{
    width: 100%;
    background: #F3EFEB;
    height: 100%;
    position: relative;
    z-index: 100;
    background: #F9EEDA url("../../static/assets/images/texture.png") repeat repeat;  
    .changePass_box{
        width: 100px;
        // height: 30px;
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        padding-top: 30px;
        box-sizing: border-box;
        .changePass_name{
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
    .my_changePass{
        width: 100%;
        // height: 100%;
        box-sizing: border-box;
        padding: 80px 36px 12px 36px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .changePass_list{
            width: 100%;
            border: 1px solid #8B623E;
            position: relative;
            // box-sizing: border-box;
            padding: 25px 15px;
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
            .changePass_item{
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


