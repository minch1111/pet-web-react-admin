import React from 'react'
import AddProduct from './components/AddProduct'
import WarehouseProducts from './components/WarehouseProducts'
import {
    Switch,
    Route
} from 'react-router-dom'
import EditProduct from './components/EditProduct'
import Brand from './components/Brand'
import AddBrand from './components/AddBrand'
import EditBrand from './components/EditBrand'
import Category from './components/Category'
import AddNewCategory from './components/AddCategory'
import AddSubCategory from './components/AddSubCategory'

export default function WareHouseManage() {
    // console.log(`object`)
    return (
        <div className="container">
            <div className="row">
                <Switch >
                    <Route path="/warehouse-manage/add" component={AddProduct} />
                    <Route path="/warehouse-manage/edit" component={EditProduct} />
                    <Route path="/warehouse-manage" exact component={WarehouseProducts}/>
                    <Route path="/warehouse-manage/brand/add" component={AddBrand} />
                    <Route path="/warehouse-manage/brand/edit/:slug" component={EditBrand} />
                    <Route path="/warehouse-manage/brand" exact component={Brand} />
                    <Route path="/warehouse-manage/category" exact component={Category} />
                    <Route path="/warehouse-manage/category/add" component={AddNewCategory} />
                    <Route path="/warehouse-manage/add-subcategory/:slug" component={AddSubCategory} />
                </Switch>
                {/* <AddProduct /> */}
                {/* <WarehouseProducts /> */}
            </div>
        </div>
    )
}
