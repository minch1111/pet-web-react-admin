import React,{useContext} from 'react'
import AddProduct from './components/AddProduct'
import WarehouseProducts from './components/WarehouseProducts'
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import EditProduct from './components/EditProduct'
import Brand from './components/Brand'
import AddBrand from './components/AddBrand'
import EditBrand from './components/EditBrand'
import Category from './components/Category'
import AddNewCategory from './components/AddCategory'
import AddSubCategory from './components/AddSubCategory'
import EditCategory from './components/EditCategory'
import { Context } from '../../App'


export default function WareHouseManage() {
    // console.log(`object`)
    let {user} = useContext(Context);
    if(user.idPermission!=='619dde04a858f214302c5d5c' && user.idPermission!=='61aed3c47812fa068eee6d4f') return <Redirect to="/" />
    return (
        <div className="container">
            <div className="row">
                <Switch >
                    {/* WareHouse Manager */}
                    <Route path="/warehouse-manage/add" component={AddProduct} />
                    <Route path="/warehouse-manage/edit/:slug" component={EditProduct} />
                    <Route path="/warehouse-manage" exact component={WarehouseProducts}/>
                    <Route path="/warehouse-manage/brand/add" component={AddBrand} />
                    <Route path="/warehouse-manage/brand/edit/:slug" component={EditBrand} />
                    <Route path="/warehouse-manage/brand" exact component={Brand} />
                    <Route path="/warehouse-manage/category" exact component={Category} />
                    <Route path="/warehouse-manage/category/add" component={AddNewCategory} />
                    <Route path="/warehouse-manage/category/edit/:slug" component={EditCategory} />
                    <Route path="/warehouse-manage/add-subcategory/:slug" component={AddSubCategory} />
                </Switch>
                {/* <AddProduct /> */}
                {/* <WarehouseProducts /> */}
            </div>
        </div>
    )
}
