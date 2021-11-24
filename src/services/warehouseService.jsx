import { useContext } from "react"
import { Context } from "../App"
import api from "../config/api"

// const {user} = useContext(Context)

const wareHouseService={
    getBrand(){
        return fetch(`${api}/brand`).then(res=>res.json())
    },
    getBrandDetail(slug){
        return fetch(`${api}/brand/detail/${slug}`).then(res=>res.json())
    },
    getCategory(){
        return fetch(`${api}/category`).then(res=>res.json())
    },
    getSubCategoryWithCategory(slug){
        return fetch(`${api}/category/${slug}`).then(res=>res.json())
    },
    getAllSubCategory(){
        return fetch(`${api}/subcategory`).then(res=>res.json())
    },
    addNewBrand(form){
        let token = JSON.parse(localStorage.getItem('token'))
        return fetch(`${api}/brand/store`,
        {
            method:'POST',
            headers:{
                "Content-Type":'application/json',
                // 'Authorization':`Bearer ${token}`
            },
            body: JSON.stringify(form)
        }
        ).then(res=>res.json())
    }
    

    

}

export default wareHouseService