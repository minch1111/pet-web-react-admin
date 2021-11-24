import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import wareHouseService from '../../../services/warehouseService'

export default function Category() {
    const [category, setCategory] = useState()
    useEffect(async () => {
        let res = await wareHouseService.getCategory();
        setCategory(res.category)
    }, [])
    return (
        <>
            <div className="col-lg-12">
                <div className="activities flex justify-between margin-bottom-20">
                    <div className="addProduct">
                        <Link className="btn btn-success" to="/warehouse-manage/category/add">
                            Thêm mới danh mục
                        </Link>
                    </div>
                    <div>
                        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                            <div className="input-group">
                                <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-secondary" type="button">
                                        <i className="fas fa-search fa-sm" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {
                category?.map((o, i) => (
                    <div className="col-lg-12">
                        <Link to="#" className="category flex">
                            <div className="category_name pad-10 flex flex-align-center flex-grow-2">
                                <div className="brand_name font-weight-bold">
                                    <p>{o.name} </p>
                                </div>
                            </div>
                            <div className="product_action flex justify-end-center flex-grow-1">
                                <div className="product_action-add-subcategory pad-10">
                                    Thêm Danh Mục Con
                                    <Link className="btn-circle btn-warning " to={`/warehouse-manage/add-subcategory/${o.slug}`} ><i class="fas fa-plus-square"></i></Link>
                                </div>
                                <div className="product_action-edit pad-10">
                                    <Link className="btn-circle btn-warning " to="/warehouse-manage/edit" ><i className="far fa-edit font-size-20" /></Link>
                                </div>
                                <div className="product_action-remove pad-10">
                                    <Link className="btn-circle btn-danger" to="#">
                                        <i className="far fa-trash-alt font-size-20" />
                                    </Link>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
            }
        </>
    )
}
