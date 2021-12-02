import React from 'react'
import { Route, Switch } from 'react-router'
import ListStaff from './components/ListStaff'
import ReportDetailMonth from './components/ReportDetailMonth'
import ReportSale from './components/ReportSale'

export default function MainManage() {
    return (
        <div className="container">
            <div className="row">
                <Switch>
                    <Route path="/main-manager/report" exact component={ReportSale} />
                    <Route path="/main-manager/report/:slug" exact component={ReportDetailMonth} />

                    <Route path="/main-manager/staffs" exact component={ListStaff} /> 
                </Switch>
                
            </div>
        </div>
    )
}
