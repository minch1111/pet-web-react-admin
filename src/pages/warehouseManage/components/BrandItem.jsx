import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';
import wareHouseService from '../../../services/warehouseService';
let $ = window.$

export default function BrandItem(props) {
    // console.log(`data`, data)
    var parsedDate = moment(props.data?.createAt).utc().format('DD-MM-YYYY')
    const [showDetail, setShowDetail] = useState(false)
    const del = async () => {
        let res = await wareHouseService.removeBrand(props.data._id)
        if (res.success) props.del()
    }
    const show = () => {
        setShowDetail(!showDetail)
    }
    // console.log(`props.data`, props.data)
    return (
        <div className="col-lg-4 margin-bottom-20" >
            <div className="brand">
                <div className="brand-cate" >
                    <div className="product_action pad-10  flex justify-center flex-align-center">
                        <div className="brand_name margin-0-20 font-weight-bold ">
                            <p> {props.data?.name} </p>
                        </div>
                        <Link onClick={show} className="product_action-edit margin-0-20 " to="#">
                            {
                                showDetail === true ? (<i class="fas fa-eye-slash font-size-20"></i>) :
                                    (<i className="fas fa-eye font-size-20"></i>)
                            }
                        </Link>
                        <Link className="product_action-edit margin-0-20 text-warning" to={`/warehouse-manage/brand/edit/${props.data.slug}`}>
                            <i className="far fa-edit font-size-20" />
                        </Link>
                        <Link onClick={(ev) => { ev.preventDefault(); del(); }} className="product_action-remove margin-0-20 text-danger">
                            <i className="far fa-trash-alt font-size-20" />
                        </Link>
                    </div>
                    {
                        showDetail === true ? (<div className="infodetail pad-20">
                            <p className="font-weight-bold">Danh mục : <span className="font-weight-normal">{props.data?.subCategory}</span></p>
                            <p className="font-weight-bold">Xuất Xứ : <span className="font-weight-normal">{props.data?.origin}</span></p>
                            <p className="font-weight-bold"> Ngày thêm : <span className="font-weight-normal">{parsedDate.toString()}</span> </p>
                        </div>) : null
                    }
                </div>
            </div>
        </div>
    )
}
