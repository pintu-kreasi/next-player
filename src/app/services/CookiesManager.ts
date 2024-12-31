// import { cookies } from 'next/headers
import { Cookies, setCookie, removeCookie, getCookie } from "typescript-cookie";

const config = {
  expires: 7,
  path: '/',
  domain: 'localhost',
  secure: false,
  sameSite: 'strict' // lax
}

export async function CreateCookies(name:string, value:string) {
  setCookie(name, value, config)
}

export function GetCookies(name:string) {
  let _cookie = Cookies.get(name)
  return new Promise(resolve => resolve(_cookie))
}

export function RemoveCookies(name:string) {
  removeCookie(name, config)
  // Cookies.remove(name, config)
  // document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
}