import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import img from "../../../assets/img/pate.png"
import wareHouseService from '../../../services/warehouseService'

export default function Brand() {
    let [brands, setBrands] = useState()
    useEffect(async () => {
        let res = await wareHouseService.getBrand();
        if (res) setBrands(res.brand)
    }, [])
    if (!brands) return <div className="col-lg-12 flex justify-center">Loading...</div>
    return (
        <>
            <div className="col-lg-12">
                <div className="activities flex justify-between margin-bottom-20">
                    <div className="addProduct">
                        <Link className="btn btn-warning" to="/warehouse-manage/brand/add">
                            Thêm mới nhãn hiệu
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
                brands?.map((o, i) => (
                    <div className="col-lg-3 margin-bottom-20" key={i}>
                        <div className="brand">
                            <div className="brand-cate">
                                <div className="product_action pad-10  flex justify-center flex-align-center">
                                    <div className="brand_name margin-0-20 font-weight-bold ">
                                        <p> {o?.name} </p>
                                    </div>
                                    <Link className="product_action-edit margin-0-20 text-warning" to={`/warehouse-manage/brand/edit/${o.slug}`}>
                                        <i className="far fa-edit font-size-20" />
                                    </Link>
                                    <div className="product_action-remove margin-0-20 text-danger">
                                        <i className="far fa-trash-alt font-size-20" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }

        </>
    )
}
