import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import wareHouseService from '../../../services/warehouseService'
import useForm from '../../../hooks/useForm'
import NotificationAlert from 'react-notification-alert'

export default function EditBrand() {
    let { slug } = useParams()
    const [detail, setDetail] = useState()
    const [allSubCategory,setAllSubCategory] = useState()
    let { form, error, handleSubmit, register, setForm } = useForm(detail)
    let notify = useRef()
    var options = {};
    options = {
        place: 'tr',
        message: (
            <div>
                Đã cập nhật thành công  😄😄😄
            </div>
        ),
        type: "success",
        icon: 'far fa-check-circle',
        autoDismiss: 7,
        closeButton: false
    }
    useEffect(async () => {
        let res = await wareHouseService.getDetailBrandToEdit(slug);
        let res1 = await wareHouseService.getAllSubCategory();
        setAllSubCategory(res1.subCategory)
        setDetail(res.brand)
        if (res.brand) setForm(res.brand)
    }, [])
    const submit = async () => {
        let res = await wareHouseService.editBrand(form,detail._id)
        if(res.success) { notify.current.notificationAlert(options) }
    }
    // console.log(`form`, form)
    // console.log(`object`, object)
    if (!detail) return <div className="col-lg-12 flex justify-center">Loading...</div>
    return (
        <div className="col-lg-12">
            <NotificationAlert
                ref={notify}
            />
            <form onSubmit={handleSubmit(submit)} className="add-activity">
                <div className="title margin-bottom-20 flex flex-align-center">
                    <Link to="/warehouse-manage/brand" className="margin-right-20"><i className="fas fa-chevron-left text-warning" /></Link>
                    <p className="text-uppercase text-warning">Chỉnh sửa nhãn hiệu</p>
                </div>
                <div className="form-group">
                    <label>Mã Nhãn Hiệu</label>
                    <input type="text" {...register(`_id`)} className="form-control" disabled />
                </div>
                <div className="form-group">
                    <label>Tên Nhãn Hiệu</label>
                    <input type="text" {...register('name', { required: true })} id className="form-control" placeholder="Nhập tên nhãn hiệu" />
                </div>
                <div className="form-group">
                    <label>Xuất Xứ</label>
                    <input type="text" {...register('origin', { required: true })} id className="form-control" placeholder="Nhập tên nhãn hiệu" />
                </div>
                <div className="form-group">
                    <label>Chọn danh mục đi kèm</label>
                    <select class="form-select form-control" {...register('subCategory', { required: true })} >
                        <option  ></option>
                        {
                            allSubCategory?.map((o, i) => (
                                <option key={i} value={o.name}>{o.name}</option>
                            ))
                        }
                        {/* <option value="do-an-cho-cho">Đồ ăn cho chó</option>
                        <option value="do-an-cho-meo">Đồ ăn cho mèo</option>
                        <option value="3">Three</option> */}
                    </select>
                    {
                        error.subCategory && <small className="text-danger"> {error.subCategory} </small>
                    }
                </div>
                <button type="submit" className="btn btn-warning margin-top-20">Chỉnh sửa</button>
            </form>
        </div>
    )
}
