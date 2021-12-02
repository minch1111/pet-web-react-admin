import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ListStaff() {
    let [showEdit,setShowEdit] = useState(false)
    let [showAdd,setShowAdd] = useState(false)
    let [editUser,setEditUser]=useState()

    let user={
        name:"Nguyễn Văn A",
        permission:"Quản Lý"
    }

    const showEditForm =(data)=>{
        setShowEdit(true)
        setShowAdd(false)
        console.log(`data`, data)
        setEditUser(data)
    }
    const turnOffAdd =()=>{
        setShowAdd(false)
    }
    const turnOffEdit =()=>{
        setShowEdit(false)
    }

    return (
        <>
            <div className="col-lg-12">
                <div className="activities flex justify-between margin-bottom-20">
                    <div className="addStaff">
                        <div className="btn btn-warning" onClick={()=>{setShowAdd(true);setShowEdit(false)}}>
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
                <div className="row">
                    <Staff 
                    data ={user}
                    showEdit = {(data)=>showEditForm(data)}
                    />
                    <Staff 
                    data ={user}
                    showEdit = {(data)=>showEditForm(data)}
                    />
                </div>
            </div>
            {
                showAdd?<AddStaff
                    turnOffAddForm ={()=>turnOffAdd()}
                />:(
                showEdit&&<EditStaff
                    user={editUser}
                    turnOffEditForm={()=>turnOffEdit()}
                />)
            }
        </>
    )
}

export const EditStaff = (props) => {
    return (
        <div className="col-md-4">
            <div className="card w-100">
                <img className="card-img-top h-200px" src="/img/male-profile-picture-vector-1862205.jpg" alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">Thông tin nhân viên</h5>
                    <form >
                        <div className="form-group">
                            <label>Mã nhân viên</label>
                            <input type="text" disabled className="form-control" defaultValue="PET028123" />
                        </div>
                        <div className="form-group">
                            <label >Tên nhân viên</label>
                            <input type="text" value={props.user.name} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label >Chức vụ</label>
                            <select className="form-control" value={props.user.permission} >
                                <option value="">--Chọn chức vụ--</option>
                                <option > Nhân viên bán hàng </option>
                                <option> Nhân viên truyền thông</option>
                                <option> Quản lý kho hàng </option>
                                <option value="Quản Lý"> Quản lý chính </option>
                            </select>
                        </div>
                        <button className="btn btn-warning margin-0-10">Chỉnh sửa</button> 
                        <Link to="#" onClick={()=>{props.turnOffEditForm()}}   className="btn btn-danger margin-0-10">Hủy</Link> 
                    </form>
                </div>
            </div>
        </div>
    )
}

export const AddStaff =(props)=>{
    return(
        <div className="col-md-4">
        <div className="card w-100">
            {/* <img className="card-img-top h-200px" src="/img/male-profile-picture-vector-1862205.jpg" alt="Card image cap" /> */}
            <div className="card-body">
                <h5 className="card-title">Thông tin nhân viên</h5>
                <form >
                    {/* <div className="form-group">
                        <label>Mã nhân viên</label>
                        <input type="text" disabled className="form-control" defaultValue="PET028123" />
                    </div> */}
                    <div className="form-group">
                        <label >Tên nhân viên</label>
                        <input type="text"  className="form-control" placeholder="Nhập đẩy đủ họ và tên..." />
                    </div>
                    <div className="form-group">
                        <label >Tài khoản nhân viên</label>
                        <input type="text"  className="form-control" placeholder="Nhập tài khoản đăng nhập..." />
                    </div>
                    <div className="form-group">
                        <label >Chức vụ</label>
                        <select className="form-control" >
                            <option value="">--Chọn chức vụ--</option>
                            <option > Nhân viên bán hàng </option>
                            <option> Nhân viên truyền thông</option>
                            <option> Quản lý kho hàng </option>
                            <option > Quản lý chính </option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label >Email nhân viên</label>
                        <input type="mail"  className="form-control" placeholder="Nhập email..." />
                    </div>
                    <div className="form-group">
                        <label >Số điện thoại</label>
                        <input type="text"  className="form-control" placeholder="Nhập số điện thoại..."/>
                    </div>
                    <div className="form-group">
                        <label >Giới tính</label>
                        <select className="form-control" >
                            <option value="">--Giới Tính--</option>
                            <option value="male"> Nam </option>
                            <option value="female" > Nữ</option>
                            <option value="other"> Khác </option>
                            
                        </select>
                    </div>
                    <button className="btn btn-success margin-0-10">Thêm</button> 
                    <button className="btn btn-danger margin-0-10"onClick={()=>props.turnOffAddForm()} >Hủy</button> 
                </form>
            </div>
        </div>
    </div>
    )
}

export const Staff = (props) => {

    return (
        <div className="col-md-4 col-lg-3 col-6 margin-bottom-20">
            <div className="card">
                <img className="card-img-top h-200px w-100" src="/img/male-profile-picture-vector-1862205.jpg" alt="Card image cap" />
                <div className="card-body">
                    <p className="card-title">Tên Nhân Viên : {props.data.name}</p>
                    <p className="card-title">Chức vụ : {props.data.permission}</p>
                    <div className="activities flex flex-align-center justify-evenly">
                        <Link to="#" className="btn-circle btn-warning " onClick={(ev)=>{ev.preventDefault();props.showEdit(props.data);}} ><i className="far fa-edit font-size-20" /></Link>
                        <a href="#" className="btn-circle btn-danger "><i className="far fa-trash-alt font-size-20" /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}