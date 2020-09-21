import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import logo from "../assets/images/endless-logo.png"
import man from "../assets/images/dashboard/user.png"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { useCookies } from "react-cookie"
import { withRouter } from "react-router"
import { message } from "antd"
import app, {
  googleProvider,
  facebookProvider,
  twitterProvider,
  githubProvider
} from "../data/base"

import Cookie from "js-cookie"
import { userData } from "../actions/userAction"
import { useDispatch } from "react-redux"

const Signin = ({ history }) => {
  const [email, setEmail] = useState("admin@withing.co.kr")
  const [password, setPassword] = useState("Rhksflwk1!")

  const [cookies, setCookie] = useCookies(["logainToken"])
  const history1 = useHistory()
  const dispatch = useDispatch()

  const [value, setValue] = useState(localStorage.getItem("profileURL" || man))

  useEffect(() => {
    if (value !== null) localStorage.setItem("profileURL", value)
    else localStorage.setItem("profileURL", man)
  }, [value])

  const loginAuth = async () => {
    if (email.length <= 0) {
      message.warning("아이디를 이메일 형식으로 입력해주세요")
      return
    }
    if (password.length <= 0) {
      message.warning("비밀번호를 입력해주세요")
      return
    }
    try {
      const data = await dispatch(userData(email, password))
      if (data.payload) {
        Cookie.set("token", data.payload)
        history.push("/userlist")

        if (data.payload) {
          Cookie.set("token", data.payload)
          message.success("접속에 성공하였습니다")
          history.push("/userlist")
        }
      } else {
      }
    } catch (error) {
      message.warning("아이디와 비밀번호가 일치하지않습니다")
      history.push("/")
      setEmail([""])
      setPassword([""])
    }
  }

  //un-comment this loginAuth Function when u want use login with firebase only
  // const loginAuth = async () => {
  //     try {
  //         await app
  //             .auth()
  //             .signInWithEmailAndPassword(email, password);
  //         setValue(man);
  //         history.push(`${process.env.PUBLIC_URL}/dashboard/default`);

  //     } catch (error) {
  //         setTimeout(() => {
  //             toast.error("Oppss.. The password is invalid or the user does not have a password.");
  //         }, 200);
  //     }
  // }

  const googleAuth = async () => {
    try {
      app
        .auth()
        .signInWithPopup(googleProvider)
        .then(function(result) {
          setValue(result.user.photoURL)
          setTimeout(() => {
            history.push(`${process.env.PUBLIC_URL}/dashboard/default`)
          }, 200)
        })
    } catch (error) {
      setTimeout(() => {
        toast.error(
          "Oppss.. The password is invalid or the user does not have a password."
        )
      }, 200)
    }
  }

  const facebookAuth = async () => {
    try {
      app
        .auth()
        .signInWithPopup(facebookProvider)
        .then(function(result) {
          setValue(result.user.photoURL)
          setTimeout(() => {
            history.push(`${process.env.PUBLIC_URL}/dashboard/default`)
          }, 200)
        })
    } catch (error) {
      setTimeout(() => {
        toast.error(
          "Oppss.. The password is invalid or the user does not have a password."
        )
      }, 200)
    }
  }
  const twitterAuth = async () => {
    try {
      app
        .auth()
        .signInWithPopup(twitterProvider)
        .then(function(result) {
          setValue(result.user.photoURL)
          setTimeout(() => {
            history.push(`${process.env.PUBLIC_URL}/dashboard/default`)
          }, 200)
        })
    } catch (error) {
      setTimeout(() => {
        toast.error(
          "Oppss.. The password is invalid or the user does not have a password."
        )
      }, 200)
    }
  }
  const githubAuth = async () => {
    try {
      app
        .auth()
        .signInWithPopup(githubProvider)
        .then(function(result) {
          setValue(result.user.photoURL)
          setTimeout(() => {
            history.push(`${process.env.PUBLIC_URL}/dashboard/default`)
          }, 200)
        })
    } catch (error) {
      setTimeout(() => {
        toast.error(
          "Oppss.. The password is invalid or the user does not have a password."
        )
      }, 200)
    }
  }

  return (
    <div>
      <div className="page-wrapper">
        <div className="container-fluid p-0">
          {/* <!-- login page start--> */}
          <div className="authentication-main">
            <div className="row">
              <div className="col-md-12">
                <div className="auth-innerright">
                  <div className="authentication-box">
                    <div className="text-center">
                      <img src={logo} alt="" />
                    </div>
                    <div className="card mt-4">
                      <div className="card-body">
                        <div className="text-center">
                          <h4>관리자 로그인</h4>
                          <h6>아이디와 비밀번호를 입력해주세요</h6>
                        </div>
                        <form className="theme-form">
                          <div className="form-group">
                            <label className="col-form-label pt-0">
                              아이디
                            </label>
                            <input
                              className="form-control"
                              type="email"
                              name="email"
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                              onKeyDown={e => {
                                if (e.key === "Enter") {
                                  loginAuth()
                                }
                              }}
                              placeholder="이메일을 입력해주세요 "
                            />
                            {/* {errors.email && 'Email is required'} */}
                          </div>
                          <div className="form-group">
                            <label className="col-form-label">비밀번호</label>
                            <input
                              className="form-control"
                              type="password"
                              name="password"
                              placeholder="패스워드"
                              value={password}
                              f
                              onChange={e => setPassword(e.target.value)}
                              // onKeyDown={e => {
                              //   if (e.key === "Enter") {
                              //     loginAuth()
                              //   }ㄴ
                              // }}
                            />
                            {/* {errors.password && 'Email is required'} */}
                          </div>
                          <div className="checkbox p-0">
                            <input id="checkbox1" type="checkbox" />
                            {/* <label htmlFor="checkbox1">아이디 기억하기</label> */}
                          </div>
                          <div className="form-group form-row mt-3 mb-0">
                            <button
                              className="btn btn-primary btn-block"
                              type="button"
                              onClick={() => loginAuth()}
                              onKeyDown={e => {
                                if (e.key === "Enter") {
                                  loginAuth()
                                }
                              }}
                            >
                              Login
                            </button>
                          </div>
                          {/* <div className="login-divider"></div>
                                                    <div className="social mt-3">
                                                        <div className="form-group btn-showcase d-flex">
                                                            <button className="btn social-btn btn-fb d-inline-block" type="button" onClick={facebookAuth}> <i className="fa fa-facebook"></i></button>
                                                            <button className="btn social-btn btn-twitter d-inline-block" type="button" onClick={googleAuth}><i className="fa fa-google"></i></button>
                                                            <button className="btn social-btn btn-google d-inline-block" type="button" onClick={twitterAuth}><i className="fa fa-twitter"></i></button>
                                                            <button className="btn social-btn btn-github d-inline-block" type="button" onClick={githubAuth}><i className="fa fa-github"></i></button>
                                                        </div>
                                                    </div> */}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
          {/* <!-- login page end--> */}
        </div>
      </div>
    </div>
  )
}

export default withRouter(Signin)
