import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import mainManagerService from '../../../services/mainManagerService'
import useForm from "../../../hooks/useForm"
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";



export default function Vouchers() {
    let [showEdit, setShowEdit] = useState(false)
    let [showAdd, setShowAdd] = useState(false)
    let [editVoucher, setEditVoucher] = useState()
    let [listVoucher, setListVoucher] = useState()

    useEffect(async () => {
        let res = await mainManagerService.getAllVouchers()
        await setListVoucher(res.vouchers)
    }, [])

    const loadAfterAction = async () => {
        let res = await mainManagerService.getAllVouchers()
        await setListVoucher(res.vouchers)
    }

    const showEditForm = (data) => {
        setShowEdit(true)
        setShowAdd(false)
        // console.log(`data`, data)
        setEditVoucher(data)
    }
    const turnOffAdd = () => {
        setShowAdd(false)
    }
    const turnOffEdit = () => {
        setShowEdit(false)
    }
    if (!listVoucher) return <div className="col-lg-12 flex justify-center">Loading...</div>
    return (
        <>
            <div className="col-lg-12">
                <div className="activities flex justify-between margin-bottom-20">
                    <div className="addProduct">
                        <Link className="btn btn-success" to="#" onClick={() => setShowAdd(true)}>
                            Thêm mới khuyến mãi
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
                    {/* <div className="multi-search">
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
                    </div> */}
                </div>
            </div>
            <div className="col">
                <div className="row">
                    {
                        listVoucher?.map((o, i) => (
                            <VoucherItem
                                key={i}
                                data={o}
                                index={i + 1}
                                showEditForm={(data) => { showEditForm(data) }}
                            />
                        ))
                    }

                </div>
            </div>
            {
                showAdd === true ? (
                    <AddVoucher
                        turnOffAdd={() => turnOffAdd()}
                        loadAfterAction={() => loadAfterAction()}
                    />
                ) : (
                    showEdit === true && <EditVoucher
                        turnOffEditForm={() => turnOffEdit()}
                        voucher={editVoucher}
                        loadAfterAction={() => loadAfterAction()}
                    />
                )
            }
            {/* <AddVoucher /> */}
            {/* <EditVoucher/> */}
        </>
    )
}

export const VoucherItem = (props) => {
    return (
        <div className="col-lg-6 margin-bottom-20">
            <div className="voucher_item shadow">
                <div className="voucher_item-info flex  ">
                    <div className={
                        props.data.typeVoucher === "Voucher Store" ? "voucher_item-img flex justify-center flex-align-center pad-10 background-darkgreen txt-center" :
                            "voucher_item-img flex justify-center flex-align-center pad-10 background-darkorange txt-center"
                    }>
                        <p className="text-uppercase" style={{ color: 'white' }}> {props.data.title} </p>
                        <i className="fas fa-ticket-alt voucher_item-icon" />
                    </div>
                    <div className="voucher_item-content pad-10 w-100">
                        {props.data.desciption} <strong> {props.data.name} </strong>
                    </div>
                    <div className="voucher_action flex justify-center flex-align-center w-50">
                        <Link to="#" className="btn-circle btn-warning" onClick={() => { props.showEditForm(props.data) }}  ><i className="far fa-edit font-size-20" /></Link>
                        {/* <a href="#" className="btn-circle btn-danger "><i className="far fa-trash-alt font-size-20" /></a> */}
                    </div>
                </div>

            </div>
        </div>
    )
}

