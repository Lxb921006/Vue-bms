import axios from 'axios'
import baseUrl from './baseUrl'
import { Message } from 'element-ui'


// 创建axios实例
const instance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
//   responseType: 'json',
});

instance.interceptors.request.use(config => {
    // 请求拦截逻辑写在这里

    return Promise.resolve(config)
}, error => {

    return Promise.reject(error)
});

instance.interceptors.response.use(resp => {
    // 响应拦截逻辑写在这里

    return Promise.resolve(resp)
}, err => {
    switch (err.response.status) {
        case 400:
            Message.error(err.response.data.message);
            break
        case 403:
            Message.error(err.response.data.message);
            break
        case 500:
            Message.error(err.response.Message);
            break
        case 502:
            Message.error(err.response.data.message+" 3秒后将跳转到登录页!");
            setTimeout(()=>{
                sessionStorage.clear();
                window.location.href = '/';
                ;},3000)
            break
    }
    return Promise.reject(err)
});


export const get = (url, params) => {
    return new Promise((resolve, reject) => {

        instance.get(url, {
            params
        }).then(resp => {
            
            resolve(resp);
        }).catch(error => {

            reject(error);
        })
    })
};
  
export const post = (url, data, method) => {
    return new Promise((resolve, reject) => {
        instance.post(url, data).then(resp => {
            method.call();
            Message.success(resp.data.message);
            resolve(resp);
        }).catch(error => {
            return reject(error);
        })
    })
};


export const loginPost = (url, data, other, method) => {
    return new Promise((resolve, reject) => {
        instance.post(url + "?user="+other, data).then(resp => {
            method.call();
            Message.success(resp.data.message);
            resolve(resp);
        }).catch(error => {
            return reject(error);
        })
    })
};
