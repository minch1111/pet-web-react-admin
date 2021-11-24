import React from 'react'
import { Link } from 'react-router-dom'

export default function AddSubCategory() {
    return (
        <div className="col-lg-12">
        <form className="add-activity">
            <div className="title margin-bottom-20 flex flex-align-center">
                <Link to="/warehouse-manage/category" className="margin-right-20"><i className="fas fa-chevron-left text-success" /></Link>
                <p className="text-uppercase text-success">Thêm mới Danh Mục Con</p>
            </div>
            <div className="form-group">
                <label>Danh Mục Cha</label>
                <input type="text" name="IdProduct" value="Chó" id className="form-control" disabled />
            </div>
            <div className="form-group">
                <label>Mã Danh Mục Con</label>
                <input type="text" name="IdProduct" id className="form-control" placeholder="Nhập danh mục con" />
            </div>
            <div className="form-group">
                <label>Tên Danh Mục Con</label>
                <input type="text" name="IdProduct" id className="form-control" placeholder="Nhập tên danh mục con" />
            </div>
            <button className="btn btn-success margin-top-20">Thêm</button>
        </form>
    </div>
    )
}
