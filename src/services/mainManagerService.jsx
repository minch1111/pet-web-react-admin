import api from "../config/api"

const mainManageService = {
    getAllStaff() {
        return fetch(`${api}/account/staff`).then(res => res.json())
    },
    updatePermissionStaff(id, form) {
        return fetch(`${api}/account/staff/update/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            }
        ).then(res => res.json())
    },
    addNewStaff(form) {
        return fetch(`${api}/account/staff/store`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(res => res.json())
    },
    removeStaff(id) {
        return fetch(`${api}/account/staff/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    getAllPermissions() {
        return fetch(`${api}/permission`).then(res => res.json())
    },
    getAllVouchers() {
        return fetch(`${api}/voucher`).then(res => res.json())
    },
    addNewVoucher(form) {
        return fetch(`${api}/voucher/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(res => res.json())
    },
    updateVoucher(id, form) {
        return fetch(`${api}/voucher/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(res => res.json())
    },
    addNews(form) {
        return fetch(`${api}/media/news/store`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(res => res.json())
    },
    getListNews() {
        return fetch(`${api}/media/news`).then(res => res.json())
    },
    updateNewsItem(slug, form) {
        return fetch(`${api}/media/news/update/${slug}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(res => res.json())
    },
    removeNewsItem(slug) {
        return fetch(`${api}/media/news/delete/${slug}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    },
    getListOrder() {
        return fetch(`${api}/order/staff`).then(res => res.json())
    },
    confirmOrder(staff, idOrder) {
        return fetch(`${api}/order/staff/confirm/${idOrder}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(staff)
        }).then(res => res.json())
    },
    addNewReport(form){
        return fetch(`${api}/order/staff/statistical/store`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body : JSON.stringify(form)
        }).then(res=>res.json())
    },
    getAllReport(){
        return fetch(`${api}/order/staff/statistical`).then(res=>res.json())
    },
    getReportByIdMonth(id){
        return fetch(`${api}/order/staff/statistical/${id}`).then(res=>res.json())
    }

}

export default mainManageService