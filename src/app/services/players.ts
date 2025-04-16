// import { error } from "console";
import { rejects } from "assert";
import axiosInstance from "../apis/axiosInstance"
import { resolve } from "path";
// import { postData } from "../apis/postData";


interface Player {
  name: boolean;
  email: string;
  dob: any;
  position: string;
  team_id: number;
}

const createPlayer = (data:any) => {
  return new Promise((resolve, reject) => {
    try {
      const res = axiosInstance({
        url: "/players",
        method: 'POST',
        data: data
      }).then((res) => {
        const response : Player = res.data
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

const updatePlayer = (id:string, data:any) => {
  console.log({id, data})
  return new Promise((resolve, reject) => {
    try {
      const res = axiosInstance({
        url: "/players/"+id,
        method: 'PUT',
        data: data
      }).then((res) => {
        const response : Player = res.data
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

const getPlayers = () => {
  return new Promise((resolve, reject) => {
    try {
      const res = axiosInstance({
        url: '/players',
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

const getPlayerById = (id:string) => {
  return new Promise((resolve, reject) => {
    try {
      const res = axiosInstance({
        url: '/players/'+id,
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
  createPlayer,
  updatePlayer,
  getPlayers,
  getPlayerById
};