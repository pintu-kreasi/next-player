// import { error } from "console";
import { rejects } from "assert";
import axiosInstance from "../apis/axiosInstance"
import { resolve } from "path";


interface TeamMatches {
  opponent: string;
  location: string;
  type: string;
  team_id: number;
}

const createTeamMatches = (data:any) => {
  return new Promise((resolve, reject) => {
    try {
      const res = axiosInstance({
        url: "/teamMatches",
        method: 'POST',
        data: {opponent:data.opponent, location:data.location, type:data.type, team_id:data.team_id}
      }).then((res) => {
        const response : TeamMatches = res.data
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

const updateTeamMatches = (id:string, data:any) => {
  return new Promise((resolve, reject) => {
    try {
      const res = axiosInstance({
        url: "/teamMatches/"+id,
        method: 'PUT',
        data: {opponent:data.opponent, location:data.location, type:data.type, team_id:data.team_id}
      }).then((res) => {
        const response : TeamMatches = res.data
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

const getTeamMatches = () => {
  return new Promise((resolve, reject) => {
    try {
      const res = axiosInstance({
        url: '/teamMatches',
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

const getTeamMatchesById = (id:string) => {
  return new Promise((resolve, reject) => {
    try {
      const res = axiosInstance({
        url: '/teamMatches/'+id,
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

const getTeamMatchesByParams = () => {
  return new Promise((resolve, reject) => {
    try {
      const res = axiosInstance({
        url: '/teamMatches',
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


export {
  createTeamMatches,
  updateTeamMatches,
  getTeamMatches,
  getTeamMatchesById,
  getTeamMatchesByParams,
};