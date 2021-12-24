import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'
// import ReportDateItem from './ReportDateItem'
// import Table from 'react-bootstrap/Table'
import { useParams } from 'react-router'
import mainManageService from '../../../services/mainManagerService'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
let $ = window.$



export default function ReportDetailMonth(props) {

  // const [dateReport, setDateReport] = useState(props.location.querry?.data || [])
  let { slug } = useParams()
  const [monthReport,setMonthReport] = useState()
  const [time,setTime] = useState()
  const customers = () => {
    let custs = []
    for (let i = 0; i <= 25; i++) {
      custs.push({firstName: `first${i}`, lastName: `last${i}`,
      email: `abc${i}@gmail.com`, address: `000${i} street city, ST`, zipcode: `0000${i}`});
    }
    return custs;
  }
  let cus = customers()


  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  useEffect(() => {
    $(document).ready(function () {
      $('#dataTable1').DataTable({
        // "dom": '<"toolbar">frtip'
      });
    });
  }, [])
  useEffect(async()=>{
    let res = await mainManageService.getReportByIdMonth(slug)
    if(res.success){
      await setMonthReport(res.orders)
      await setTime(res.time)
    }
  },[])
  const exportToCSV = (csvData, fileName) => {
    console.log(`csvData`, csvData)
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);
}


  // console.log(`props.location.querry?.data`, props.location.querry?.data)
  console.log(`monthReport`, monthReport)
  if(!monthReport) return <div className="col-lg-12 flex jusity-center"> Loading... </div>
  return (
    <>
      <div className="col-lg-12">
        <div className="flex">
          <Link to="/main-manager/report" className='btn btn-warning'>
          Quay lại
          </Link>
          <button className="btn btn-success ml-2" onClick={(e)=>{exportToCSV(monthReport,`thong-ke-doanh-thu-thang${time.month}-nam${time.year}`)}}>Xuất Excel</button>
        </div>
      </div>
      <div className="col-lg-12">
        <div class="table-responsive">
          <table class="table table-bordered" id="dataTable1" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th>Mã hoá đơn</th>
                <th>Khách hàng</th>
                <th>Ngày Nhận</th>
                <th>Tổng Tiền</th>
              </tr>
            </thead>
            <tbody>
             {
                monthReport.map((o,i)=>(
                 <tr key={i}>
                   <td> {o?._id} </td>
                   <td> {o?.nameRecieve}</td>
                   <td> {o?.dateOrder} </td>
                   <td> {o?.totalPrice} </td>
                 </tr>
               ))
             }
            </tbody>
          </table>
        </div>
      </div>

      <div className="col-lg-12">
        <div className="activities flex justify-end-center margin-bottom-20">
          <button className="btn btn-success" onClick={(e)=>{exportToCSV(monthReport,`thong-ke-doanh-thu-thang-${time.month}-nam${time.year}`)}}>Xuất Excel</button>
        </div>
      </div>
    </>
  )
}
