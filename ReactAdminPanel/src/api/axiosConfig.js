import axios from "axios";

export const getToken=()=>{
    return localStorage.getItem("access_token")
}


export default axios.create({
        baseURL:'http://localhost:8080/admin',
        method: 'GET',
        headers:{
            'Authorization':'Bearer '+getToken()
        }
        //headers: {"ngrok-skip-browser-warning": "true"}
    });


export const userLogin=(authRequest)=>{
    return axios({
        'method':'POST',
        'url':`${process.env.hostUrl||'http://localhost:8080'}/auth/login`,
        'data':authRequest
    })
}

// export const fetchUserData=(authRequest)=>{
//     return axios({
//         method:'GET',
//         url:`${process.env.hostUrl||'http://localhost:8080'}/api/v1/auth/userinfo`,
//         headers:{
//             'Authorization':'Bearer '+getToken()
//         }
//     })
// }