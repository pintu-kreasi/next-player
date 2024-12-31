import { error } from "console";
import axiosInstance from "../apis/axiosInstance"


interface User {
  success: boolean;
  token: string;
  user: any;
}

const loginWithEmail = async(email: string, password: string) => {
  
  return new Promise((resolve, reject) => {
    try {
      const res = axiosInstance({
        url: "/login",
        method: 'POST',
        data: {email, password}
      }).then(async(res) => {
        const response : User = res.data
        resolve(response)
      }).catch((e) => {
        console.error(e)
        reject(e)
      })
    } catch (e) {
      // handle error
      console.error(e);
      reject(e)
    }
  });

}

const signInByGoogle = () => {

}

export {
  loginWithEmail,
  signInByGoogle
};