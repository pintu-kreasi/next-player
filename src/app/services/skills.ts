// import { error } from "console";
import { rejects } from "assert";
import axiosInstance from "../apis/axiosInstance"
import { resolve } from "path";
// import { postData } from "../apis/postData";


interface Skill {
  player_id: number,
  dribbling: number,
  passing: number,
  shooting: number,
  defence: number,
  speed: number,
  durability: number,
  power: number,
  cooperative: number,
  dicipline: number,
  effort: number,
}


const updateSkill = (id:string, data:any) => {
  return new Promise((resolve, reject) => {
    console.log({data, id})
    try {
      const res = axiosInstance({
        url: "/playerSkillStats/"+id,
        method: 'PUT',
        data: data
      }).then((res) => {
        console.log({res})
        const response : Skill = res.data
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

const getSkills = () => {
  return new Promise((resolve, reject) => {
    try {
      const res = axiosInstance({
        url: '/playerSkillStats',
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

const getSkillByPlayerId = (id:string) => {
  return new Promise((resolve, reject) => {
    try {
      const res = axiosInstance({
        url: '/playerSkillStats/'+id,
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
  updateSkill,
  getSkills,
  getSkillByPlayerId
};