import React, { useState } from "react";
import Pages from './Layout/Pages';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [formlogin, setFormLogin] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const navigate= useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormLogin((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/admin/adminLogin', formlogin);

      if (response.data.success) {
        alert('Login successful!');
        navigate('/Dashboard');
      } else {
        setLoginError('Invalid email or password.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError('An error occurred during login.');
    }
  };
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
                        <input className="form-control form-control-lg" type="email" name="email" placeholder="Enter your email" onChange={handleChange}/>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input className="form-control form-control-lg" type="password" name="password" placeholder="Enter your password" onChange={handleChange} />
                        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                        <small>
                          <Link to="/Forgotpass">Forgot password?</Link>
                        </small>
                      </div>
                      {/* <div>
                        <label className="form-check">
                          <input className="form-check-input" type="checkbox" value="remember-me" name="remember-me" checked />
                          <span className="form-check-label">
                            Remember me next time
                          </span>
                        </label>
                      </div> */}
                      <div className="text-center mt-3">
                        
                       <button type="submit" className="btn btn-lg btn-primary" onClick={handleLoginSubmit}>Sign in</button>  
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
