<template>
    <div class="app_apy">
        <div class="logo">
            <img src="../../static/assets/images/logo.png" alt="">
        </div>
        <p>总价：<span>￥{{total}} 元</span></p>
        <button type="submit" @click="toPay">立即购买</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            pay_url:this.$route.query.pay_url,
            total:this.$route.query.total
        }
    },
    methods: {
        toPay(){
            this.$router.push({
                path:this.pay_url
            })
        }
    },
}
</script>
<style lang='scss'>
    .app_apy{
        background: #F3EFEB;
        height: 100%;
        position: relative;
        z-index: 100;
        background: #F9EEDA url("../../static/assets/images/texture.png") repeat repeat;  
        display: flex;
        flex-direction: column;
        align-items: center;
        .logo{
            width: 150px;
            height: 250px;
            display: flex;
            flex-direction: column;
            margin: 0 auto;
            padding-top: 100px;
            box-sizing: border-box;
            img{
                width: 100%;
                height: 100%;
            }
        }
        p{
            color: #8B623E;
            font-size: 16px;
            text-align: center;
            margin-top: 50px;
            span{
                color: #A41522;
                font-size: 22px;
                font-weight: bold;
            }
        }
        button{
            display: block;
            margin-top: 40px;
            width: 80%;
            height: 40px;
            border-radius: 6px;
            background: #A41522;
            color: #F3EFEB;
            font-size: 16px;
            text-align: center;
            border: none;
        }
    }
</style>
