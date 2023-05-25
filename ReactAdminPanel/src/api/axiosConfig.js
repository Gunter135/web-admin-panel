import axios from "axios";

export const getToken=()=>{
    checkT().then((value) => {if(!value){localStorage.setItem("access_token",null)}})
    return localStorage.getItem("access_token")
}
const checkT = async () =>{
    const response = await axios.post("http://localhost:8080/auth/check_token",localStorage.getItem("access_token"))
    return response.data
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
export const userLogout=()=>{
    return axios({
        'method':'GET',
        'url':`${process.env.hostUrl||'http://localhost:8080'}/auth/logout`,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
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