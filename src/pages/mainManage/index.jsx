import React from 'react'
import { Route, Switch } from 'react-router'
import ListStaff from './components/ListStaff'
import Permission from './components/Permission'
import ReportDetailMonth from './components/ReportDetailMonth'
import ReportSale from './components/ReportSale'
import Vouchers from './components/Vouchers'

export default function MainManage() {
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
