import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { useEffect } from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import mainManageService from '../../services/mainManagerService';
let $ = window.$

export default function Media() {
    const [listNews, setListNews] = useState()
    let [showEdit, setShowEdit] = useState(false)
    let [showAdd, setShowAdd] = useState(false)
    let [editNews, setEditNews] = useState()
    useEffect(async()=>{
        let res = await mainManageService.getListNews()
        await setListNews(res.news)
        $(document).ready(function () {
            $('#dataTable').DataTable();
        });
    },[])
    const turnOffAdd = () => {
        setShowAdd(false)
    }
    const loadAfterAction = async()=>{
        let res = await mainManageService.getListNews()
        await setListNews(res.news) 
    }

    const setNewsToEdit=(data)=>{
        // console.log('data :>> ', data);
        setShowAdd(false)
        setEditNews(data);
        setShowEdit(true)
    }
    const turnOffEdit = () => {
        setShowEdit(false)
    } 
    // console.log('listNews :>> ', listNews)
    if (!listNews) return <div className="col-lg-12 flex justify-center">Loading...</div>
	return (
		<>
			<div className="col-lg-12">
                <div className="activities flex justify-between margin-bottom-20">
                    <div className="addStaff">
                        <div className="btn btn-warning" onClick={()=>{setShowAdd(true); setShowEdit(false)}} >
                            Thêm mới Bài Viết
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
                                        <th>Tiêu Đề Bài Viết </th>
                                        <th>Hình ảnh</th>
                                        <th>Chỉnh sửa</th>
                                        <th>Xoá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {
                                       listNews?.map((o,i)=>(
                                           <NewsItem 
                                                key={i}
                                                number={i}
                                                data={o}
                                                setNewsToEdit={(data)=>setNewsToEdit(data)}
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
                showAdd?<AddNews
                    turnOffAdd={()=>turnOffAdd()}
                    loadAfterAction ={()=>loadAfterAction()}
                />:(showEdit&&<EditNews 
                    news ={editNews}
                    turnOffEdit ={()=>turnOffEdit()}
                />)
            }
		</>
	)
}

export const NewsItem=(props)=>{
    const del = async () => {
        let res = await mainManageService.removeStaff(props.data._id)
        if (res.success) {
            alert('đã xoá thành công ' + props.data.title);
            props.loadAfterEdit()
        }
    }
    return (
        <tr>
            <td> {props.number} </td>
            <td> {props.data.title} </td>
            <td className='w-200px'> <img className='w-100' src={props.data.image.url} alt="" /> </td>
            <td className="text-center"><Link to="#" className="btn-circle btn-warning " onClick={() => {props.setNewsToEdit(props.data)}} ><i className="far fa-edit font-size-20" /></Link></td>
            <td className="text-center" ><a href="#" className="btn-circle btn-danger" onClick={() => {del()}} ><i className="far fa-trash-alt font-size-20" /></a></td>
        </tr>
    )
}

export const AddNews =(props)=>{
	const [required,setRequired] = useState()
	const {form,error,setForm,handleSubmit,register} = useForm()
	const [editorState,setEditorState]=useState()

	useEffect(()=>{
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
                    // setImgPresent(this.result)
                });
                reader.readAsDataURL(file);
            }
        }

        $('#avatar-input').on("change", previewAvatar);
	},[])

	const onEditorStateChange = (editorState) => {
		// console.log(editorState)
		
		// console.log('editorState :>> ', draftToHtml(convertToRaw(editorState.getCurrentContent())));
		setEditorState(editorState)
		if (convertToRaw(editorState.getCurrentContent()).blocks.length === 1 & convertToRaw(editorState.getCurrentContent()).blocks[0].text === ''){
			setRequired('Bạn không được bỏ trống')
		}
		else{
			setForm({...form,content:draftToHtml(convertToRaw(editorState.getCurrentContent()))});
			setRequired()
		}
		
	  }
	  const handleChangeAvatar = (ev) => {

        Array.from(ev.target.files).forEach(file => {

            // Define a new file reader
            let reader = new FileReader();
            // Function to execute after loading the file
            reader.onload = () => {
                // list.push(reader.result)
                setForm({ ...form, image: reader.result })
            };
            // Read the file as a text
            reader.readAsDataURL(file);
        });
        // Array.from(ev.target.files).forEach(file=>{
        //     setForm({...form,imageRepresent:file.name})
        // })

    }
	  const submit = async ()=>{
		  if(!required){
			console.log('form :>> ', form);
			let res = await mainManageService.addNews(form);
			if(res.success) {alert(res.message);
            props.loadAfterAction()}
		  }
	  }
	  console.log('required :>> ', required);
	return(
		<form onSubmit={handleSubmit(submit)} className="col-md-4">
			<div className="card w-100">
                {/* <img className="card-img-top h-200px" src="/img/male-profile-picture-vector-1862205.jpg" alt="Card image cap" /> */}
                <div className="card-body">
                    <h5 className="card-title">Thông tin nhân viên</h5>
			<div className="form-group">
            	<label >Tiêu Đề Bài Viết</label>
            	<input type="text" className="form-control" placeholder="Nhập đẩy đủ họ và tên..." {...register('title', { required: true })} />
                    {
                        error.title && <small className="text-danger" > {error.title} </small>
                    }
            </div>
			<div className="form-group">
                <label >Tên tác giả</label>
                <input type="text" className="form-control" placeholder="Nhập đẩy đủ họ và tên..." {...register('author', { required: true })} />
                {
                    error.article && <small className="text-danger" > {error.article} </small>
            	}
            </div>
			<div class="form-group">
                <label for="">Ảnh Đại Diện Bai Viet</label>
                <input type="file" class="form-control" required id="avatar-input" onChange={handleChangeAvatar} accept="gif|jpg|png" />
                <div id="preview-avatar" className="margin-top-20 pad-20" style={{ border: '1px solid #d1d3e2', borderRadius: '7px' }}>
                    <p>No file chosen</p>
                </div>
            </div>
			<Editor
  				editorState={editorState}
  				toolbarClassName="toolbarClassName"
  				wrapperClassName="wrapperClassName"
  				editorClassName="editorClassName"
 	 			onEditorStateChange={onEditorStateChange}
				
				//   onChange={onEditorStateChange}
			/>
			{
				!form||required&&<small className='text-danger'> {required} </small>
			}
			        <br />
			        <button type='submit' onClick={()=>{if(!form){setRequired('Ban khong duoc bo trong')}}} className='btn btn-success' > Thêm </button>
                    <div className='btn btn-danger' style={{paddingLeft:'20px'}} onClick={()=>props.turnOffAdd()}> Hủy</div>
                </div>
			</div>
		</form>
	)
}

