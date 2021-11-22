import React from 'react'

export default function EditProduct() {
    return (
        <div className="col-lg-12">
            <form action className="edit-activity">
                <div className="edit-title flex flex-align-center">
                    <i className="fas fa-chevron-left text-warning margin-right-20" />
                    <p className="text-uppercase text-warning margin-0">Chỉnh sửa thông tin sản phẩm</p>
                </div>
                <div className="form-group">
                    <label htmlFor />
                    <div className="form-group">
                        <label> Chọn Nhãn Hiệu </label>
                        <select className="form-select form-control">
                            <option>--Nhãn hiệu--</option>
                            <option value="{1}">Nhãn Hiệu 1</option>
                            <option selected value="{2}">Nhãn Hiệu 2</option>
                            <option value="{3}">Nhãn Hiệu 3</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor>Tên Sản Phẩm</label>
                    <input type="text" name id className="form-control" defaultValue="Tên Sản Phẩm" />
                </div>
                <div className="form-group">
                    <label htmlFor>Số Lượng tồn</label>
                    <input type="number" name id className="form-control" defaultValue={50} />
                </div>
                <div className="form-group">
                    <label htmlFor>Hình Ảnh</label>
                    <input type="file" name id="file-input" className="form-control" multiple accept="gif|jpg|png" />
                    <div id="preview" className="margin-top-20 pad-20" style={{ border: '1px solid #d1d3e2', borderRadius: '7px' }}>
                    </div>
                </div>
                <button className="btn btn-warning margin-top-20">Xác Nhận</button>
            </form>
        </div>
    )
}
