import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../App'
import useForm from '../../hooks/useForm'
import mainManageService from '../../services/mainManagerService'

export default function Rate() {
  const [listRate, setListRate] = useState()
  // let [showDetail, setShowDetail] = useState(false)
  // let [rateDetail, setRateDetail] = useState()
  let { user } = useContext(Context)

  useEffect(async () => {
    let res = await mainManageService.getListRate()
    if (res.success) setListRate(res.rate)
  }, [])
  console.log(`listRate`, listRate)
  const Reload = async () => {
    let res = await mainManageService.getListRate()
    if (res.success) setListRate(res.rate)
  }

  if (!listRate) return <div className="col-lg-12 flex justify-center">Loading...</div>
  return (
    <>
      <div className="col">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Danh sách Đánh Giá </h6>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Sản Phẩm </th>
                    <th>Số sao đánh giá</th>
                    <th>Khách hàng</th>
                    <th>Nội Dung</th>
                    <th>Trả lời đánh giá/Chi tiết</th>
                    <th>Xoá</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    listRate?.map((o, i) => (
                      <RateItem
                        key={i}
                        number={i}
                        data={o}
                      />
                    ))
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const RateItem = (props) => {
  return (
    <tr>
      <td> {props.data.number} </td>
      <td> {props.data.product} </td>
      <td> {props.data.star} </td>
      <td> {props.data.customer} </td>
      <td> {props.data.content} </td>
      <td className="text-center"><Link to={`/rate/${props.data._id}`} className="btn-circle btn-warning "  ><i className="far fa-edit font-size-20" /></Link></td>
      <td className="text-center" ><Link to="#" className="btn-circle btn-danger"  ><i className="far fa-trash-alt font-size-20" /></Link></td>
    </tr>
  )
}


