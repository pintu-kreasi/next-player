import { error } from "console";
import axiosInstance from "../apis/axiosInstance"


const postData = async(data:any, url:string) => {
  return new Promise((resolve, reject) => {
    try {
      const res = axiosInstance({
        url,
        method: 'POST',
        data
      }).then(async(res) => {
        resolve(res.data)
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

export {
  postData
};