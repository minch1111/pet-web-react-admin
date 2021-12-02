import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ReportDateItem from './ReportDateItem'

export default function ReportDetailMonth(props) {

    const [dateReport, setDateReport] = useState(props.location.querry?.data || [])
    

    

    // console.log(`props.location.querry?.data`, props.location.querry?.data)

    return (
        <>
            <div className="col-lg-12">
                <div className="activities flex justify-end-center margin-bottom-20">
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
                dateReport?.map((o, i) => (
                        <ReportDateItem 
                            key={i}
                            data={o}
                            productList={o.productSaled}
                        />
                ))
            }
            {/* <div className="col-lg-12">
                <div className="month_detail  pad-20">
                    <div className="month_detail-common flex flex-align-center justify-between">
                        <div className="common-title">
                            <p className="font-weight-bold">Ngày : <span></span></p>
                            <p className="font-weight-bold">Tổng số lượng bán được trong ngày : <span></span></p>
                        </div>
                        <div className="common-activities">
                            <Link className="btn-circle btn-primary product_action-edit margin-0-20 " to="#">
                                <i className="fas fa-eye font-size-20"></i>
                            </Link>
                            <Link to="#" className="btn-circle btn-danger product_action-remove margin-0-20">
                                <i className="far fa-trash-alt font-size-20" />
                            </Link>
                        </div>
                    </div>
                    <div className="month_detail-infomation">
                        <div className="info-product-saled">
                            <p>Mặt hàng đã bán : </p>
                            <p>Số lượng: </p>
                        </div>
                        <div className="info-money">
                            <p>Tổng tiền</p>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="col-lg-12">
                <div className="activities flex justify-end-center margin-bottom-20">
                    <div className="btn btn-success">Xuất PDF</div>
                </div>
            </div>
        </>
    )
}
