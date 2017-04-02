import axios from "axios";
export function checkLogin() {
    return {
        type: "CHECK_LOGIN",
        payload: axios.get('api/checkLogin')
    }
}