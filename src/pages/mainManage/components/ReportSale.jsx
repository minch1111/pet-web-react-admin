import React from 'react'
import { Link } from 'react-router-dom'

export default function ReportSale() {
    const sale = [
        {

            month: "10",
            year: "2021",
            slug: "thang-10",
            saled:
                [
                    {
                        date: "23",
                        productSaled: [
                            {
                                name: "Pet Choy đồ ăn cho chó",
                                price: 50000,
                                num: 2,
                            },
                            {
                                name: "Pet Choy đồ ăn cho cá",
                                price: 10000,
                                num: 3,
                            }
                        ]
                    },
                    {
                        date: "24",
                        productSaled: [
                            {
                                name: "Pet Choy đồ ăn cho chó",
                                price: 50000,
                                num: 3,
                            },
                            {
                                name: "Pet Choy đồ ăn cho cá",
                                price: 10000,
                                num: 3,
                            }
                        ]
                    }
                ],


        },
        {

            month: "11",
            year: "2021",
            saled: [
            ]

        },
    ]



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
                sale.map((o, i) => (
                    <div className="col-lg-4" key={i}>
                        <div className="month_report">
                            <div className="month pad-10">
                                <h3>Tháng {o.month}</h3>
                                <h5>Năm {o.year}</h5>
                            </div>
                            <div className="month_report-action pad-20">
                                <Link className="btn-circle btn-primary product_action-edit margin-0-20 " to={{ pathname: `/main-manager/report/${o.slug}`, querry: { data: o.saled } }}>
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
        </>
    )
}
