import React from 'react'
import { Link } from 'react-router-dom'

export default function AddProduct() {
    return (
        <div className="col-lg-12">
            <div className="add-activity">
                <div className="title margin-bottom-20 flex flex-align-center">
                    <Link to="/warehouse-manage" className="margin-right-20"><i className="fas fa-chevron-left text-warning" /></Link>
                    <p className="text-uppercase text-warning">Thêm mới sản phẩm</p>
                </div>
                <div className="form-group">
                    <label> Chọn Nhãn Hiệu </label>
                    <select className="form-select form-control">
                        <option selected>--Nhãn hiệu--</option>
                        <option value={1}>One</option>
                        <option value={2}>Two</option>
                        <option value={3}>Three</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Mã Sản Phẩm</label>
                    <input type="text" name="IdProduct" id className="form-control" placeholder="Nhập mã sản phẩm" />
                </div>
                <div className="form-group">
                    <label>Tên Sản Phẩm</label>
                    <input type="text" name="IdProduct" id className="form-control" placeholder="Nhập mã sản phẩm" />
                </div>
                <div className="form-group">
                    <label>Giá</label>
                    <input type="number" name="IdProduct" id className="form-control" placeholder="Nhập mã sản phẩm" />
                </div>
                <div className="form-group">
                    <label>Số lượng </label>
                    <input type="text" name="IdProduct" id className="form-control" placeholder="Nhập mã sản phẩm" />
                </div>
                <button type="submit" className="btn btn-success btn-block">Thêm</button>
            </div>
        </div>
    )
}
