import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
        // musicStatus:localStorage.getItem('musicStatus') ? localStorage.getItem('musicStatus'):'',
        musicUrl:localStorage.getItem('music_url') ? localStorage.getItem('music_url'):''
    },
    mutations:{
        set_token(state,token) {
            state.token = token;
            localStorage.setItem('token',token.token);
        },
        del_token(state) {
            state.token = '';
            localStorage.removeItem('token');
        },
        // set_music(state,music) {
        //     state.musicStatus = music.musicStatus;
        //     localStorage.setItem('musicStatus',music.musicStatus);
        // },
        set_url(state,music) {
            state.musicStatus = music.musicUrl;
            localStorage.setItem('musicUrl',music.musicUrl);
        },
    }
})

export default store;