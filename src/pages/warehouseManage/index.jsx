import React from 'react'
import AddProduct from './components/AddProduct'
import WarehouseProducts from './components/WarehouseProducts'
import {
    Switch,
    Route
} from 'react-router-dom'
import EditProduct from './components/EditProduct'

export default function WareHouseManage() {
    return (
        <div className="container">
            <div className="row">
                <Switch >
                    <Route path="/warehouse-manage/add" component={EditProduct} />
                    <Route path="/warehouse-manage/edit" component={EditProduct} />
                    <Route path="/warehouse-manage" exact component={WarehouseProducts}/>
                </Switch>
                {/* <AddProduct /> */}
                {/* <WarehouseProducts /> */}
            </div>
        </div>
    )
}
