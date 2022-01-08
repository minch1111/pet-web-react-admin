import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import useForm from '../../../hooks/useForm'
import wareHouseService from '../../../services/warehouseService'
import NotificationAlert from 'react-notification-alert'

export default function AddNewCategory() {

    let { form, error, handleSubmit, register } = useForm()
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
    const submit = async () => {
        let res = await wareHouseService.addNewCategory(form)
        if (res.success){
            notify.current.notificationAlert(options)
        }

    }
    return (
        <div className="col-lg-12">
            <NotificationAlert
                ref={notify}
            />
            <form onSubmit={handleSubmit(submit)} className="add-activity">
                <div className="title margin-bottom-20 flex flex-align-center">
                    <Link to="/warehouse-manage/category" className="margin-right-20"><i className="fas fa-chevron-left text-success" /></Link>
                    <p className="text-uppercase text-success">Thêm mới Danh Mục</p>
                </div>
                <div className="form-group">
                    <label>Tên Danh Mục</label>
                    <input type="text" {...register('name', { required: true })} className="form-control" placeholder="Nhập tên danh mục" />
                    {
                        error.name && <small className="text-danger"> {error.name} </small>
                    }
                </div>
                <button className="btn btn-success margin-top-20">Thêm</button>
            </form>
        </div>
    )
}
