import React from 'react'
import { useRouteMatch } from 'react-router'
import { Link } from 'react-router-dom';
import { convertObjectToQuery } from '../utils';
import { convertQueryToObject } from '../utils';

export default function Pagination({ totalPage, currentPage = 1 }) {



    let { path, url } = useRouteMatch();

    function renderPage() {
        if (totalPage === 1) return []

        //current page = 6
        let start = currentPage - 2;
        if (start < 1) start = 1

        let end = currentPage + 2
        if (end > totalPage) {
            end = totalPage;
            start = end - 4;

            if (start < 1) start = 1
        }

        let list = []
        for (let i = start; i <= end; i++) {
            let queryURL = convertQueryToObject()
            queryURL.page = i;
            let queryString = convertObjectToQuery(queryURL);

            list.push(<li className={`page-item ${currentPage === i ? 'active' : ''} `} key={i}>
                <Link className="page-link" to={`${url}?${queryString}`}> {i} </Link>
            </li>)
        }
        return list
    }



    let objURL = convertQueryToObject();

    return (
        <nav className="d-flex justify-content-center justify-content-md-end">
            <ul className="pagination pagination-sm text-gray-400">
                {
                    currentPage > 1 && <li className="page-item">
                        <Link className="page-link page-link-arrow" to={`${path}?${convertObjectToQuery({ ...objURL, page: currentPage - 1 })}`}>
                            <i class="fas fa-chevron-left"></i>
                        </Link>
                    </li>
                }
                {
                    renderPage()
                }
                {
                    currentPage < totalPage && <li className="page-item">
                        <Link className="page-link page-link-arrow" to={`${path}?${convertObjectToQuery({ ...objURL, page: currentPage + 1 })}`}>
                            <i className="fa fa-caret-right" />
                        </Link>
                    </li>
                }

                {/* <li className="page-item">
                    <a className="page-link page-link-arrow" href="#">
                        <i className="fa fa-caret-left" />
                    </a>
                </li>
                <li className="page-item active">
                    <a className="page-link" href="#">1</a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">2</a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">3</a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">4</a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">5</a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">6</a>
                </li>
                <li className="page-item">
                    <a className="page-link page-link-arrow" href="#">
                        <i className="fa fa-caret-right" />
                    </a>
                </li> */}
            </ul>
        </nav>
    )
}
