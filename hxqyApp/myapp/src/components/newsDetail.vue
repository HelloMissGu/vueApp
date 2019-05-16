<template>
    <div class="app_newsDetail">
        <img class="title_img" :src='cover' alt="">
        <div class="newsDetail_content" >
            <span class="title">{{title}}</span>
            <div class="newsDetail_html">
                <div class="content" v-html="content">{{content}}</div>
            </div>
        </div>
        <musicControl></musicControl>
    </div>
</template>
<script>
import $ from 'jquery';
import musicControl from './musicControl.vue';
export default {
    name:'newsDetail',
    components:{musicControl},
    data() {
        return {
            id:this.$route.query.id,
            cover:'',
            title:'',
            content:''
        }
    },
    beforeMount() {
        var newsId = parseInt(this.id)
        var that = this;
        $.ajax({
            url:'http://192.168.31.119:8003/interface.php/V1/News/detail',
            type:'POST',
            data:{
                token:localStorage.getItem('token'),
                id:newsId
            },
            success(res){ 
                // console.log(res.data)
                that.cover = res.data.cover
                that.title = res.data.title
                that.content =  res.data.content 
            }
        })
        
    
    },
    methods: {
        
    },
}
</script>
<style lang="scss">
  @import '../../static/assets/iconfont/font.css';
  .app_newsDetail{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  position: relative;
  z-index: 99;
  background: #F9EEDA url("../../static/assets/images/texture.png") repeat repeat;
    span{
        display: block;
    }
    .title_img{
        width: 100%;
        height: 160px;
    }
    .newsDetail_content{
        box-sizing: border-box;
        // padding: 0 16px 32px 16px;
        .title{
            color: #3C160F;
            font-size: 18px;
            font-weight: bold;
            margin-top: 16px;
            margin-bottom:20px;
        }
        .newsDetail_html{
            width: 100%;
            height: 100%;
            color: #382F30;
            .content{
                width: 100%;
                height: 100%;
                img{
                    width: 100%;
                }
            }
        }
    }
}

</style>
