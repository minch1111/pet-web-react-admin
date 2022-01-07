import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useForm from "../../../hooks/useForm"
import mainManageService from '../../../services/mainManagerService'



export default function ReportSale() {
    const [showAdd, setShowAdd] = useState(false)
    const [listReport, setListReport] = useState()
    useEffect(async () => {
        let res = await mainManageService.getAllReport()
        if (res.success) {
            setListReport(res.reports)
        }
    }, [])
    const turnOffForm = () => {
        setShowAdd(false)
    }
    const reload = async () => {
        let res = await mainManageService.getAllReport()
        if (res.success) {
            setListReport(res.reports)
        }
    }
    const remove =async (id)=>{
        let res =await mainManageService.removeReport(id)
        if(res.success) reload()
    }
    return (
        <>
            <div className="col-lg-12">
                <div className="activities flex justify-between margin-bottom-20">
                    <div className="addProduct">
                        <div onClick={() => { setShowAdd(true) }} className="btn btn-warning">
                            Thêm mới báo cáo
                        </div>
                    </div>
                    {/* <div>
                        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                            <div className="input-group">
                                <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-secondary" type="button">
                                        <i className="fas fa-search fa-sm" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div> */}
                </div>
            </div>
            {
                showAdd === true && <AddReport
                    turnOffForm={turnOffForm}
                />

            }

            {
                listReport && listReport.map((o, i) => (
                    <ReportMonth
                        data={o}
                        key={i}
                        remove ={(id)=> remove(id)}
                    />
                ))
            }




        </>
    )
}

export const AddReport = (props) => {

    let { form, error, handleSubmit, register } = useForm()
    const submit = async () => {
        let res = await mainManageService.addNewReport(form);
    }
    return (
        <div className="col mb-2">
            <div class="card">
                <form onSubmit={handleSubmit(submit)} class="card-body">
                    <h3 class="card-title">Thêm mới doanh thu</h3>
                    <div class="form-group">
                        <label for="date">Chọn tháng báo cáo</label>
                        <input type="month" {...register('monthYear', { required: true })} id="date" class="form-control" />
                        {
                            error.monthYear && <small className='text-error'> {error.monthYear} </small>
                        }
                        {/* <small id="helpId" class="text-muted">Help text</small> */}
                    </div>
                    <button type='submit' className='btn btn-success'> Thêm </button>
                    <div className="btn btn-danger ml-2" onClick={() => props.turnOffForm()}>Huỷ</div>
                </form>
            </div>
        </div>
    )
}

export const ReportMonth = (props) => {
    return (
        <div className="col-lg-4" >
            <div className="month_report">
                <div className="month pad-10">
                    <h3>Tháng {props?.data?.month}</h3>
                    <h5>Năm {props?.data?.year} </h5>
                </div>
                <div className="month_report-action pad-20">
                    <Link className="btn-circle btn-primary product_action-edit margin-0-20 " to={`/main-manager/report/${props?.data?._id}`}>
                        <i className="fas fa-eye font-size-20"></i>
                    </Link>
                    <div t className="btn-circle btn-danger product_action-remove margin-0-20" onClick={()=>props.remove(props.data._id)}>
                        <i className="far fa-trash-alt font-size-20" />
                    </div>
                </div>
            </div>
        </div>
    )
}
