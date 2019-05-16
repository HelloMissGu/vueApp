<template>
    <nav class="app_navbar">
        <div class="nav_item" v-for="item in navData" @click="selectNav(item.title)">
            <router-link :to="item.url" class="a">
                <div class="bar">
                    <img :src="isSelect === item.title ? item.image1 : item.image" class="img"></img>
                    <span :class="{red:changeColor == item.title}">{{item.title}}</span>
                </div>
            </router-link>
        </div>
    </nav>
</template>
<script>
import $ from 'jquery';
export default {
    name:'navbar',
    data(){
        return{
           isSelect : '首页',
           changeColor:'首页',
           navData:[
               {title:'首页',url:'/home',image:'../../static/assets/images/icon-temple.png',image1:'../../static/assets/images/icon-temple-active.png'},
               {title:'法讯',url:'/news',image:'../../static/assets/images/icon-woodfish.png',image1:'../../static/assets/images/icon-woodfish-active.png'},
               {title:'活动',url:'/donate',image:'../../static/assets/images/icon-woodfish.png',image1:'../../static/assets/images/icon-woodfish-active.png'},
               {title:'我的',url:'/my',image:'../../static/assets/images/icon-my.png',image1:'../../static/assets/images/icon-my-active.png'},
           ]
        }
    },
    methods: {
       selectNav(title){
           this.isSelect = title
           this.changeColor = title
       }
     
    },
    computed: {
    },
    mounted:function() {
    },
    updated() {
    },
}
</script>
<style lang="scss">
@import '../../static/sass/navbar.scss';
@import '../assets/base.css';
.a{
    text-decoration: none;
    color: #8b623e;
}
.red{
    color: #A41522;
}
</style>
