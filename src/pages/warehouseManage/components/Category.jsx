import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import wareHouseService from '../../../services/warehouseService'
import CategoryItem from './CategoryItem'

export default function Category() {
    const [category, setCategory] = useState()
    useEffect(async () => {
        let res = await wareHouseService.getCategory();
        setCategory(res.category)
    }, [])
    const del = async()=>{
        let res = await wareHouseService.getCategory();
        if (res.category) {setCategory(res.category)} 
    }
    // console.log(`category`, category)
    if(!category) return <div className="col-lg-12 flex justify-center" style={{height:"100vh"}}>Loading...</div>
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
                  <CategoryItem 
                    key={i}
                    data={o}
                    del={()=>del()}
                  />
                ))
            }
        </>
    )
}
