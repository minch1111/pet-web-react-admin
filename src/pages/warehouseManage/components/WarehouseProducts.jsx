import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import img from "../../../assets/img/pate.png"
import wareHouseService from '../../../services/warehouseService'
import Pagination from '../../../components/Pagination'
import { convertQueryToObject } from "../../../utils";

export default function WarehouseProducts() {

    let [products, setProducts] = useState()
    let [page, setPage] = useState()
    let queryURL = convertQueryToObject()
    console.log(`queryURL`, queryURL)
    // console.log(`product`, products)

    useEffect(async () => {
        let res = await wareHouseService.getAllProducts();
        if (res?.product) {

            setProducts(res.product);
            setPage(res.pages)
        }
        if (res) console.log(`res`, res)
    }, [])

    const del = async () => {
        let res = await wareHouseService.getAllProducts();
        if (res?.product) setProducts(res.product)
    }
    // console.log(`products`, products)
    if (!products) return <div className="col-lg-12">Loading...</div>
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
            {
                products?.map((o, i) => (
                    <ProductItem
                        key={i}
                        data={o}
                        del={() => del()}
                    />
                ))
            }
            <div className="col-lg-12" >
                <div className="flex justify-center margin-top-20">
                    <Pagination totalPage={page} currentPage={parseInt(queryURL.page) || 1} />
                </div>
            </div>

        </>
    )
}

export const ProductItem = (props) => {


    const money = (a) => {
        return a.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    }

    const delProduct = async (ev) => {
        ev.preventDefault();
        let res = await wareHouseService.removeProduct(props.data._id);
        if (res.success) {
            alert("Đã xoá thành công")
            props.del()
        }
        else {
            alert(res.message.error.message)
        }
    }
    return (
        <>
            <div className="col-lg-6">
                <div className="product flex pad-10">
                    <div className="product_img">
                        <img src={props.data.imageRepresent[0].url} className="h-100" alt="" />
                    </div>
                    <div className="product_info  flex-grow-3 ">
                        <div className="brand_name font-weight-bold pad-0-10">
                            <p> {props.data.brand} </p>
                        </div>
                        <div className="detail">
                            <p className="name"> {props.data.name} </p>
                            <p className="money">Giá: <span> {money(props.data?.price)} </span></p>
                            {/* <p className="quantity">Số lượng tồn: <span className="font-size-15">50</span></p> */}
                        </div>
                    </div>
                    <div className="product_action flex justify-end-center flex-grow-1">
                        <div className="product_action-edit pad-10">
                            <Link className="btn-circle btn-warning " to={`/warehouse-manage/edit/${props.data.slug}`} ><i className="far fa-edit font-size-20" /></Link>
                        </div>
                        <div className="product_action-remove pad-10">
                            <Link onClick={delProduct} className="btn-circle btn-danger" to="#">
                                <i className="far fa-trash-alt font-size-20" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
