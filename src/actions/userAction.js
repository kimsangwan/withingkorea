import axios from "axios"

export const userData = async (id, password) => {
  const form = new FormData()
  form.append("id", id)
  form.append("password", password)

  const { data } = await axios.post("/api/v1/gateway/login", form)
  //   console.log(data)
  return {
    type: "USER_DATA",
    payload: data.data.token
  }
}
