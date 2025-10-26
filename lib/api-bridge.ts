import axios, { AxiosError } from "axios"
import { BASE_API_URL } from "@/global"
import { type } from "node:os"

const axiosInstance = axios.create({
    baseURL: BASE_API_URL
})

export const get = async (url: string, TOKEN: string) => {
    try {
        let headers: any = {
            "Authorization": `Bearer ${TOKEN}` || ''
        }
        let result = await axiosInstance.get(url, {
            headers
        })
        return {
            status: true,
            data: result.data
        }
    } catch (error) {
        const err = error as AxiosError<{ message: string, code: number }>
        if (err.response) {
            console.log(err.response.data.message);
            return {
                status: false,
                message: `${err.code}: something wrong`
            }
        }
        console.log(err.response);
        return {
            status: false,
            message: `Something were wrong: ${error}`
        }
    }
}

export const post = async ( url: string, data: string | FormData, TOKEN: string ) => {
    try {
        const typed: string = (typeof data == 'string') ? "application/json" : "multipart/form-data"
        let headers: any = {
            "Authorization": `Bearer ${TOKEN}` || ``,
            "Content-Type": typed
        }

        let result = await axiosInstance.post(url, data, {headers})
        return {
            status: true,
            data: result.data
        }
    } catch (error) {
        const err = error as AxiosError<{ message: string, code: number }>
        if (err.response) {
            console.log(err.response.data.message);
            return {
                status: false,
                message: `${err.response.data.message}`
            }
        }
        console.log(err.response)
        return {
            status: false,
            message: `Something wrong when trying to POST: ${error}`
        }
    }
}

export const put = async (url: string, data:string | FormData, TOKEN: string) => {
    try {
        const typesokk : string = (typeof data == 'string') ? "application/json" : "multiple/form-data"
        let result = await axiosInstance.put(url, data, {
            headers: {
                "Authorization": `Bearer ${TOKEN}` || '',
                "Content-Type": typesokk
            }
        }) 
        return {
            status: true,
            data: result.data
        }
    } catch (error) {
        const err = error as AxiosError<{ message: string, code: number }>
        if (err.response) {
            console.log(err.response.data.message);
            return {
                status: false,
                message: `${err.response.data.message}`
            }
        }
        console.log(err.response)
        return {
            status: false,
            mesage: `Somthing wrong when trying to PUT`
        }
    }
}

export const drop = async (url: string, TOKEN: string) => {
    try {
        let result = await axiosInstance.delete(url, {
            headers: {
                "Authorization": `Bearer ${TOKEN}` || ''
            }
        })
        return {
            status: true,
            data: result.data
        } 
    } catch (error) {
        const err = error as AxiosError<{ message: string, code: number }>
        if (err.message) {
            console.log(err.response?.data.message)
            return {
                status: false,
                mesage: `${err.code}: something went wrong`
            }
        }
        console.log(err.response);
        return {
            status: false,
            message: `something went wrong when trying to DELETE`
        }
    }
}