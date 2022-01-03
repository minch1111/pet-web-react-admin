import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import mainManageService from '../../../services/mainManagerService'
import useForm from "../../../hooks/useForm"
import NotificationAlert from 'react-notification-alert'
let $ = window.$

export default function ListStaff() {
    let [staff, setStaff] = useState()
    let [listPer, setListPer] = useState()
    let [showEdit, setShowEdit] = useState(false)
    let [showAdd, setShowAdd] = useState(false)
    let [editUser, setEditUser] = useState()

    useEffect(async () => {
        let res = await mainManageService.getAllStaff()
        let res1 = await mainManageService.getAllPermissions()
        await setStaff(res?.user)
        await setListPer(res1?.permission)
        $(document).ready(function () {
            $('#dataTableeee').DataTable({
                // "dom": '<"toolbar">frtip'
            });
        });
    }, [])

    const showEditForm = (data) => {
        if (showEdit === true) {
            setEditUser(data)
        }
        else {
            setEditUser(data)
            setShowEdit(true)
            setShowAdd(false)
        }
    }
    const loadAfterEdit = async () => {
        let res = await mainManageService.getAllStaff()
        await setStaff(res?.user)
    }
    const turnOffAdd = () => {
        setShowAdd(false)
    }
    const turnOffEdit = () => {
        setShowEdit(false)
    }
    if (!staff) return <div className="col-lg-12 flex justify-center">Loading...</div>
    return (
        <>
            <div className="col-lg-12">
                <div className="activities flex justify-between margin-bottom-20">
                    <div className="addStaff">
                        <div className="btn btn-warning" onClick={() => { setShowAdd(true); setShowEdit(false) }}>
                            Thêm mới nhân viên
                        </div>
                    </div>
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
                        <h6 class="m-0 font-weight-bold text-primary">Danh sách Chức Vụ </h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTableeee" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Tên Nhân Viên</th>
                                        <th>Tài khoản</th>
                                        <th>Chức Vụ</th>
                                        <th>Email</th>
                                        <th>Chỉnh sửa</th>
                                        <th>Xoá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        staff?.map((o, i) => (
                                            <Staff
                                                key={i}
                                                number={i + 1}
                                                data={o}
                                                showEditForm={(data) => showEditForm(data)}
                                                loadAfterEdit={() => loadAfterEdit()}
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
                showAdd ? <AddStaff
                    turnOffAddForm={() => turnOffAdd()}
                    listPer={listPer}
                    loadAfterEdit={() => loadAfterEdit()}
                /> : (
                    showEdit && <EditStaff
                        user={editUser}
                        listPer={listPer}
                        turnOffEditForm={() => turnOffEdit()}
                        loadAfterEdit={() => loadAfterEdit()}
                    />)
            }
        </>
    )
}

export const EditStaff = (props) => {
    let notify = useRef()
    var options = {};
    options = {
        place: 'tr',
        message: (
            <div>
                Đã cập nhật thành công  😄😄😄
            </div>
        ),
        type: "success",
        icon:'far fa-check-circle',
        autoDismiss: 4,
        closeButton:false
    }
    // console.log(`props.user`, props.user)
    let { form, error, handleSubmit, register, setForm } = useForm()
    useEffect(() => {
        setForm({ ...props.user, id: props.user._id })
    }, [props.user])
    // setForm(props.user)
    // console.log(`form`, form)
    // console.log(`props.data`, props.data)
    const submit = async () => {
        console.log(`form`, form)
        let res = await mainManageService.updatePermissionStaff(form._id, form)
        if (res.success) {
            // alert('Cập nhật thành công 😄');
            notify.current.notificationAlert(options)
            props.loadAfterEdit()
        }
    }

    return (
        <div className="col-md-4 col-6 col-lg-4" >
            <NotificationAlert ref={notify} />
            <div className="card w-100">
                <img className="card-img-top h-200px" src="/img/male-profile-picture-vector-1862205.jpg" alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">Thông tin nhân viên</h5>
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="form-group">
                            <label>Mã nhân viên</label>
                            <input type="text" disabled className="form-control" {...register('id')} />
                        </div>
                        <div className="form-group">
                            <label >Tên nhân viên</label>
                            <input type="text" {...register('name')} disabled className="form-control" />
                        </div>
                        <div className="form-group">
                            <label >Chức vụ</label>
                            <select className="form-control" {...register('Role')} >
                                <option value="">--Chọn chức vụ--</option>
                                {
                                    props.listPer?.map((o, i) => (
                                        <option key={i} value={o.name}> {o.name} </option>
                                    ))
                                }
                                {/* <option value="Quản Lý"> Quản lý chính </option> */}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-warning margin-0-10">Chỉnh sửa</button>
                        <Link to="#" onClick={() => { props.turnOffEditForm() }} className="btn btn-danger margin-0-10">Hủy</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export const AddStaff = (props) => {
    let notify = useRef()
    let { form, error, handleSubmit, register } = useForm()
    var options = {};
    options = {
        place: 'tr',
        message: (
            <div>
                Đã thêm thành công tài khoản {form.name} 😄😄😄
            </div>
        ),
        type: "success",
        icon:'far fa-check-circle',
        autoDismiss: 7
    }
    const submit = async () => {
        console.log(`form`, form)
        let res = await mainManageService.addNewStaff(form)
        if (res.success) {
            // alert('Đã thêm thành công ' + form.name);
            notify.current.notificationAlert(options)
            props.loadAfterEdit()
        }
    }

    return (
        <div className="col-md-4">
            <NotificationAlert
                ref={notify}
            />
            <div className="card w-100">
                {/* <img className="card-img-top h-200px" src="/img/male-profile-picture-vector-1862205.jpg" alt="Card image cap" /> */}
                <div className="card-body">
                    <h5 className="card-title">Thông tin nhân viên</h5>
                    <form onSubmit={handleSubmit(submit)} >
                        {/* <div className="form-group">
                        <label>Mã nhân viên</label>
                        <input type="text" disabled className="form-control" defaultValue="PET028123" />
                    </div> */}
                        <div className="form-group">
                            <label >Tên nhân viên</label>
                            <input type="text" className="form-control" placeholder="Nhập đẩy đủ họ và tên..." {...register('name', { required: true })} />
                            {
                                error.name && <small className="text-danger" > {error.name} </small>
                            }
                        </div>
                        <div className="form-group">
                            <label >Tài khoản nhân viên</label>
                            <input type="text" className="form-control" placeholder="Nhập tài khoản đăng nhập..." {...register('username', { required: true })} />
                            {
                                error.username && <small className="text-danger" > {error.username} </small>
                            }
                        </div>
                        <div className="form-group">
                            <label >Chức vụ</label>
                            <select className="form-control" {...register('Role', { required: true })}>
                                <option value="">--Chọn chức vụ--</option>
                                {
                                    props?.listPer.map((o, i) => (
                                        <option key={i} value={o.name}> {o.name} </option>
                                    ))
                                }
                            </select>
                            {
                                error.Role && <small className="text-danger" > {error.Role} </small>
                            }
                        </div>
                        <div className="form-group">
                            <label >Email nhân viên</label>
                            <input type="mail" className="form-control" placeholder="Nhập email..." {...register('email', { required: true })} />
                            {
                                error.email && <small className="text-danger" > {error.email} </small>
                            }
                        </div>
                        <div className="form-group">
                            <label >Số điện thoại</label>
                            <input type="text" className="form-control" placeholder="Nhập số điện thoại..." {...register('phone', { required: true })} />
                            {
                                error.phone && <small className="text-danger" > {error.phone} </small>
                            }
                        </div>
                        <div className="form-group">
                            <label >Giới tính</label>
                            <select className="form-control" {...register('gender', { required: true })} >
                                <option value="">--Giới Tính--</option>
                                <option value="Nam"> Nam </option>
                                <option value="Nữ" > Nữ</option>
                                <option value="Khác"> Khác </option>
                            </select>
                            {
                                error.gender && <small className="text-danger" > {error.gender} </small>
                            }
                        </div>
                        <div className="form-group">
                            <label >Địa chỉ</label>
                            <input type="text" className="form-control" placeholder="Nhập địa chỉ..." {...register('address', { required: true })} />
                            {
                                error.address && <small className="text-danger" > {error.address} </small>
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

export const Staff = (props) => {
    let notify = useRef()
    var options = {};
    options = {
        place: 'tr',
        message: (
            <div>
                Đã xoá thành công {props.data.name} 😄😄😄
            </div>
        ),
        type: "success",
        icon:'far fa-check-circle',
        autoDismiss: 4,
        closeButton:false
    }
    const del = async () => {
        let res = await mainManageService.removeStaff(props.data._id)
        if (res.success) {
            // alert('đã xoá thành công ' + props.data.name);
            notify.current.notificationAlert(options)
            props.loadAfterEdit()
        }
    }
    return (

        <tr>
            <td> {props.number} </td>
            <td> {props.data.name} </td>
            <td> {props.data.username} </td>
            <td> {props.data.Role} </td>
            <td> {props.data.email} </td>
            <td className="text-center"><Link to="#" className="btn-circle btn-warning " onClick={() => { props.showEditForm(props.data) }} ><i className="far fa-edit font-size-20" /></Link></td>
            <td className="text-center" ><Link to="#" className="btn-circle btn-danger" onClick={() => { del() }} ><i className="far fa-trash-alt font-size-20" /></Link></td>
            <NotificationAlert ref={notify} />
        </tr>
    )
}