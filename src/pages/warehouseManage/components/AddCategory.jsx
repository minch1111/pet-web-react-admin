import React from 'react'
import { Link } from 'react-router-dom'

export default function AddNewCategory() {
    return (
        <div className="col-lg-12">
            <form className="add-activity">
                <div className="title margin-bottom-20 flex flex-align-center">
                    <Link to="/warehouse-manage/category" className="margin-right-20"><i className="fas fa-chevron-left text-success" /></Link>
                    <p className="text-uppercase text-success">Thêm mới Danh Mục</p>
                </div>
                <div className="form-group">
                    <label>Mã Danh Mục</label>
                    <input type="text" name="IdProduct" id className="form-control" placeholder="Nhập mã sản phẩm" />
                </div>
                <div className="form-group">
                    <label>Tên Danh Mục</label>
                    <input type="text" name="IdProduct" id className="form-control" placeholder="Nhập mã sản phẩm" />
                </div>
                <button className="btn btn-success margin-top-20">Thêm</button>
            </form>
        </div>
    )
}
