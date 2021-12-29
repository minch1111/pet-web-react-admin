import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { Context } from '../../App'
import ListStaff from './components/ListStaff'
import Permission from './components/Permission'
import ReportDetailMonth from './components/ReportDetailMonth'
import ReportSale from './components/ReportSale'
import Vouchers from './components/Vouchers'

export default function MainManage() {
    let {user} = useContext(Context);
    if(user.idPermission!=='61aed3c47812fa068eee6d4f') return <Redirect to="/" />
    return (
        <div className="container-fluid">
            <div className="row">
                <Switch>
                    <Route path="/main-manager/report" exact component={ReportSale} />
                    <Route path="/main-manager/report/:slug" exact component={ReportDetailMonth} />

                    <Route path="/main-manager/staffs" exact component={ListStaff} />

                    <Route path="/main-manager/vouchers" exact component={Vouchers} />

                    <Route path="/main-manager/permission" exact component={Permission} />
                </Switch>

            </div>
        </div>
    )
}
