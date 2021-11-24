import api from "../config/api"

const authServices={
    login(user){
        return fetch(`${api}/auth/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        }).then(res => res.json())
    },
}

export default authServices