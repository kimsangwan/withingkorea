import Cookie from "js-cookie"
import React, { useEffect } from "react"
import { message } from "antd"
import axios from "axios"

export default function(Component) {
  function Auth(props) {
    // const history = useHistory()
    // if (!Cookie.get("token")) {
    //   props.history.push("/")
    //   message.error("관리자 로그인후에 이용해주세요")
    //   //   alert("로그인후 이용하세요")
    // }
    const token = Cookie.get("token")
    useEffect(() => {
      axios
        .post("/api/v1/state/tokenState", "", {
          headers: {
            Authorization: token
          }
        })
        .then(res => {
          if (res.data.status !== "success") {
            props.history.push("/")
            message.error("관리자 로그인후에 이용해주세요")
          }
        })
    }, [])

    return <Component {...props} />
  }

  return Auth
}
