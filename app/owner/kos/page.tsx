import { IKos } from "@/app/types";
import { getCookies } from "@/lib/server-cookie";
import { BASE_API_URL, BASE_IMAGE_KOS } from "@/global";
import { get } from "@/lib/api-bridge";
import Image from "next/image";
import AddKos from "./addKos";
import EditKos from "./editkos";
import DeleteKos from "./deleteKos";

const getKos = async ( search: string ): Promise<IKos[]> => {
    try {
        const TOKEN = await getCookies("token")
        const url = `${BASE_API_URL}/kos/get?search=${search}`
        const { data } = await get(url, TOKEN)
        let result: IKos[] = []
        if (data?.status) result = [...data.data]
        return result 
    } catch (error) {
        console.log(error)
        return []
    }
}

const KosPage = async () => {
    const kos: IKos[] = await getKos(search) 
}