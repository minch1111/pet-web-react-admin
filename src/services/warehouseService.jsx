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
    },
    getDetailBrandToEdit(slug){
        return fetch(`${api}/brand/edit/${slug}`).then(res=>res.json())
    },
    editBrand(form,id){
        let token = JSON.parse(localStorage.getItem('token'))
        return fetch(`${api}/brand/update/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                // 'Authorization': `Bearer ${token}`
            },
            body : JSON.stringify(form)
        }).then(res=>res.json())
    },
    removeBrand(id){
        let token = JSON.parse(localStorage.getItem('token'))
        return fetch(`${api}/brand/delete/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                // 'Authorization': `Bearer ${token}`
            }
        }).then(res=>res.json())
    },
    getSubCategoryBySlugCategory(slug){
        return fetch(`${api}/category/${slug}`).then(res=>res.json())
    },
    getSubCategoryByIdCate(id){
        return fetch(`${api}/category/subcategory/${id}`).then(res=>res.json())
    },
    getBrandByIdSub(id){
        return fetch(`${api}/subcategory/brand/${id}`).then(res=>res.json())
    },
    getAllSubCategory(){
        return fetch(`${api}/subcategory`).then(res=>res.json())
    },
    addNewCategory(form){
        let token = JSON.parse(localStorage.getItem('token'))
        return fetch(`${api}/category/store`,
        {
            method:'POST',
            headers:{
                "Content-Type":'application/json',
                // 'Authorization':`Bearer ${token}`
            },
            body: JSON.stringify(form)
        }
        ).then(res=>res.json())
    },
    editCategory(form,id){
        let token = JSON.parse(localStorage.getItem('token'))
        return fetch(`${api}/category/update/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                // 'Authorization': `Bearer ${token}`
            },
            body : JSON.stringify(form)
        }).then(res=>res.json())
    },
    getDetailCategoryToEdit(slug){
        return fetch(`${api}/category/edit/${slug}`).then(res=>res.json())
    },
    removeCategory(id){
        let token = JSON.parse(localStorage.getItem('token'))
        return fetch(`${api}/category/delete/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                // 'Authorization': `Bearer ${token}`
            }
        }).then(res=>res.json())
    },
    addSubCategory(form){
        return fetch(`${api}/subcategory/store`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(form)
        }).then(res=>res.json())
    },
    getAllProducts(){
        return fetch(`${api}/products`).then(res=>res.json())
    },
    addNewProduct(form){
        return fetch(`${api}/products/store`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(form)
        }).then(res=>res.json())
    },
    getProductDetailBySlug(slug){
        return fetch(`${api}/products/${slug}`).then(res=>res.json())
    },
    updateProduct(form,slug){
        return fetch(`${api}/products/update/${slug}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(form)
        }).then(res=>res.json())
    },
    removeProduct(id){
        // let token = JSON.parse(localStorage.getItem('token'))
        return fetch(`${api}/products/delete/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                // 'Authorization': `Bearer ${token}`
            }
        }).then(res=>res.json())
    },
    

    

}

export default wareHouseService