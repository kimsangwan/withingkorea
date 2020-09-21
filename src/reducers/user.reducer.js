import React from "react"

const initData = {
  token: ""
}

function userReducer(state = initData, actionType) {
  switch (actionType) {
    case "USER_DATA":
      return { ...state }
    default:
      return state
  }
}

export default userReducer
