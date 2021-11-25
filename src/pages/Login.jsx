import React, { useContext } from 'react'
import { Context } from '../App'
import useForm from '../hooks/useForm'

export default function Login() {
    let{form,error,handleSubmit,register} = useForm()
    let {login,loginError} = useContext(Context);
    const submit =()=>{
        login(form)
    }
    return (
        <div className="container">
            {/* Outer Row */}
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            {/* Nested Row within Card Body */}
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Welcome to Pet Paradise Administrator!</h1>
                                        </div>
                                        <form onSubmit={handleSubmit(submit)} className="user">
                                            {
                                                loginError&& <label className="text-danger" > {loginError} </label>   
                                            }
                                            <div className="form-group">
                                                <input type="text" className="form-control form-control-user" {...register('username',{required:true})} placeholder="Enter Username..." />
                                                {
                                                    error.username&&<small className="text-danger"> {error.username} </small>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-user" {...register('password',{required:true})} placeholder="Password" />
                                                {
                                                    error.password&&<small className="text-danger"> {error.password} </small>
                                                }
                                            </div>
                                            {/* <div className="form-group">
                                                <div className="custom-control custom-checkbox small">
                                                    <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                    <label className="custom-control-label" htmlFor="customCheck">Remember
                                                        Me</label>
                                                </div>
                                            </div> */}
                                            <button type="submit" className="btn btn-primary btn-user btn-block">
                                                Login
                                            </button>
                                            <hr />
                                        </form>
                                        {/* <div className="text-center">
                                            <a className="small" href="forgot-password.html">Forgot Password?</a>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
