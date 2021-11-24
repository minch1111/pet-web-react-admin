import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import wareHouseService from '../../../services/warehouseService'
import useForm from '../../../hooks/useForm'


export default function EditBrand() {
    let { slug } = useParams()
    const [detail, setDetail] = useState()
    let { form, error, handleSubmit, register, setForm } = useForm(detail)
    useEffect(async () => {
        let res = await wareHouseService.getBrandDetail(slug);
        setDetail(res.brand)
        if (res) setForm(res.brand)
    }, [])
    const submit=()=>{
        setDetail(form)
    }
    console.log(`detail`, detail)
    
    // console.log(`object`, object)
    if (!detail) return <div className="col-lg-12 flex justify-center">Loading...</div>
    return (
        <div className="col-lg-12">
            <form onSubmit={handleSubmit(submit)} className="add-activity">
                <div className="title margin-bottom-20 flex flex-align-center">
                    <Link to="/warehouse-manage/brand" className="margin-right-20"><i className="fas fa-chevron-left text-warning" /></Link>
                    <p className="text-uppercase text-warning">Chỉnh sửa nhãn hiệu</p>
                </div>
                <div className="form-group">
                    <label>Mã Nhãn Hiệu</label>
                    <input type="text" {...register('_id')} className="form-control" disabled />
                </div>
                <div className="form-group">
                    <label>Tên Nhãn Hiệu</label>
                    <input type="text" {...register('name', { required: true })} id className="form-control" placeholder="Nhập tên nhãn hiệu" />
                </div>
                <button type="submit" className="btn btn-warning margin-top-20">Thêm</button>
            </form>
        </div>
    )
}
