import React from "react";
import Pages from './Layout/Pages'
import { Link } from "react-router-dom";

const SignInPage = () => {
  return (
    <Pages
    pageContent={(
        <div className="fixed inset-0 flex items-center lg:p-0 p-2 justify-center bg-black bg-opacity-50">

    <main className="flex justify-center items-center align-middle w-100">
      <div className="container d-flex flex-column">
        <div className="row">
          <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">

              

              <div className="card rounded-[15px]" style={{    boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.1)'}}>
                <div className="card-body ">
                  <div className="m-sm-4">
                  <div className="text-center mt-4">
                <h1 className="h2">Welcome back, Admin</h1>
                <p className="lead">
                  Sign in to your account to continue
                </p>
              </div>
                    <form>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input className="form-control form-control-lg" type="email" name="email" placeholder="Enter your email" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input className="form-control form-control-lg" type="password" name="password" placeholder="Enter your password" />
                        <small>
                          <Link to="/Forgotpass">Forgot password?</Link>
                        </small>
                      </div>
                      <div>
                        <label className="form-check">
                          <input className="form-check-input" type="checkbox" value="remember-me" name="remember-me" checked />
                          <span className="form-check-label">
                            Remember me next time
                          </span>
                        </label>
                      </div>
                      <div className="text-center mt-3">
                        
                       <Link to="/Dashboard"> <button type="submit" className="btn btn-lg btn-primary">Sign in</button></Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
    </div>
  )}/>
  );
};

export default SignInPage;
