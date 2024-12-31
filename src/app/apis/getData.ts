import { error } from "console";
import axiosInstance from "../apis/axiosInstance"


const getData = async(url:string) => {
  return new Promise((resolve, reject) => {
    try {
      const res = axiosInstance({
        url,
        method: 'GET',
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
  getData
};