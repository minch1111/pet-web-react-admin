import React from 'react'
import { Link } from 'react-router-dom'
import img from "../../../assets/img/pate.png"

export default function WarehouseProducts() {
    return (
        <>
            <div className="col-lg-12">
                <div className="activities flex justify-between margin-bottom-20">
                    <div className="addProduct">
                        <Link className="btn btn-success" to="/warehouse-manage/add">
                            Thêm mới sản phẩm
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
                    <div className="multi-search">
                        <div className="dropdown">
                            <button className="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">
                                Lọc tìm kiếm
                            </button>
                            <div className="dropdown-menu left--100" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="#">Theo giá</a>
                                <a className="dropdown-item" href="#"> Theo số lượng</a>
                                <a className="dropdown-item" href="#">Theo tên</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="product flex">
                    <div className="product_img pad-10">
                        <img src={img} className="h-100" alt="" />
                    </div>
                    <div className="product_info pad-10 flex-grow-2">
                        <div className="brand_name font-weight-bold">
                            <p>Nutrifood</p>
                        </div>
                        <div className="detail">
                            <p className="name">Đồ ăn cho chó</p>
                            <p className="money">Giá: <span>$2.57</span></p>
                            <p className="quantity">Số lượng tồn: <span className="font-size-15">50</span></p>
                        </div>
                    </div>
                    <div className="product_action pad-10 flex justify-end-center flex-grow-1">
                        <div className="product_action-edit pad-20">
                            <Link className="btn-circle btn-warning " to="/warehouse-manage/edit" ><i className="far fa-edit font-size-20" /></Link>
                        </div>
                        <div className="product_action-remove pad-20">
                            <Link className="btn-circle btn-danger" to="#">
                                <i className="far fa-trash-alt font-size-20" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
