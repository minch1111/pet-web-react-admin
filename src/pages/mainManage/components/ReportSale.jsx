import React, { useState ,useEffect} from 'react'
import { Link } from 'react-router-dom'
import useForm from "../../../hooks/useForm"
import mainManageService from '../../../services/mainManagerService'



export default function ReportSale() {
    const [showAdd, setShowAdd] = useState(true)
    const [listReport,setListReport]=useState()
    useEffect(async () => {
        let res = await mainManageService.getAllReport()
        if(res.success){
            setListReport(res.reports)
        }
    }, [])

    return (
        <>
            <div className="col-lg-12">
                <div className="activities flex justify-between margin-bottom-20">
                    <div className="addProduct">
                        <Link className="btn btn-warning" to="#">
                            Thêm mới báo cáo
                        </Link>
                    </div>
                    <div>
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
                    </div>
                </div>
            </div>


            {
                listReport&&listReport.map((o,i)=>(
                    <div className="col-lg-4" key={i}>
                <div className="month_report">
                    <div className="month pad-10">
                        <h3>Tháng {o.month}</h3>
                        <h5>Năm {o.year} </h5>
                    </div>
                    <div className="month_report-action pad-20">
                        <Link className="btn-circle btn-primary product_action-edit margin-0-20 " to={`/main-manager/report/${o._id}`}>
                            <i className="fas fa-eye font-size-20"></i>
                        </Link>
                        <Link to="#" className="btn-circle btn-danger product_action-remove margin-0-20">
                            <i className="far fa-trash-alt font-size-20" />
                        </Link>
                    </div>
                </div>
            </div>
                ))
            }

            {
                showAdd && <AddReport />

            }


        </>
    )
}

export const AddReport = () => {

    let { form, error, handleSubmit, register } = useForm()
    const submit =async ()=>{
        let res = await mainManageService.addNewReport(form);

    }
    return (
        <div className="col">
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
                </form>
            </div>
        </div>
    )
}
