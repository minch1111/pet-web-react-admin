import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import wareHouseService from '../../../services/warehouseService'

export default function CategoryItem(props) {
    const [subCategory, setSubCategory] = useState()
    const [showSubCate, setShowSubCate] = useState(false)
    useEffect(async () => {
        let res = await wareHouseService.getSubCategoryBySlugCategory(props.data.slug)
        if (res?.success) setSubCategory(res.subCategory)
    }, [])
    // console.log(`subCategory`, subCategory)
    const del = async () => {
        let res = await wareHouseService.removeCategory(props.data._id)
        if (res.success) {props.del() }
        else{ alert(res.message) }
    }
    const show = () => {
        setShowSubCate(!showSubCate)
    }

    return (
        <div className="col-lg-12">
            <div className="category margin-bottom-10 pad-10">
                <div to="#" className="category_action flex w-100">
                    <div className="category_name pad-10 flex flex-align-center flex-grow-2">
                        <div className="brand_name font-weight-bold">
                            <p>{props.data.name} </p>
                        </div>
                    </div>
                    <div className="product_action flex justify-end-center flex-grow-1">
                        <div className="product_action-add-subcategory pad-10">
                            Thêm Danh Mục Con
                            <Link className="btn-circle btn-warning " to={`/warehouse-manage/add-subcategory/${props.data.slug}`} ><i class="fas fa-plus-square"></i></Link>
                        </div>
                        <div className="product_action-edit pad-10">
                            <Link className="btn-circle btn-warning " to={`/warehouse-manage/category/edit/${props.data.slug}`} ><i className="far fa-edit font-size-20" /></Link>
                        </div>
                        <div className="product_action-remove pad-10">
                            <Link className="btn-circle btn-danger" to="#" onClick={(ev)=>{ev.preventDefault();del()}}>
                                <i className="far fa-trash-alt font-size-20" />
                            </Link>
                        </div>
                        <div className="product_action-edit pad-10">
                            <Link className="btn-circle btn-primary " to="#" onClick={show} >
                                {
                                    showSubCate === true ? (<i class="fas fa-eye-slash font-size-20"></i>) :
                                        (<i className="fas fa-eye font-size-20"></i>)
                                }
                            </Link>
                        </div>
                    </div>
                </div>
                {
                    showSubCate === true ? (<div className="row pad-20 ">
                        {
                            subCategory?.map((o, i) => (
                                <div className="col-lg-12" key={i}>
                                    <div className="title-subCategory pad-10">
                                        <p className="font-weight-regular">{o.name}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>) : null
                }
            </div>

        </div>
    )
}
