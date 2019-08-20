import axios from 'axios'
import service from './contactApi'

const BASE_URL = 'http://loaclhost:9000/api'
//api循环遍历输出不同的请求方法
let instance = axios.create({
    baseURL:BASE_URL,
    timeout:3000
})

const Http = {}//用于包裹请求方法的容器
//请求格式/参数的统一 
for(let key in service){
    let api = service[key]
    //async作用：避免进入回调地狱
    Http[key] = async function(
        params,//请求参数get：（参数放在params中）url ，put，post，patch，参数放在data中，请求体。delete默认使用params
        isFormData=false,//默认请求参数使用application/json数据格式
        config={} //配置参数
    ){
        let url = api.url;
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
        let reponse = {}; //请求返回值
        if(api.method === 'put' || api.method === 'post' || api.method.patch){
            try{
                reponse = await instance[api.method](api.url,newParams,config);
            }catch(err){
                reponse = err;
            }
        }else if(api.method === 'delete' || api.method === 'get'){
            config.params = newParams;
            try{
                reponse = await instance[api.method](api.url,newParams,config);
            }catch(err){
                reponse = err; 
            }
        }
        return reponse;//返回请求响应值
    }
}