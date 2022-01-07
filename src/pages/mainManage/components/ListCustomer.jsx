import React,{useEffect, useState} from 'react'
import mainManagerService from '../../../services/mainManagerService'

export default function ListCustomer() {
  let [customers,setCustomers]=useState()
  useEffect(async()=>{
    let res = await mainManagerService.getListCustomer()
    await setCustomers(res.customers)
  },[])
  console.log(`customers`, customers)
  return (
    <>
      <div className="col-lg-12">
        <div className="activities flex justify-between margin-bottom-20">
          <div className="addStaff">
            <div className="btn btn-warning" >
              Thêm mới khách hàng
            </div>
          </div>
        </div>
      </div>
      <div className="col">
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Danh sách Chức Vụ </h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTableeee" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Mã Khách Hàng</th>
                                        <th>Tên Khách Hàng</th>
                                        <th>Tài khoản</th>
                                        <th>Số điện thoại</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                      customers?.map((o,i)=>(
                                        <Customer
                                          data={o}
                                          number={i}
                                          key={i}

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

export const Customer =(props)=>{
  return(
    <tr>
      <td> {props.number} </td>
      <td> {props.data._id} </td>
      <td>{props.data.name} </td>
      <td>{props.data.username} </td>
      <td>{props.data.phone} </td>
      <td>{props.data.email} </td>
    </tr>
  )
}
