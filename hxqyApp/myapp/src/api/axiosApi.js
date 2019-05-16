import axios from 'axios';
 
const instance = axios.create({
   headers: {
    'content-type': "application/json;charset=utf-8"
  }
});

export default{
    getBanner (data){
        return instance.post('/AppIndex/indexBanner',data[Authorization])
    }
}