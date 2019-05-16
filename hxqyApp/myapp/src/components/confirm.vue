<template>
    <div class="my-alert" >
        <div class="alert_box">
            <p class="alert_icon"><span class="iconfont icon-fobiaozhi"></span></p>
            <p class="alert_content"><span>确定要参与众筹吗？</span></p>
            <button class="alert_btn1" @click="cancelBtn">取消</button>
            <button class="alert_btn2" @click="sureBtn">确定</button>
        </div>
    </div>
</template>
<script>
export default {
     methods: {
        cancelBtn(){
            this.$emit('cancelBtn');
        },
        sureBtn(){
             this.$emit('sureBtn');
        }
    }
}
</script>
<style lang="scss">
@import '../../static/assets/iconfont/font.css';
.my-alert{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 300;
    background: rgba(56, 47, 48, .8);
    .alert_box{
        width: 295px;
        height: 36%;
        max-height: 200px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: #EBD7B7;
        border-radius: 6px;
        z-index: 999;
        .alert_icon{
            width: 50px;
            height: 50px;
            position: absolute;
            left: 50%;
            top: 0%;
            transform: translate(-50%, -50%);
            background: #EBD7B7;
            border-radius: 25px;
            box-shadow: 0 0 1px 0 rgba(0, 0, 0, .5);
            color: #8B623E;
            text-align: center;
            line-height: 50px;
            .iconfont{
                font-size: 32px;
            }
        }
        .alert_content{
            box-sizing: border-box;
            padding-bottom: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            width: 80%;
            height: 60%;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            overflow: auto;
            span{
                display: block;
                text-align: center;
                color: #3C160F;
                // font-size: 16px;
            }
        }
        .alert_btn1{
            width: 50%;
            height: 40px;
            line-height: 40px;
            background: #8B623E;
            color: #F3EFEB;
            font-size: 14px;
            border-radius: 0;
            border-bottom-left-radius: 6px;
            // border-bottom-right-radius: 6px;
            border: none;
            position: absolute;
            left: 0;
            bottom: 0;
            &::after{
                border-radius: 0;
                border-bottom-left-radius: 6px;
                // border-bottom-right-radius: 6px;
                border: none;
            }
        }
        .alert_btn2{
            width: 50%;
            height: 40px;
            line-height: 40px;
            background: #8B623E;
            color: #F3EFEB;
            font-size: 14px;
            border-radius: 0;
            // border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
            border: none;
            position: absolute;
            right: 0;
            bottom: 0;
            &::after{
                border-radius: 0;
                // border-bottom-left-radius: 6px;
                border-bottom-right-radius: 6px;
                border: none;
            }
        }
    }
}
</style>
