import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import img from "../../../assets/img/pate.png"
import wareHouseService from '../../../services/warehouseService'
import BrandItem from './BrandItem'

export default function Brand() {
    let a = []
    let [brands, setBrands] = useState()
    let [filter, setFilter] = useState()
    let [subCategory, setSubCategory] = useState()
    useEffect(async () => {
        let res = await wareHouseService.getBrand();
        let res2 = await wareHouseService.getAllSubCategory();
        if (res) { setBrands(res); setFilter(res) }
        if (res2.success) setSubCategory(res2.subCategory)
    }, [])
    const del = async () => {
        let res = await wareHouseService.getBrand();
        if (res) {
            setBrands(res);
            setFilter(res)
        }
    }
    const handleChange = (ev) => {
        let idSubTarget = ev.currentTarget.value
        if (idSubTarget === "") {
            setFilter(brands)
        }
        else {
            a = brands.filter(o =>
                o.idSub == idSubTarget
            )
            setFilter(a)
        }

        console.log(`idSubTarget`, idSubTarget)
    }
    // console.log(`a`, a)
    console.log(`brands`, brands)
    console.log(`subCategory`, subCategory)
    // if (!brands && !subCategory) return <div className="col-lg-12 flex justify-center">Loading...</div>
    return (
        <>
            <div className="col-lg-12">
                <div className="activities flex justify-between margin-bottom-20">
                    <div className="addProduct">
                        <Link className="btn btn-warning" to="/warehouse-manage/brand/add">
                            Thêm mới nhãn hiệu
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
                    <div className="form-group">
                        <select class="form-select form-control" onChange={handleChange} >
                            <option selected value="">Tìm kiếm theo danh mục</option>
                            {
                                subCategory?.map((o, i) => (
                                    <option key={i} value={o._id}>{o.name}</option>
                                ))
                            }
                            {/* <option value="do-an-cho-cho">Đồ ăn cho chó</option>
                        <option value="do-an-cho-meo">Đồ ăn cho mèo</option>
                        <option value="3">Three</option> */}
                        </select>
                    </div>
                </div>
            </div>

            {
                filter?.map((o, i) => (
                    <BrandItem
                        key={i}
                        data={o}
                        del={() => del()}
                    />
                ))
            }

        </>
    )
}
