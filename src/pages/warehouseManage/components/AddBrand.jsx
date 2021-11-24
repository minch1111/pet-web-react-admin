import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import useForm from "../../../hooks/useForm"
import warehouseService from "../../../services/warehouseService"

export default function AddBrand() {
    const [info,setInfo] = useState()
    const [allSubCategory,setAllSubCategory]=useState()
    let {form,error,handleSubmit,register} = useForm()

    const submit =async ()=>{
        setInfo(form)
        let res = await warehouseService.addNewBrand(form)
        // if(res) alert("Đã Thêm Thành Công 😄")
        console.log(`res`, res)
    }
    useEffect(async () => {
        let res = await warehouseService.getAllSubCategory();
        setAllSubCategory(res.subCategory)
    }, [])
    console.log(`info`, info)
    // console.log(`allSubCategory`, allSubCategory)
    return (
        <div className="col-lg-12">
            <form onSubmit={handleSubmit(submit)} className="add-activity">
                <div className="title margin-bottom-20 flex flex-align-center">
                    <Link to="/warehouse-manage/brand" className="margin-right-20"><i className="fas fa-chevron-left text-success" /></Link>
                    <p className="text-uppercase text-success">Thêm mới nhãn hiệu</p>
                </div>
                <div className="form-group">
                    <label>Chọn danh mục đi kèm</label>
                    <select class="form-select form-control" {...register('subCategory',{required:true})} >
                        <option selected ></option>
                        {
                            allSubCategory?.map((o,i)=>(
                                <option key={i} value={o.name}>{o.name}</option>
                            ))
                        }
                        {/* <option value="do-an-cho-cho">Đồ ăn cho chó</option>
                        <option value="do-an-cho-meo">Đồ ăn cho mèo</option>
                        <option value="3">Three</option> */}
                    </select>
                    {
                        error.subcategory&&<small className="text-danger"> {error.subcategory} </small>
                    }
                </div>
                <div className="form-group">
                    <label>Tên Nhãn Hiệu</label>
                    <input type="text" {...register('name',{required:true})}  className="form-control" placeholder="Nhập tên nhãn hiệu" />
                    {
                        error.name&&<small className="text-danger"> {error.name} </small>
                    }
                </div>
                <div className="form-group">
                    <label>Xuất Xứ</label>
                    <input type="text" {...register('origin',{required:true})} className="form-control" placeholder="Nhập xuất xứ" />
                    {
                        error.origin&&<small className="text-danger"> {error.origin} </small>
                    }
                </div>
                <button className="btn btn-success margin-top-20">Thêm</button>
            </form>
        </div>
    )
}
