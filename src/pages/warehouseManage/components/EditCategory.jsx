import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import useForm from '../../../hooks/useForm'
import wareHouseService from '../../../services/warehouseService'

export default function EditCategory() {
    let { form, error, handleSubmit, register, setForm } = useForm()
    const [category, setCategory] = useState()
    let { slug } = useParams()
    useEffect(async () => {
        let res = await wareHouseService.getDetailCategoryToEdit(slug)
        if (res.category) setForm(res.category)
        setCategory(res.category)
    }, [])
    console.log(`category`, category)
    const submit = async () => {
        let res = await wareHouseService.editCategory(form, category._id);
        if (res.success===true) alert("Đã Cập Nhật Thành Công 😄")
    }
    return (
        <div className="col-lg-12">
            <form onSubmit={handleSubmit(submit)} className="add-activity">
                <div className="title margin-bottom-20 flex flex-align-center">
                    <Link to="/warehouse-manage/category" className="margin-right-20"><i className="fas fa-chevron-left text-warning" /></Link>
                    <p className="text-uppercase text-warning">Chỉnh sửa danh mục</p>
                </div>

                <div className="form-group">
                    <label>Tên Nhãn Hiệu</label>
                    <input type="text" {...register('name', { required: true })} id className="form-control" placeholder="Nhập tên nhãn hiệu" />
                    {
                        error.name && <small className="text-danger" > {error.name} </small>
                    }
                </div>
                <button type="submit" className="btn btn-warning margin-top-20">Chỉnh sửa</button>
            </form>
        </div>
    )
}
