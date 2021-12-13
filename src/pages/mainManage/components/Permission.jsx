import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import mainManageService from '../../../services/mainManagerService'

export default function Permission() {
    let [showEdit, setShowEdit] = useState(false)
    let [showAdd, setShowAdd] = useState(false)
    let [editPermission, setEditPermission] = useState()
    let [listPermission, setListPermission] = useState()

    const showEditForm = (data) => {
        setShowEdit(true)
        setShowAdd(false)
        setEditPermission(data)
    }

    const turnOffAdd = () => {
        setShowAdd(false)
    }
    const turnOffEdit = () => {
        setShowEdit(false)
    }
    useEffect(async () => {
        let res = await mainManageService.getAllPermissions();
        await setListPermission(res.permission)
    }, [])
    if (!listPermission) return <div className="col-lg-12 flex justify-center">Loading...</div>
    return (
        <>
            <div className="col-lg-12">
                <div className="activities flex justify-between margin-bottom-20">
                    <div className="addStaff">
                        <div className="btn btn-warning" onClick={() => { setShowAdd(true); setShowEdit(false) }}>
                            Thêm mới quyền
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
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Mã Chức Vụ</th>
                                        <th>Chức Vụ</th>
                                        <th>Chỉnh Sửa</th>
                                        <th>Xoá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listPermission?.map((o, i) => (
                                            <PermissionItem
                                                key={i}
                                                data={o}
                                                number={i}
                                                showEditForm={(data) => { showEditForm(data) }}
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
                /> : (
                    showEdit && <EditStaff
                        permission={editPermission}
                        turnOffEditForm={() => turnOffEdit()}
                    />)
            }
        </>
    )
}
const PermissionItem = (props) => {
    return (
        <tr>
            <td> {props.number} </td>
            <td> {props.data._id} </td>
            <td> {props.data.name} </td>
            <td className="text-center"><Link to="#" className="btn-circle btn-warning " onClick={() => props.showEditForm(props.data)} ><i className="far fa-edit font-size-20" /></Link></td>
            <td className="text-center" ><a href="#" className="btn-circle btn-danger "><i className="far fa-trash-alt font-size-20" /></a></td>
        </tr>
    )
}

export const EditStaff = (props) => {
    return (
        <div className="col-md-4">
            <div className="card w-100">
                <div className="card-body">
                    <h5 className="card-title">Thông tin chức vụ</h5>
                    <form >
                        <div className="form-group">
                            <label>Mã Chức Vụ</label>
                            <input type="text" disabled className="form-control" defaultValue={props.permission._id} />
                        </div>
                        <div className="form-group">
                            <label >Chức vụ</label>
                            <input type="text" defaultValue={props.permission.name} className="form-control" />
                        </div>

                        <button className="btn btn-warning margin-0-10">Chỉnh sửa</button>
                        <Link to="#" onClick={() => { props.turnOffEditForm() }} className="btn btn-danger margin-0-10">Hủy</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export const AddStaff = (props) => {
    return (
        <div className="col-md-4">
            <div className="card w-100">
                {/* <img className="card-img-top h-200px" src="/img/male-profile-picture-vector-1862205.jpg" alt="Card image cap" /> */}
                <div className="card-body">
                    <h5 className="card-title">Thêm mới chức vụ</h5>
                    <form >
                        {/* <div className="form-group">
                        <label>Mã nhân viên</label>
                        <input type="text" disabled className="form-control" defaultValue="PET028123" />
                    </div> */}
                        <div className="form-group">
                            <label >Chức vụ</label>
                            <input type="text" className="form-control" placeholder="Nhập đẩy đủ họ và tên..." />
                        </div>
                        <button className="btn btn-success margin-0-10">Thêm</button>
                        <button className="btn btn-danger margin-0-10" onClick={() => props.turnOffAddForm()} >Hủy</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
