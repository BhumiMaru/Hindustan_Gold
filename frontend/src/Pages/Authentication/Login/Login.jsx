import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/Authentication/LoginContext";
import { useUIContext } from "../../../Context/UIContext";

const publicUrl = import.meta.env.VITE_PUBLIC_URL;

export default function Login() {
  const { setActiveMenu, setActiveSubMenu } = useUIContext();
  const { login, form, setForm } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 Submitting login form:", form);

    const result = await login(form);

    console.log("✅ Login result:", result);

    if (result) {
      sessionStorage.setItem("activeMenu", "Dashboard");
      sessionStorage.removeItem("activeSubMenu");
      setActiveMenu("Dashboard"); // directly update context
      setActiveSubMenu(null);
      navigate("/dashboard");
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href={`${publicUrl}assets/vendor/css/pages/page-auth.css`}
      />

      <div className="container-xxl">
        <div className="authentication-wrapper authentication-basic container-p-y">
          <div className="authentication-inner py-6">
            <div className="card">
              <div className="card-body">
                {/* Logo */}
                <div className="app-brand justify-content-center mb-6">
                  <div className="col-lg-12 text-center">
                    <img
                      src="assets/img/logo_vertical.png"
                      className="img-fluid"
                      alt="Logo"
                      style={{ maxWidth: "52%" }}
                    />
                  </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="········"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </div> */}

                  <div className="input-group input-group-merge has-validation">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="············"
                      aria-describedby="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                    <span
                      className="input-group-text cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i
                        className={`icon-base ti tabler-${
                          showPassword ? "eye" : "eye-off"
                        }`}
                      />
                    </span>
                  </div>

                  <div className="d-flex justify-content-between my-3">
                    <Link
                      to="/auth-forgot-password"
                      className="text-decoration-none"
                      onClick={() => setIsOtpStep(false)}
                    >
                      <p className="mb-0">Forgot Password?</p>
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary d-grid w-100"
                  >
                    Login
                  </button>
                </form>

                <div className="divider my-4">
                  <div className="divider-text">or</div>
                </div>

                <a
                  href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=059d71f7-f349-4155-8f21-9247f82c4c57&redirect_uri="
                  className="btn btn-info d-grid w-100 mt-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Login With AD
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
