import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../App'
import useForm from '../../hooks/useForm'
import mainManageService from '../../services/mainManagerService'

export default function Rate() {
  const [listRate, setListRate] = useState()
  let [showDetail, setShowDetail] = useState(false)
  let [rateDetail, setRateDetail] = useState()
  let {user} = useContext(Context)

  useEffect(async () => {
    let res = await mainManageService.getListRate()
    if (res.success) setListRate(res.rate)
  }, [])
  console.log(`listRate`, listRate)
  const showRateDetail =(data)=>{
    console.log(`data`, data)
    setShowDetail(true)
    setRateDetail(data)
  }
  const Reload = async()=>{
    let res = await mainManageService.getListRate()
    if (res.success) setListRate(res.rate)
  }
  const turnOffAddForm =()=>{setShowDetail(false)}
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
                        showRateDetail={(data)=>showRateDetail(data)}
                      />
                    ))
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {
        showDetail?(
          <RateDetail
          data={rateDetail}
          turnOffAddForm={()=>turnOffAddForm()}
          staff = {user}
          reload={()=>Reload()}
          />
        ):null
      }
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
      <td className="text-center"><Link to="#" className="btn-circle btn-warning " onClick={()=>{props.showRateDetail(props.data)}} ><i className="far fa-edit font-size-20" /></Link></td>
      <td className="text-center" ><Link to="#" className="btn-circle btn-danger"  ><i className="far fa-trash-alt font-size-20" /></Link></td>
    </tr>
  )
}

export const RateDetail = (props) => {
  let {form,error,handleSubmit,register,setForm } = useForm()
  useEffect(()=>{
    setForm({idStaff:props.staff._id})
  },[props.data.repRate])
  const submit = async()=>{
    console.log(`form`, form)
    let res = await mainManageService.repRate(props.data._id,form)
    if(res.success) {alert("Đã trả lời thành công"); props.reload()}
  }
  return (
    <div className="col-md-6">
      {/* <NotificationAlert
                ref={notify}
            /> */}
      <div className="card w-100">
        {/* <img className="card-img-top h-200px" src="/img/male-profile-picture-vector-1862205.jpg" alt="Card image cap" /> */}
        <div className="card-body">
          <h5 className="card-title">Đánh giá của khách hàng</h5>
          <form onSubmit={handleSubmit(submit)} >
            {/* <div className="form-group">
                        <label>Mã nhân viên</label>
                        <input type="text" disabled className="form-control" defaultValue="PET028123" />
                    </div> */}
            <div className="form-group">
              <label >Khách hàng</label>
              <input type="text" className="form-control" value={props.data.customer} disabled/>
              {
                error.name && <small className="text-danger" > {error.name} </small>
              }
            </div>
            <div className="form-group">
              <label >Sản phẩm</label>
              <input type="text" className="form-control" value={props.data.product} disabled />
              {
                error.username && <small className="text-danger" > {error.username} </small>
              }
            </div>
            <div className="form-group">
              <label >Số sao</label>
              <input type="mail" className="form-control" value={props.data.star} disabled />
              {
                error.email && <small className="text-danger" > {error.email} </small>
              }
            </div>
            <div className="form-group">
              <label >Nội dung</label>
              <textarea type="text" className="form-control"  cols={3} value={props.data.content} disabled />
              {
                error.phone && <small className="text-danger" > {error.phone} </small>
              }
            </div>
            <p>Phần trả lời</p>
            {
              props.data.repRate.map((o,i)=>(
                <p key={i}>
                  <p><strong>Nhân viên đánh giá</strong> : {o.staff}</p>
                  <p><i>{o.content} </i> <i className="far fa-edit text-warning" /> <i className="far fa-trash-alt text-danger" /> </p>
                </p>
              ))
            }
            <div className="form-group">
              <label >Nội dung trả lời</label>
              <textarea type="text" className="form-control"  cols={3} {...register('content',{required:true})} />
              {
                error.content && <small className="text-danger" > {error.content} </small>
              }
            </div>

            <button type="submit" className="btn btn-success margin-0-10">Thêm</button>
            <button className="btn btn-danger margin-0-10" onClick={() => props.turnOffAddForm()} >Hủy</button>
          </form>
        </div>
      </div>
    </div>
  )

}
