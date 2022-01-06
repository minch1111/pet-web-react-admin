import useForm from '../../hooks/useForm'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import mainManageService from '../../services/mainManagerService'
import { Context } from '../../App'

export default function RateDetail() {
  const [rateDetail, setRateDetail] = useState()
  let { user } = useContext(Context)
  let { form, error, handleSubmit, register, setForm } = useForm()
  let { slug } = useParams()
  // console.log(`slug`, slug)
  // console.log(`user`, user)
  useEffect(async () => {
    let res = await mainManageService.getRateDetailById(slug)
    if (res.success) setRateDetail(res.rate)
    setForm({ idStaff: user._id })
  }, [])

  const submit = async () => {
    // console.log(`form`, form)
    let res = await mainManageService.repRate(rateDetail._id, form)
    if (res.success) reload()
  }

  const reload = async () => {
    let res = await mainManageService.getRateDetailById(slug)
    if (res.success) setRateDetail(res.rate)
    setForm({ idStaff: user._id })
  }
  // console.log(`error`, error)

  if (!rateDetail) return <div className="col-lg-12">Loading...</div>
  return (
    <>
      <div className="col-lg-12 mb-1">
        <Link to="/rate" className="btn btn-success">Quay lại</Link>
      </div>
      <div className="row p-3">
        <div className="col-lg-6">
          <form onSubmit={handleSubmit(submit)}>
            <h4>Trả Lời Đánh Giá Khách Hàng</h4>
            <div class="form-group">
              <label> Tên Sản Phẩm </label>
              <input type="text" value={rateDetail.product} className="form-control" disabled />
            </div>
            <div class="form-group">
              <label> Tên Khách Hàng </label>
              <input type="text" value={rateDetail.customer} className="form-control" disabled />
            </div>
            <div class="form-group">
              <label> Số Sao Đánh Giá </label>
              <input type="number" value={rateDetail.star} className="form-control" disabled />
            </div>
            <div class="form-group">
              <label> Nội dung đánh giá của Khách Hàng </label>
              <textarea cols={3} type="text" value={rateDetail.content} className="form-control" disabled />
            </div>
            <div class="form-group">
              <label> Trả lời đánh giá </label>
              <textarea cols={3} {...register('content', { required: true })} className="form-control" />
              {
                error.content && <small className='text-danger'> {error.content} </small>
              }
            </div>
            <button type='submit' className="btn btn-success">Trả lời</button>
          </form>
        </div>
        <div className="col-lg-6">
          <h4>Danh sách trả lời đánh giá</h4>
          {
            rateDetail?.repRate?.map((o, i) => (
              <RepRateItem
                key={i}
                data={o}
                reload ={reload}
                user={user}
                idRate={slug}
              />
            ))
          }
        </div>
      </div>
    </>
  )
}

export const RepRateItem = (props) => {
  const [acceptEdit, setAcceptEdit] = useState(true)
  let {form,error,handleSubmit,register,setForm} = useForm({idStaff:props.user._id,content:props.data.content,idRep:props.data._id})
  const removeRepRate =async()=>{
    let res = await mainManageService.removeRepRate(props.data._id)
    if(res.success) props.reload()
  }
  const submit =async ()=>{
    console.log(`form`, form)
    let res = await mainManageService.updateRepRate(props.idRate,form)
    if(res.success) {props.reload();setAcceptEdit(true)}
  }
  return (
    <form onSubmit={handleSubmit(submit)}>
      <div class="form-group">
        <label > Nhân viên: {props.data.staff}</label>
        <textarea cols={2} {...register('content',{required:true})} className="form-control" disabled={acceptEdit} />
        {
          acceptEdit &&
          <p className='p-1 ml-2'> <i className="far fa-edit font-size-20 mr-2 text-warning" onClick={() => { setAcceptEdit(false) }} />
          <i className="far fa-trash-alt font-size-20 text-danger" onClick={removeRepRate}/> </p>
        }
      </div>
      {
        !acceptEdit && <>
          <button type='submit' className="btn btn-warning mr-2">Cập nhật</button>
          <button className="btn btn-danger" onClick={() => setAcceptEdit(true)}>Huỷ</button>
        </>
      }
    </form>
  )
}
