import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../App'
import { Link } from 'react-router-dom'
import mainManageService from '../../services/mainManagerService'
let $ = window.$

export default function ListOrder() {
  const [orders, setOrders] = useState()
  const { user } = useContext(Context)
  useEffect(async () => {
    $(document).ready(function () {
      $('#dataTable').DataTable();
    });
    let res1 = await mainManageService.getListOrder();
    if (res1.success) {
      // console.log(`res`, res)
      setOrders(res1.orders)
    }
  }, [])
  const confirmOrder = async (idOrder) => {
    let staff = { staff: user._id }
    console.log(`staff`, staff)
    let res = await mainManageService.confirmOrder(staff, idOrder)
    if (res.success) {
      let res = await mainManageService.getListOrder();
      if (res.success) {
        // console.log(`res`, res)
        setOrders(res.orders)
      }
    }

  }
  console.log(`orders`, orders)
  if (!orders) return <div>Loading...</div>
  return (
    <>
      <div className="col-lg-12">
        <div className="activities flex justify-between margin-bottom-20">
          {/* <div className="addStaff">
                        <div className="btn btn-warning" onClick={() => { setShowAdd(true); setShowEdit(false) }} >
                            Thêm mới Bài Viết
                        </div>
                    </div> */}
          <div className="multi-search">
            <div className="dropdown">
              <button className="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">
                Dropdown button
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Danh sách Hoá Đơn </h6>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Mã đơn hàng </th>
                    <th>Khách hàng</th>
                    <th>Nhân Viên xác nhận</th>
                    <th> Trạng thái</th>
                    <th>Thao tác</th>
                    <th>Ngày đặt hàng</th>
                    <th>Tổng hoá đơn</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    orders?.map((o, i) => (
                      <OrderItem
                        key={i}
                        number={i}
                        data={o}
                        // confirmOrder={(idOrder) => confirmOrder(idOrder)}
                      // setNewsToEdit={(data) => setNewsToEdit(data)}
                      // loadAfterAction={() => loadAfterAction()}
                      />
                    ))
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* {
        showAdd ? <AddNews
          turnOffAdd={() => turnOffAdd()}
          loadAfterAction={() => loadAfterAction()}
        /> : (showEdit && <EditNews
          news={editNews}
          turnOffEdit={() => turnOffEdit()}
          loadAfterAction={() => loadAfterAction()}
        />)
      } */}
    </>
  )
}

export const OrderItem = (props) => {
  const money = (a) => {
    return a.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
  }
  return (
    <tr>
      <td> {props?.number} </td>
      <td> {props?.data?._id} </td>
      <td> {props?.data?.name} </td>
      <td> {props?.data?.Staff} </td>
      <td> {props?.data?.status}</td>
      <td className='text-center'> {props?.data?.status === "Chờ xác nhận" ? <Link to={`/staff/${props.data._id}`} className='btn-circle btn-warning' ><i class="fas fa-check"></i></Link> : <Link to={`/staff/${props.data._id}`} className='btn-circle btn-success '><i class="fas fa-check"></i></Link>} </td>
      <td> {props?.data?.dateOrder} </td>
      <td> {money(props?.data?.totalPrice)} </td>
      {/* <td className="text-center"><Link to="#" className="btn-circle btn-warning " ><i className="far fa-edit font-size-20" /></Link></td>
      <td className="text-center" ><a href="#" className="btn-circle btn-danger" ><i className="far fa-trash-alt font-size-20" /></a></td> */}
    </tr>
  )
}