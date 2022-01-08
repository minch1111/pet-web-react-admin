import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useForm from '../../../hooks/useForm'
import NotificationAlert from 'react-notification-alert'
import wareHouseService from '../../../services/warehouseService'

export default function AddSubCategory() {
    const [category,setCategory] = useState()
    let {form,error,handleSubmit,register} = useForm()
    let notify = useRef()
    var options = {};
    options = {
        place: 'tr',
        message: (
            <div>
                Đã thêm thành công  😄😄😄
            </div>
        ),
        type: "success",
        icon: 'far fa-check-circle',
        autoDismiss: 7,
        closeButton: false
    }
    useEffect(async () => {
        let res = await wareHouseService.getCategory();
        setCategory(res.category)
    }, [])
    const submit = async()=>{
        let res = await wareHouseService.addSubCategory(form)
        if(res.success) {
            notify.current.notificationAlert(options)
        }
    }
    return (
        <div className="col-lg-12">
            <NotificationAlert ref={notify} />
            <form onSubmit={handleSubmit(submit)} className="add-activity">
                <div className="title margin-bottom-20 flex flex-align-center">
                    <Link to="/warehouse-manage/category" className="margin-right-20"><i className="fas fa-chevron-left text-success" /></Link>
                    <p className="text-uppercase text-success">Thêm mới Danh Mục Con</p>
                </div>
                <div className="form-group">
                    <label>Chọn danh mục Cha</label>
                    <select class="form-select form-control" {...register('category', { required: true })} >
                        <option selected ></option>
                        {
                            category?.map((o, i) => (
                                <option key={i} value={o.name}>{o.name}</option>
                            ))
                        }
                        {/* <option value="do-an-cho-cho">Đồ ăn cho chó</option>
                        <option value="do-an-cho-meo">Đồ ăn cho mèo</option>
                        <option value="3">Three</option> */}
                    </select>
                    {
                        error.category && <small className="text-danger"> {error.category} </small>
                    }
                </div>
                <div className="form-group">
                    <label>Tên Danh Mục Con</label>
                    <input type="text" {...register('name',{required:true})} id className="form-control" placeholder="Nhập tên danh mục con" />
                    {
                        error.name && <small className="text-danger"> {error.name} </small>
                    }
                </div>
                <button className="btn btn-success margin-top-20">Thêm</button>
            </form>
        </div>
    )
}
