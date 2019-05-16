<template>
    <div class="my-musicControl">
        <button class="music_btn" @click="toggleMusic">
            <div class="delete_line" v-if="musicStatus === false"></div>
            <span class="iconfont icon-yinfu text"></span>
            <audio id="music" :src="music_url" preload="auto"></audio>
        </button>
        <button @click="signin" class="sign_btn"><span class="text">签</span></button>
    </div>
</template>
<script>
export default { 
    data() {
        return {
            musicStatus:false,
            music_url:""
        }
    },
    mounted() {
        this.music_url = localStorage.getItem('musicUrl');
        // document.addEventListener('touchstart',this.audioAutoPlay,false);
        // document.addEventListener('WeixinJSBridgeReady',this.audioAutoPlay,true);
        let oAudio = document.querySelector('#music');
        oAudio.onended = function(){
            oAudio.load();
            oAudio.play();
        } 
    },
    methods: {
        toggleMusic(){
        // let _this = this;
            var oAudio = document.getElementById('music');
            this.music_url = localStorage.getItem('musicUrl');
            //    console.log( localStorage.getItem('musicStatus'))
            if(!this.musicStatus){
                this.musicStatus = true;
                oAudio.play();
            }else{
                this.musicStatus = false
                oAudio.pause();
            }
        },
        // audioAutoPlay() {
        //     let audio = document.getElementById('music');
        //         this.musicStatus = true;
        //         audio.play();
        //     document.removeEventListener('touchstart',this.audioAutoPlay);
        // },

        signin(){
            this.$router.push('sign')
        }
    },
}
</script>
<style lang="scss">
@import '../../static/assets/iconfont/font.css';
@import '../../static/sass/musicControl.scss';
</style>