export const AddVoucher = (props) => {
    // const [startDate, setStartDate] = useState(new Date());
    // let dateStartRef = useRef()
    // let $ = window.$
    // useEffect(() => {
    //     $(function () {
    //         $("#datepicker").datepicker({ dateFormat: 'dd/mm/yy' }).val();
    //     });
    //     $(function () {
    //         $("#datepicker2").datepicker({ dateFormat: 'dd/mm/yy' }).val();
    //         // setForm({ ...form, dateEnd: $("#datepicker2").val() })
    //     });
    // }, [])
    let { form, error, handleSubmit, register, setForm } = useForm()

    // const changeDateEnd =(ev)=>{
    // // let value = ev.currentTarget.value
    //     // setStartDate(date)
    //     let value = ev.currentTarget.value
    //     console.log(`value.moment().format('D MMM, YYYY');`, value.moment().format('D MMM, YYYY'))
    //     setForm({...form,dateEnd:value})
    //     // console.log(`value`, date)
    // }

    // const changeDateStart =(ev)=>{
    //     // let value = ev.currentTarget.value
    //         // setStartDate(date)
    //         let value = ev.currentTarget.value
    //         setForm({...form,dateStart:value})
    //         // console.log(`value`, date)
    //     }

    useEffect(async ()=>{
        let res = await mainManagerService
    },[])

    const submit = async () => {
        console.log(`form`, form)
        let res = await mainManagerService.addNewVoucher(form)
        if (res.success) {
            alert("Đã Thêm Thành Công 😄")
            props.loadAfterAction()
        }
    }

    return (
        <div className="col-md-4">
            <div className="card w-100 border border-primary">
                {/* <img className="card-img-top h-200px" src="/img/male-profile-picture-vector-1862205.jpg" alt="Card image cap" /> */}
                <div className="card-body">
                    <h5 className="card-title">Thêm mới voucher</h5>
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="form-group">
                            <label >Tiêu đề Voucher</label>
                            <input type="text" className="form-control" {...register('title', { required: true })} placeholder="Nhập tiêu đề voucher..." />
                            {
                                error.title && <small className="text-danger" > {error.title} </small>
                            }
                        </div>
                        <div className="form-group">
                            <label >Tên Voucher</label>
                            <input type="text" className="form-control" {...register('name', { required: true })} placeholder="Nhập tên voucher..." />
                            {
                                error.name && <small className="text-danger" > {error.name} </small>
                            }
                        </div>

                        <div class="form-group">
                            <label> Loại voucher </label>
                            <select class="form-control" {...register('typeVoucher',{required:true})} >
                                <option value=''>Chọn loại khuyến mãi</option>
                                <option value="Voucher Ship"> Khuyến mãi vận chuyển </option>
                                <option value="Voucher Store" > Khuyến mãi cửa hàng </option>
                            </select>
                            {
                                error.typeVoucher && <small className='text-danger'> {error.typeVoucher} </small>
                            }

                        </div>
                        <div className="form-group">
                            <label >Ngày bắt đầu</label>
                            {/* <input type="text"  class="form-control"  placeholder="Nhập số điện thoại mới ..." value="090909090"> */}
                            <input type="date" className="form-control" {...register('dateStart', { required: true })} required placeholder='dd/mm/yyyy' />
                            {
                                error.dateStart && <small className="text-danger" > {error.dateStart} </small>
                            }
                        </div>
                        <div className="form-group">
                            <label >Ngày hết hạn</label>
                            {/* <input type="text"  class="form-control"  placeholder="Nhập số điện thoại mới ..." value="090909090"> */}
                            <input type="date" className="form-control" {...register('dateEnd', { required: true })} required placeholder="dd/mm/yyyy" />
                            {
                                error.dateEnd && <small className="text-danger" > {error.dateEnd} </small>
                            }
                            {/* <DatePicker selected={startDate} onChange={(date) => changeDateEnd(date)} formatWeekDay /> */}
                        </div>
                        <div className="form-group">
                            <label >Điêu kiện áp dụng</label>
                            <input type="number" className="form-control" {...register('condition', { required: true })} placeholder="Nhập số tiền điều kiện..." />
                            {
                                error.condition && <small className="text-danger" > {error.condition} </small>
                            }
                        </div>
                        <div className="form-group">
                            <label> Giảm giá </label>
                            <input type="number" className="form-control" {...register('discount', { required: true })} placeholder="Nhập số tiền điều kiện..." />
                            {
                                error.discount && <small className="text-danger" > {error.discount} </small>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Mô tả voucher</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" {...register('desciption', { required: true })} rows={3} placeholder="Nhập mô tả voucher..." />
                            {/* {
                                error.short_description && <small className="text-danger"> {error.short_description} </small>
                            } */}
                            {
                                error.description && <small className="text-danger" > {error.description} </small>
                            }
                        </div>
                        <button type="submit" className="btn btn-success margin-0-10">Thêm</button>
                        <button className="btn btn-danger margin-0-10" onClick={() => props.turnOffAdd()}  >Hủy</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export const EditVoucher = (props) => {
    // let $ = window.$
    // useEffect(() => {
    //     $(function () {
    //         $("#datepicker").datepicker({ dateFormat: 'dd/mm/yy' }).val();
    //     });
    // }, [])
    // console.log(`props.voucher`, props.voucher)
    let { form, error, register, handleSubmit, setForm } = useForm(props.voucher)
    // console.log(`form`, form)
    useEffect(() => {
        setForm(props.voucher)
    }, [props.voucher])
    // console.log(`form`, form)

    const submit = async () => {
        // console.log(`form`, form)
        let res = await mainManagerService.updateVoucher(form._id, form);
        if (res.success) {
            alert(`Đã cập nhật thành công voucher ${form.name} 😄`);
            props.loadAfterAction()
        }
    }
    return (
        <div className="col-md-4">
            <div className="card w-100">
                {/* <img className="card-img-top h-200px" src="/img/male-profile-picture-vector-1862205.jpg" alt="Card image cap" /> */}
                <div className="card-body border border-warning">
                    <h5 className="card-title">Chỉnh sửa voucher</h5>
                    <form onSubmit={handleSubmit(submit)}>
                        {/* <div className="form-group">
                        <label>Mã nhân viên</label>
                        <input type="text" disabled className="form-control" defaultValue="PET028123" />
                    </div> */}
                        <div className="form-group">
                            <label >Tiêu đề Voucher</label>
                            <input type="text" className="form-control" {...register('title', { required: true })} placeholder="Nhập tiêu đề voucher..." />
                        </div>
                        <div className="form-group">
                            <label >Tên Voucher</label>
                            <input type="text" className="form-control" {...register('name', { required: true })} placeholder="Nhập tên voucher..." />
                        </div>
                        <div class="form-group">
                          <label > Loại voucher</label>
                          <select class="form-control" {...register('typeVoucher')} disabled>
                            <option value="">Chọn loại khuyến mãi</option>
                            <option value="Voucher Ship"> Khuyến mãi vận chuyển </option>
                            <option value="Voucher Store"> Khuyến mãi cửa hàng </option>
                          </select>
                        </div>

                        <div className="form-group">
                            <label >Ngày bắt đầu</label>

                            {/* <input type="text"  class="form-control"  placeholder="Nhập số điện thoại mới ..." value="090909090"> */}
                            <input type="date" {...register('dateStart', { required: true })} className="form-control" />

                        </div>
                        <div className="form-group">
                            <label >Ngày hết hạn</label>

                            {/* <input type="text"  class="form-control"  placeholder="Nhập số điện thoại mới ..." value="090909090"> */}
                            <input type="date" className="form-control" {...register('dateEnd', { required: true })} data-date-format="dd/mm/yyyy" />

                        </div>
                        <div className="form-group">
                            <label >Điêu kiện áp dụng</label>
                            <input type="number"{...register('condition', { required: true })} className="form-control" placeholder="Nhập số tiền điều kiện..." />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Mô tả voucher</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" {...register('desciption', { required: true })} rows={3} placeholder="Nhập mô tả voucher..." />
                            {/* {
                                error.short_description && <small className="text-danger"> {error.short_description} </small>
                            } */}
                            {
                                error.description && <small className="text-danger" > {error.description} </small>
                            }
                        </div>

                        <button type='submit' className="btn btn-success margin-0-10">Cập nhật</button>
                        <button className="btn btn-danger margin-0-10" onClick={() => props.turnOffEditForm()} >Hủy</button>
                    </form>
                </div>
            </div>
        </div>
    )
}