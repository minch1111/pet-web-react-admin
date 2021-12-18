import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/img/logoPet.png"
let $ = window.$
export default function Nav() {

    useEffect(() => {

        $('#sidebarToggle').on('click', () => {
            document.querySelector('.accordion').classList.toggle('toggled')
        })


    }, [])
    return (
        <>
            < ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar" >
                {/* Sidebar - Brand */}
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/" >
                    <div className="sidebar-brand-icon">
                        <img src={logo} alt="" style={{ width: '24px' }} />
                    </div>
                    <div className="sidebar-brand-text mx-3">PET PARADISE</div>
                </Link>
                {/* Divider */}
                < hr className="sidebar-divider my-0" />
                {/* Nav Item - Dashboard */}
                <li li className="nav-item active" >
                    <Link className="nav-link" to="/">
                        <i class="fas fa-pager"></i>
                        <span>Home</span></Link>
                </li >
                {/* Divider */}
                < hr className="sidebar-divider" />
                {/* Heading */}
                <div div className="sidebar-heading" >
                    Chức vụ
                </div >
                {/* Nav Item - Pages Collapse Menu */}
                <li li className="nav-item" >
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        <i class="fas fa-tasks"></i>
                        <span>Quản Lý</span>
                    </a>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Tasks:</h6>
                            <Link  className="collapse-item" to="/main-manager/staffs">Nhân Viên</Link>
                            <Link className="collapse-item" to="/main-manager/permission">Chức vụ</Link>
                            <Link className="collapse-item" to="/main-manager/report">Thu Chi</Link>
                            <Link className="collapse-item" to="/main-manager/vouchers" > Voucher </Link>

                        </div>
                    </div>
                </li >
                {/* Nav Item - Utilities Collapse Menu */}
                <li li className="nav-item" >
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                        <i class="fas fa-boxes"></i>
                        <span>Quản Lý Kho Hàng</span>
                    </a>
                    <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Tasks:</h6>
                            <Link className="collapse-item" to="/warehouse-manage/brand">Nhãn Hiệu</Link>
                            <Link className="collapse-item" to="/warehouse-manage">Sản Phẩm</Link>
                            <Link className="collapse-item" to="/warehouse-manage/category">Danh Mục</Link>
                        </div>
                    </div>
                </li >
                {/* Nav Item - Pages Collapse Menu */}
                <li li className="nav-item" >
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                        <i class="fas fa-user-tag"></i>
                        <span>Nhân Viên Quầy</span>
                    </a>
                    <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Tasks:</h6>
                            <Link className="collapse-item" to="/staff">Danh sách Đơn hàng</Link>
                        </div>
                    </div>
                </li >
                <li li className="nav-item" >
                    <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePage" aria-expanded="true" aria-controls="collapsePages">
                        <i class="fas fa-ad"></i>
                        <span>Nhân Viên Truyền Thông</span>
                    </a>
                    <div id="collapsePage" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Tasks:</h6>
                                <Link className="collapse-item" to="/media">Bài Đăng</Link>
                                <Link className="collapse-item" to="#"> Đánh giá </Link>
                            </div>
                        </div>
                    </div>
                </li >
                <br />
                <div class="text-center d-none d-md-inline">
                    <button class="rounded-circle border-0" id="sidebarToggle"></button>
                </div>
                {/* Sidebar Message */}
                {/* <div class="sidebar-card d-none d-lg-flex">
              <img class="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="...">
              <p class="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium features, components, and more!</p>
              <a class="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</a>
          </div> */}
            </ul >

        </>
    )
}