export const EditNews =(props)=>{
	const [required,setRequired] = useState()
	const {form,error,setForm,handleSubmit,register} = useForm()
	const [editorState,setEditorState]=useState()
    let checkImg = useRef()
    let checkChangeImg = useRef()

	useEffect(()=>{
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
                    // setImgPresent(this.result)
                });
                reader.readAsDataURL(file);
            }
        }

        $('#avatar-input').on("change", previewAvatar);
	},[])

    useEffect(() => {
        setForm({...props.news,image:null})
        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(props.news.content))))
    }, [props.news])
    console.log('form :>> ', form);

	const onEditorStateChange = (editorState) => {
		// console.log(editorState)
		
		// console.log('editorState :>> ', draftToHtml(convertToRaw(editorState.getCurrentContent())));
		setEditorState(editorState)
		if (convertToRaw(editorState.getCurrentContent()).blocks.length === 1 & convertToRaw(editorState.getCurrentContent()).blocks[0].text === ''){
			setRequired('Bạn không được bỏ trống')
		}
		else{
			setForm({...form,content:draftToHtml(convertToRaw(editorState.getCurrentContent()))});
			setRequired()
		}
		
	  }

      const handleChangeCheckAva=(ev)=>{
        let a = ev.currentTarget.checked
        if(a){
            checkChangeImg.current.disabled =false
        }
        else{
            checkChangeImg.current.disabled=true
        }
      }

	  const handleChangeAvatar = (ev) => {

        Array.from(ev.target.files).forEach(file => {

            // Define a new file reader
            let reader = new FileReader();
            // Function to execute after loading the file
            reader.onload = () => {
                // list.push(reader.result)
                setForm({ ...form, image: reader.result })
            };
            // Read the file as a text
            reader.readAsDataURL(file);
        });
        checkImg.current.disabled = true;
        // Array.from(ev.target.files).forEach(file=>{
        //     setForm({...form,imageRepresent:file.name})
        // })

    }
	  const submit = async ()=>{
		  if(!required){
			console.log('form :>> ', form);
			let res = await mainManageService.addNews(form);
			if(res.success) {alert(res.message)}
		  }
	  }
	//   console.log('required :>> ', required);
    console.log('editorState :>> ', editorState);
	return(
		<form onSubmit={handleSubmit(submit)} className="col-md-4">
			<div className="card w-100">
                {/* <img className="card-img-top h-200px" src="/img/male-profile-picture-vector-1862205.jpg" alt="Card image cap" /> */}
                <div className="card-body">
                    <h5 className="card-title">Thông tin nhân viên</h5>
			<div className="form-group">
            	<label >Tiêu Đề Bài Viết</label>
            	<input type="text" className="form-control" placeholder="Nhập đẩy đủ tieu de..." {...register('title', { required: true })} />
                    {
                        error.title && <small className="text-danger" > {error.title} </small>
                    }
            </div>
			<div className="form-group">
                <label >Tên tác giả</label>
                <input type="text" className="form-control" placeholder="Nhập đẩy đủ họ và tên..." {...register('author', { required: true })} />
                {
                    error.article && <small className="text-danger" > {error.article} </small>
            	}
            </div>
            <div className="form-check form-switch" >
                    <input className="form-check-input" onChange={handleChangeCheckAva} ref={checkImg} type="checkbox" id="flexSwitchCheckDefault" />
                    <label className="form-check-label" for="flexSwitchCheckDefault">Chỉnh sửa ảnh đại diện bai viet</label>
                </div>
			<div class="form-group">
                <label for="">Ảnh Dai Dien Bai Viet</label>
                <input type="file" class="form-control" required defaultValue={props?.news?.imgage?.url} id="avatar-input" disabled ref={checkChangeImg} onChange={handleChangeAvatar} accept="gif|jpg|png" />
                <div id="preview-avatar" className="margin-top-20 pad-20" style={{ border: '1px solid #d1d3e2', borderRadius: '7px' }}>
                    <img src={props.news.image.url} style={{width:'100%'}} alt="" />
                </div>
            </div>
			<Editor
                // defaultEditorState={editorState}
                // value={editorState}
  				editorState={editorState}
  				toolbarClassName="toolbarClassName"
  				wrapperClassName="wrapperClassName"
  				editorClassName="editorClassName"
 	 			onEditorStateChange={onEditorStateChange}
				
				//   onChange={onEditorStateChange}
			/>
			{
				!form||required&&<small className='text-danger'> {required} </small>
			}
			        <br />
			        <button type='submit' onClick={()=>{if(!form){setRequired('Ban khong duoc bo trong')}}} className='btn btn-success' > Thêm </button>
                    <div className='btn btn-danger' style={{paddingLeft:'20px'}} onClick={()=>props.turnOffEdit()}> Hủy</div>
                </div>
			</div>
		</form>
	)
}