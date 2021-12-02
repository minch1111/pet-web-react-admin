import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ReportDateItem({data,productList}) {
    const [showDetail, setShowDetail] = useState(false)
    console.log(`productList`, productList)
    const show = () => {
        setShowDetail(!showDetail)
    }
    var total = 0;
     function a(){
        productList.forEach(e => {
            total=total+ e.price*e.num
        });
    }
    a()
    console.log(`total`, total)
    return (
        <div className="col-lg-12">
            <div className="month_detail  pad-20">
                <div className="month_detail-common flex flex-align-center justify-between">
                    <div className="common-title">
                        <p className="font-weight-bold">Ngày :  <span className="font-weight-regular"> {data.date} </span></p>
                        <p className="font-weight-bold">Tổng số lượng bán được trong ngày : <span className="font-weight-regular"></span></p>
                    </div>
                    <div className="common-activities">
                        <Link className="btn-circle btn-primary product_action-edit margin-0-20 " onClick={show} to="#">
                            {
                                showDetail === true ? (<i class="fas fa-eye-slash font-size-20"></i>) :
                                    (<i className="fas fa-eye font-size-20"></i>)
                            }
                        </Link>
                        <Link to="#" className="btn-circle btn-danger product_action-remove margin-0-20">
                            <i className="far fa-trash-alt font-size-20" />
                        </Link>
                    </div>
                </div>
                {
                    showDetail === true ? (
                        <div className="month_detail-infomation">
                            {
                                productList?.map((o, i) => (
                                    <div className="info-product-saled" key={i}>
                                        <p>Mặt hàng đã bán : {o.name} </p>
                                        <p>Giá: {o.price} </p>
                                        <p>Số lượng : {o.num}</p>
                                    </div>
                                ))
                            }
                            <div className="info-money">
                                <p>Tổng tiền : {total.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        </div>
    )
}
