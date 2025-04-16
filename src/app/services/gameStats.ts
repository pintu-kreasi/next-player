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

interface GameStats {
  player_id: number,
  two_point: number,
  three_point: number,
  free_throw: number,
  assist: number,
  offensive_rebound: number,
  defensive_rebound: number,
  steal: number,
  block: number,
  turn_over: number,
  team_id: number,
  match_id: number,
}

const createGameStats = (data:any) => {
  console.log({data})
  return new Promise((resolve, reject) => {
    try {
      const res = axiosInstance({
        url: "/playerGameStats",
        method: 'POST',
        data: data
      }).then((res) => {
        console.log({res})
        const response : GameStats = res.data
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

const updateGameStats = (id:string, data:any) => {
  return new Promise((resolve, reject) => {
    try {
      const res = axiosInstance({
        url: "/playerGameStats/"+id,
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

const getGameStats = (player_id:string) => {
  return new Promise((resolve, reject) => {
    try {
      const res = axiosInstance({
        url: '/playerGameStats',
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

const getGameStatsWithParams = (params: object) => {
  return new Promise((resolve, reject) => {
    try {
      const res = axiosInstance({
        url: '/playerGameStats',
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

const getGameStatById = (id:string) => {
  return new Promise((resolve, reject) => {
    try {
      const res = axiosInstance({
        url: '/playerGameStats/'+id,
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
  createGameStats,
  updateGameStats,
  getGameStats,
  getGameStatById,
  getGameStatsWithParams
};