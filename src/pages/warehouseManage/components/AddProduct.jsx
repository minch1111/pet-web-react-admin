import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import img from '../../../assets/img/pate.png'
import useForm from '../../../hooks/useForm'
import warehouseService from '../../../services/warehouseService'
import { Upload, Modal, Button } from 'antd'

let $ = window.$

export default function AddProduct() {


    let [imgPresent, setImgPresent] = useState()
    let [listImg, setListImg] = useState([])
    let list = []
    useEffect(() => {
        function previewImages() {

            var $preview = $('#preview').empty();
            if (this.files) $.each(this.files, readAndPreview);

            function readAndPreview(i, file) {
                if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
                    return alert(file.name + " is not an image");
                } // else...

                var reader = new FileReader();
                // if(file.size>5120)
                // {
                //     alert("Không thể tải ảnh này, vui lòng chọn ảnh khác")
                // }
                // else{
                    $(reader).on("load", function () {
                        $preview.append($("<img/>", { src: this.result, height: 100, margintLeft: 20 }));
                        // console.log(`this.result`, this.result)
                        list.push(this.result)
                        setListImg(list)
                        // setForm({...form,lisImage:list})
                    });
    
                    reader.readAsDataURL(file);
                // }
               

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

    // console.log(`img present without change`, imgPresent)
    let cateRef = useRef()
    let subRef = useRef()

    const [category, setCategory] = useState()
    // const [subCategory, setSubCategory] = useState()
    const [filterSubcategory, setFilterSubcategory] = useState([])
    const [filterBrand, setFilterBrand] = useState([])
    let { form, error, handleSubmit, register, setForm } = useForm()
    useEffect(async () => {
        let res = await warehouseService.getCategory();
        // let res2 = await warehouseService.getAllSubCategory();
        if (res.success) setCategory(res.category)
        // if (res2.success) setSubCategory(res2.subCategory)

    }, [])
    const handleChange = async (ev) => {
        if (cateRef.current) {
            if (cateRef.current.value !== "") {
                // console.log(`cateRef.current.value`, cateRef.current.value)
                let idCate = cateRef.current.value
                let subCate = await warehouseService.getSubCategoryByIdCate(idCate)
                await setFilterSubcategory(subCate.subCategory)
                // await console.log(`(subCate.subCategory`, subCate.subCategory)
                // await console.log(`(subCategory`, filterSubcategory)
            }
        }
    }
    const handleChangeSub = async (ev) => {
        if (subRef.current) {
            if (subRef.current.value !== "") {
                let idSub = subRef.current.value
                let brand = await warehouseService.getBrandByIdSub(idSub)
                await setFilterBrand(brand?.brand)
            }
        }
    }
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
            console.log(`file`, file)
            // if (file.size < 5120) {
                reader.onload = () => {
                    list.push(reader.result)
                };
                reader.readAsDataURL(file);
            
            // }
            // else{
            //     ev.currentTarget.value=null
            // }
            // console.log(`a`, a)
        });
        // Array.from(ev.target.files).forEach(file=>{
        //     console.log(`file`, URL.createObjectURL(file))
        //     // list.push(file.name)
        // })
        setForm({ ...form, listImage: list })
    }

    const submit = async () => {
        console.log(`form in Submit`, form)
        let res = await warehouseService.addNewProduct(form);
        await console.log(`res`, res)
        if (res.success) alert("Đã Thêm Thành Công 😄")
    }

    return (
        <div className="col-lg-12">
            <form onSubmit={handleSubmit(submit)} className="add-activity" enctype='multipart/form-data'>
                <div className="title margin-bottom-20 flex flex-align-center">
                    <Link to="/warehouse-manage" className="margin-right-20"><i className="fas fa-chevron-left text-success" /></Link>
                    <p className="text-uppercase text-success">Thêm mới sản phẩm</p>
                </div>
                <div className="form-group">
                    <label> Chọn Danh Mục </label>
                    <select className="form-select form-control" ref={cateRef} onClick={handleChange} name="idCate" required>
                        <option selected value="" ></option>
                        {
                            category !== null ?
                                category?.map((o, i) => (
                                    <option key={i} value={o._id}> {o.name} </option>
                                )) : (<p>Loading</p>)
                        }
                    </select>
                    {
                        error.idCate && <small className="text-danger"> {error.idCate} </small>
                    }
                </div>
                <div className="form-group">
                    <label> Chọn Danh Mục Con Đi Kèm</label>
                    <select className="form-select form-control" ref={subRef} onClick={handleChangeSub} name="idSub" required>
                        <option selected value="">--Danh Mục Đi Kèm--</option>
                        {
                            filterSubcategory !== null ?
                                filterSubcategory?.map((o, i) => (
                                    <option key={i} value={o._id} > {o.name} </option>
                                ))
                                : null
                        }
                    </select>
                    {
                        error.idSub && <small className="text-danger"> {error.idSub} </small>
                    }
                </div>
                <div className="form-group">
                    <label> Chọn Thương Hiệu</label>
                    <select className="form-select form-control" {...register('idBrand', { required: true })} >
                        <option selected>--Thương Hiệu--</option>
                        {
                            filterBrand !== null ?
                                filterBrand?.map((o, i) => (
                                    <option value={o._id} key={i}> {o.name} </option>
                                ))
                                : null
                        }
                    </select>
                    {
                        error.idBrand && <small className="text-danger"> {error.idBrand} </small>
                    }
                </div>
                <div className="form-group">
                    <label>Tên Sản Phẩm</label>
                    <input type="text" {...register('name', { required: true })} className="form-control" placeholder="Nhập tên sản phẩm" />
                    {
                        error.name && <small className="text-danger"> {error.name} </small>
                    }
                </div>
                <div className="form-group">
                    <label>Giá Mua</label>
                    <input type="number" {...register('real_price', { required: true })} className="form-control" placeholder="Nhập giá mua sản phẩm" min={0} />
                    {
                        error.real_price && <small className="text-danger"> {error.real_price} </small>
                    }
                </div>
                <div className="form-group">
                    <label>Giá Bán</label>
                    <input type="number" {...register('price', { required: true })} className="form-control" placeholder="Nhập giá bán sản phẩm" min={0} />
                    {
                        error.price && <small className="text-danger"> {error.price} </small>
                    }
                </div>
                <div className="form-group">
                    <label>Số lượng </label>
                    <input type="text" {...register('amountImport', { required: true })} className="form-control" placeholder="Nhập số lượng sản phẩm" min={0} />
                    {
                        error.quantity && <small className="text-danger"> {error.quantity} </small>
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Mô tả ngắn</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" {...register('short_description', { required: true })} rows={2} placeholder="Nhập mô tả ngắn..." />
                    {
                        error.short_description && <small className="text-danger"> {error.short_description} </small>
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Mô tả chi tiết</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" {...register('long_description', { required: true })} rows={3} placeholder="Nhập mô tả ..." />
                    {
                        error.long_description && <small className="text-danger"> {error.long_description} </small>
                    }
                </div>
                <div class="form-group">
                    <label for="">Ảnh Đại Diện Sản Phẩm</label>
                    <input type="file" class="form-control" required id="avatar-input" onChange={handleChangeAvatar} accept="gif|jpg|png" />
                    <div id="preview-avatar" className="margin-top-20 pad-20" style={{ border: '1px solid #d1d3e2', borderRadius: '7px' }}>
                        <p>No file chosen</p>
                    </div>
                </div>
                <div className="form-group">
                    <label >Hình Ảnh</label>
                    
                    <input type="file" id="file-input" onChange={handleChangeList} className="form-control btn-file" multiple accept="gif|jpg|png" />
                    
                    <div id="preview" className="margin-top-20 pad-20" style={{ border: '1px solid #d1d3e2', borderRadius: '7px' }}>
                        <p>No file chosen</p>
                    </div>

                </div>
                <button type="submit" className="btn btn-success btn-block">Thêm</button>
            </form>
        </div>
    )
}
