// import { error } from "console";
import axiosInstance from "../apis/axiosInstance"
// import { postData } from "../apis/postData";


interface Team {
  name: boolean;
  location: string;
  city: any;
}

const createTeam = (data:any) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const res = axiosInstance({
//         url: "/teams",
//         method: 'POST',
//         data: {name:data.name, city:data.city}
//       }).then(async(res) => {
//         const response : Team = res.data
//         resolve(response)
//       }).catch((e) => {
//         console.error(e)
//         reject(e)
//       })
//     } catch (e) {
//       // handle error
//       console.error(e);
//       reject(e)
//     }
// });
  // const result = await postData(data, '/teams')
  // console.log({result})
  // return result;
  return false;
}

const getTeams = async() => {
  try {
    const res = axiosInstance({
      url: "/teams"
    })
  }
}


export {
  createTeam,
  getTeams
};