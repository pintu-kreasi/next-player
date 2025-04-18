// import { error } from "console";
import { rejects } from "assert";
import axiosInstance from "../apis/axiosInstance"
import { resolve } from "path";
// import { postData } from "../apis/postData";


interface Team {
  name: boolean;
  location: string;
  city: any;
}

const createTeam = (data:any) => {
  return new Promise((resolve, reject) => {
    try {
      const res = axiosInstance({
        url: "/teams",
        method: 'POST',
        data: {name:data.name, city:data.city}
      }).then((res) => {
        const response : Team = res.data
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
  })
}

const updateTeam = (id:string, data:any) => {
  return new Promise((resolve, reject) => {
    try {
      const res = axiosInstance({
        url: "/teams/"+id,
        method: 'PUT',
        data: {name:data.name, city:data.city}
      }).then((res) => {
        const response : Team = res.data
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
  })
}

const getTeams = () => {
  return new Promise((resolve, reject) => {
    try {
      const res = axiosInstance({
        url: '/teams',
        method: 'GET',
      }).then((res) => {
        console.log({res})
        resolve(res.data)
      }).catch((e) => {
        console.error(e)
        reject(e)
      })
    } catch(e) {
      console.error(e)
      reject(e)
    }
  })
}

const getTeamById = (id:string) => {
  return new Promise((resolve, reject) => {
    try {
      const res = axiosInstance({
        url: '/teams/'+id,
        method: 'GET',
      }).then((res) => {
        resolve(res.data)
      }).catch((e) => {
        console.error(e)
        reject(e)
      })
    } catch(e) {
      console.error(e)
      reject(e)
    }
  })
}


export {
  createTeam,
  updateTeam,
  getTeams,
  getTeamById
};