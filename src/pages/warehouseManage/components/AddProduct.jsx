import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import img from '../../../assets/img/pate.png'
let $ = window.$

export default function AddProduct() {
    useEffect(() => {
        function previewImages() {

            var $preview = $('#preview').empty();
            if (this.files) $.each(this.files, readAndPreview);

            function readAndPreview(i, file) {
                file = file 

                if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
                    return alert(file.name + " is not an image");
                } // else...

                var reader = new FileReader();

                $(reader).on("load", function () {
                    $preview.append($("<img/>", { src: this.result, height: 100 }));
                });

                reader.readAsDataURL(file);
            }
        }

        $('#file-input').on("change", previewImages);
    }, [])
    
    return (
        <div className="col-lg-12">
            <div className="add-activity">
                <div className="title margin-bottom-20 flex flex-align-center">
                    <Link to="/warehouse-manage" className="margin-right-20"><i className="fas fa-chevron-left text-success" /></Link>
                    <p className="text-uppercase text-success">Thêm mới sản phẩm</p>
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
                <div className="form-group">
                    <label htmlFor>Hình Ảnh</label>
                    <input type="file" name id="file-input" className="form-control" multiple accept="gif|jpg|png"/>
                    <div id="preview" className="margin-top-20 pad-20" style={{ border: '1px solid #d1d3e2', borderRadius: '7px' }}>
                        <img src={img} />
                    </div>
                </div>
                <button type="submit" className="btn btn-success btn-block">Thêm</button>
            </div>
        </div>
    )
}
