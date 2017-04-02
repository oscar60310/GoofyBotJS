import axios from "axios";
export function checkLogin() {
    return {
        type: "CHECK_LOGIN",
        payload: axios.get('http://beta.json-generator.com/api/json/get/414r5rM-z')
    }
}