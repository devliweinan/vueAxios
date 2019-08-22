import axios from 'axios'
import service from './contactApi'
import { Toast } from 'vant'

const BASE_URL = 'http://localhost:9000/api';
//创建axios的实例对象
let instance = axios.create({
    baseURL: BASE_URL,
    timeout:3000
})
const Http = {}//用于包裹请求方法的容器
//请求格式/参数的统一 
//api循环遍历输出不同的请求方法
for(let key in service){
    let api = service[key]
    //async作用：避免进入回调地狱
    Http[key] = async function(
        params,//请求参数get：（参数放在params中）url ，put，post，patch，参数放在data中，请求体。delete默认使用params
        isFormData=false,//默认请求参数使用application/json数据格式
        config={} //配置参数
    ){
        let url = api.url;
        console.log(url)
        let newParams = {}; //如果是用form-data格式的话，进行格式转换
        //判断是否为form-data格式的判断
        if(params&&isFormData){
            newParams = new FormData();
            for(let i in params){
                newParams.append(i,params[i]);
            }
        }else{
            newParams = params;
        }
        //不同请求方法的判断
        let response = {}; //请求返回值
        if(api.method === 'put' || api.method === 'post' || api.method.patch){
            try{
                response = await instance[api.method](url,newParams,config);
            }catch(err){
                response = err;
            }
        }else if(api.method === 'delete' || api.method === 'get'){
            config.params = newParams;
            try{
                response = await instance[api.method](url,newParams,config);
            }catch(err){
                response = err; 
            }
        }
        return response;//返回请求响应值
    }
}
//请求拦截器和响应拦截器的添加
instance.interceptors.request.use(config=>{
     //发起请求前
     Toast.loading({
         mask:false,
         duration:0,//一直存在,在响应拦截器中去掉
         forbidClick:true, //禁止点击
         message:'加载中...'
     });
},err=>{
    //请求错误
    Toast.clear();
    Toast('请求错误，请稍后重试')
})
//响应拦截器
instance.interceptors.response.use(res=>{
    Toast.clear();
    console.log("响应拦截")
    return res.data;
},err=>{
    Toast.clear();
    Toast('请求错误，请稍后重试')
})

export default Http