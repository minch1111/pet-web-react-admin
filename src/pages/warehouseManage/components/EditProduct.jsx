import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import img from "../../../assets/img/pate.png"
let $ = window.$

export default function EditProduct() {
    useEffect(() => {
        function previewImages() {

            var $preview = $('#preview').empty();
            if (this.files) $.each(this.files, readAndPreview);

            function readAndPreview(i, file) {
                if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
                    return alert(file.name + " is not an image");
                } // else...

                var reader = new FileReader();

                $(reader).on("load", function () {
                    $preview.append($("<img/>", { src: this.result, height: 100 }));
                    console.log(`this.result`, this.result)
                });

                reader.readAsDataURL(file);

            }

        }

        $('#file-input').on("change", previewImages);
        function previewAvatar() {

            var $preview = $('#preview-avatar').empty();
            if (this.files) $.each(this.files, readAndPreview);

            function readAndPreview(i, file) {
                if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
                    return alert(file.name + " is not an image");
                } // else...

                var reader = new FileReader();

                $(reader).on("load", function () {
                    $preview.append($("<img/>", { src: this.result, height: 100 }));
                    console.log(`this.result`, this.result)
                });

                reader.readAsDataURL(file);

            }

        }

        $('#avatar-input').on("change", previewAvatar);
    }, [])
    // console.log("img",img)
    return (
        <div className="col-lg-12">
            <form action className="edit-activity">
                <div className="edit-title flex flex-align-center">
                    <Link to="/warehouse-manage"><i className="fas fa-chevron-left text-warning margin-right-20" /></Link>
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
                    <label htmlFor>Giá Nhập</label>
                    <input type="number" name id className="form-control" defaultValue={5000} />
                </div>
                <div className="form-group">
                    <label htmlFor>Giá Bán</label>
                    <input type="number" name id className="form-control" defaultValue={7000} />
                </div>
                <div class="form-group">
                    <label for="">Ảnh Đại Diện Sản Phẩm</label>
                    <input type="file" name="" class="form-control" id="avatar-input" accept="gif|jpg|png" />
                    <div id="preview-avatar" className="margin-top-20 pad-20" style={{ border: '1px solid #d1d3e2', borderRadius: '7px' }}>
                        <img src={img} style={{ height: '100px' }} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor>Hình Ảnh</label>
                    <input type="file" name="listimage" id="file-input" className="form-control" multiple accept="gif|jpg|png" />
                    <div id="preview" className="margin-top-20 pad-20" style={{ border: '1px solid #d1d3e2', borderRadius: '7px' }}>
                        <img src={img} style={{ height: '100px' }} />
                    </div>
                </div>
                <button className="btn btn-warning margin-top-20">Xác Nhận</button>
            </form>
        </div>
    )
}
