import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Context } from '../../App'
import useForm from '../../hooks/useForm'
import mainManageService from '../../services/mainManagerService'
import mainManagerService from '../../services/mainManagerService'

export default function OrderDetail() {
  const [orderDetail, setOrderDetail] = useState()
  let { user } = useContext(Context);
  // console.log(`user`, user)
  let { slug } = useParams()
  useEffect(async () => {
    let res = await mainManagerService.getOrderDetail(slug)
    res.success && await setOrderDetail(res)
  }, [])
  console.log(`orderDetail`, orderDetail)
  const money = (a) => {
    return a.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
  }
  let { form, error, handleSubmit, register } = useForm({ staff: user._id })
  const submit = async () => {
    let res = await mainManageService.confirmOrder(form, slug)
    if (res.success) {
      alert(res.message)
      let res1 = await mainManagerService.getOrderDetail(slug)
      res1.success && await setOrderDetail(res1)
    }
  }
  if (!orderDetail) return <div className="col-lg-12">Loading...</div>
  return (
    <div className="col-lg-12">
      <form onSubmit={handleSubmit(submit)} className="add-activity">
        <div className="form-group">
          <label>Mã hoá đơn</label>
          <input type="text" className="form-control" disabled value={orderDetail?.orders._id} placeholder="Nhập tên danh mục" />

        </div>
        <div className="form-group">
          <label>Tên Người Nhận </label>
          <input type="text" className="form-control" disabled value={orderDetail?.orders.nameRecieve} placeholder="Nhập tên danh mục" />

        </div>
        <div className="form-group">
          <label>Địa chỉ nhận</label>
          <input type="text" className="form-control" disabled value={orderDetail?.orders.addressRecieve} placeholder="Nhập tên danh mục" />

        </div>
        <div className="col-lg-12" style={{ boxShadow: "0 0 1px 0 black" }}>

          <div className="row p-1">Danh sách sản phẩm</div>
          {
            orderDetail.orderdetails?.map((o, i) => (
              <div className="row mb-2" key={i}>
                <div className="col-md-2">
                  <img src={o?.imageProduct} alt="" className='w-100' />
                </div>
                <div className="col-md-7">
                <p> {o?.product} </p>
                <p> Số lượng : {o?.amount} </p>
                </div>
                <div className="col-md-3">
                  Giá :{money(o?.price)}
                </div>
              </div>
            ))
          }
          <div className="row mt-3">
            <div className="col-lg-12 flex justify-end-center">
              <strong>Tổng hoá đơn</strong> : <span> {money(orderDetail?.orders.totalPrice)} </span>
            </div>
          </div>
        </div>
        <div className="form-group mt-3">
          <label>Ngày đặt hàng</label>
          <input type="text" className="form-control" disabled value={orderDetail?.orders.dateOrder} placeholder="Nhập tên danh mục" />
        </div>
        <div className="form-group">
          <label>Hình thức thanh toán</label>
          {
            orderDetail?.orders.payments === true ? <input type="text" className="form-control" disabled value="Thanh toán online" placeholder="Nhập tên danh mục" /> :
              <input type="text" className="form-control" disabled value="Thanh toán khi nhận hàng" placeholder="Nhập tên danh mục" />
          }

        </div>
        {/* <div class="form-group">
          <label >Trạng thái đơn hàng</label>
          <select class="form-control">
            <option value="Chờ xác nhận"> Chờ xác nhận </option>
            <option value="Đã xác nhận"> Đã xác nhận </option>
            <option value="Đang giao hàng"> Đang giao hàng </option>
            <option value="Đã nhận hàng">Đã nhận hàng</option>
          </select>
        </div> */}
        {
          orderDetail.orders.status === "Chờ xác nhận" ?
            <button type='submit' className="btn btn-warning margin-top-20">Xác nhận</button> : (
              orderDetail.orders.status === 'Đã xác nhận' ?
                <button type='submit' className="btn btn-primary margin-top-20">Xác nhận giao hàng</button> : (
                  orderDetail.orders.status === 'Đang giao hàng' &&
                  <button type='submit' className="btn btn-success margin-top-20">Xác nhận đã nhận hàng</button>
                )
            )
        }

      </form>
    </div>
  )
}
