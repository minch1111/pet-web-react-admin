import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import img from "../../../assets/img/pate.png"
import wareHouseService from '../../../services/warehouseService'
import useForm from '../../../hooks/useForm'
let $ = window.$

export default function EditProduct() {
    let list =[]
    let [imgPresent, setImgPresent] = useState()
    let [listImg, setListImg] = useState([])

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
                    $preview.append($("<img/>", { src: this.result, height: 100, marginLeft: 20 }));
                    // console.log(`this.result`, this.result)
                    list.push(this.result)
                    setListImg(list)
                    // setForm({...form,lisImage:list})
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
                // console.log(`file`, reader.readAsDataURL)
                var reader = new FileReader();

                $(reader).on("load", function () {
                    $preview.append($("<img/>", { src: this.result, height: 100 }));
                    // console.log(`this.result`, this.result)
                    setImgPresent(this.result)
                });
                reader.readAsDataURL(file);
            }
        }

        $('#avatar-input').on("change", previewAvatar);
    }, [])

    let { form, error, handleSubmit, register, setForm } = useForm()
    let check = useRef()
    let checkAva = useRef()
    let checkList = useRef()
    let listCheck=useRef()
    // let list = []

    let { slug } = useParams()
    let [detail, setDetail] = useState()
    const handleChangeAvatar = (ev) => {

        Array.from(ev.target.files).forEach(file => {

            // Define a new file reader
            let reader = new FileReader();
            // Function to execute after loading the file
            reader.onload = () => {
                // list.push(reader.result)
                setForm({ ...form, imageRepresent: reader.result })
            };
            // Read the file as a text
            reader.readAsDataURL(file);
        });
        checkAva.current.disabled=true
        
        // Array.from(ev.target.files).forEach(file=>{
        //     setForm({...form,imageRepresent:file.name})
        // })

    }

    const handleChangeList = (ev) => {
        // setForm({...form,listImg:list})
        Array.from(ev.target.files).forEach(file => {
            // Define a new file reader
            let reader = new FileReader();
            // Function to execute after loading the file
            reader.onload = () => {
                list.push(reader.result)
            };
            reader.readAsDataURL(file);
            // console.log(`a`, a)
        });
        // Array.from(ev.target.files).forEach(file=>{
        //     console.log(`file`, URL.createObjectURL(file))
        //     // list.push(file.name)
        // })
        setForm({ ...form, listImage: list })
        checkList.current.disabled=true
    }
    const handleChangeCheckAva = (ev) => {
        let a = ev.currentTarget.checked
        // console.log(`ev.currentTarget.checked`, ev.currentTarget.checked)
        if (a) {
            check.current.disabled = false
        } else {
            check.current.disabled = true
        }
    }
    const handleChangeCheckList = (ev) => {
        let a = ev.currentTarget.checked
        // console.log(`ev.currentTarget.checked`, ev.currentTarget.checked)
        if (a) {
            listCheck.current.disabled = false
        } else {
            listCheck.current.disabled = true
        }
    }
    useEffect(async () => {
        let res = await wareHouseService.getProductDetailBySlug(slug)
        if (res.product) {
            setForm({
                ...form,
                name: res.product.name,
                price: res.product.price,
                short_description:res.product.short_description,
                long_description:res.product.long_description,
                imageRepresent: null,
                listImage: [],
                slug: slug
            })
            setDetail(res.product)
        }
    }, [])
    // console.log(`list`, list)
    // console.log("render")
    const submit = async () => {
        console.log(`form`, form)
        let res = await wareHouseService.updateProduct(form,slug);
        if(res.success) alert("Đã Cập Nhật Thành Công 😄")
        await console.log(`res`, res)
    }
    if (!form) return <div className="col-lg-12 flex justify-center">Loading...</div>
    return (
        <div className="col-lg-12">
            <form onSubmit={handleSubmit(submit)} className="edit-activity">
                <div className="edit-title flex flex-align-center">
                    <Link to="/warehouse-manage"><i className="fas fa-chevron-left text-warning margin-right-20" /></Link>
                    <p className="text-uppercase text-warning margin-0">Chỉnh sửa thông tin sản phẩm</p>
                </div>
                <div className="form-group">
                    <label> Nhãn Hiệu </label>
                    <input type="text" className="form-control" disabled defaultValue={detail?.brand?.name} />
                </div>
                <div className="form-group">
                    <label htmlFor>Tên Sản Phẩm</label>
                    <input type="text" {...register('name', { required: true })} className="form-control" defaultValue="Tên Sản Phẩm" />
                </div>
                <div className="form-group">
                    <label htmlFor>Giá Bán</label>
                    <input type="number" className="form-control" {...register('price', { required: true })} />
                </div>
                <div className="form-check form-switch" >
                    <input className="form-check-input" onChange={handleChangeCheckAva} ref={checkAva} type="checkbox" id="flexSwitchCheckDefault" />
                    <label className="form-check-label" for="flexSwitchCheckDefault">Chỉnh sửa ảnh đại diện sản phẩm</label>
                </div>
                <div className="form-group">
                    <label for="">Ảnh Đại Diện Sản Phẩm</label>
                    <input type="file" onChange={handleChangeAvatar} ref={check} disabled class="form-control" id="avatar-input" accept="gif|jpg|png" />
                    <div id="preview-avatar" className="margin-top-20 pad-20" style={{ border: '1px solid #d1d3e2', borderRadius: '7px' }}>
                        <img src={detail?.imageRepresent[0]?.url} style={{ height: '100px' }} />
                    </div>
                </div>
                <div className="form-check form-switch" >
                    <input className="form-check-input" onChange={handleChangeCheckList} ref={checkList} type="checkbox" id="flexSwitchCheckDefault" />
                    <label className="form-check-label" for="flexSwitchCheckDefault">Chỉnh sửa danh sách hình ảnh sản phẩm</label>
                </div>
                <div className="form-group">
                    <label htmlFor>Danh sách Hình Ảnh</label>
                    <input type="file" onChange={handleChangeList} id="file-input" ref={listCheck} disabled className="form-control" multiple accept="gif|jpg|png" />
                    <div id="preview" className="margin-top-20 pad-20" style={{ border: '1px solid #d1d3e2', borderRadius: '7px' }}>
                        {
                            detail?.listImage?.map(o => (
                                <img src={o?.image[0]?.url} style={{ height: '100px' }} />
                            ))
                        }
                    </div>
                </div>
                <button type="submit" className="btn btn-warning margin-top-20">Xác Nhận</button>
            </form>
        </div>
    )
}
