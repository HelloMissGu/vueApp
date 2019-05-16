<template>
    <div class="app_payConfirm">
         <div class="logo">
            <img src="../../static/assets/images/logo.png" alt="">
        </div>
        <button @click="toOrder">支付成功</button>
        <p>未完成支付？<span @click="toPay">重新支付</span></p>
    </div>
</template>
<script>
export default {
    methods: {
        toOrder(){
            this.$router.push('/payOrder')
        },
        toPay(){
            this.$router.push('/pay')
        }
    },
}
</script>
<style lang="scss">
    .app_payConfirm{
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
        p{
            color: #8B623E;
            font-size: 16px;
            text-align: center;
            margin-top: 50px;
            span{
                color: #A41522;
                font-size: 18px;
            }
        }
    }
</style>
