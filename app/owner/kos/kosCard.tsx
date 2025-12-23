"use client"

import Image from "next/image"
import { IKos } from "@/app/types"
import Link from "next/link"
import EditKos from "./editkos"
import AddKos from "./addKos"
import { getCookie } from "@/lib/client-cookies"
import { BASE_API_URL, BASE_IMAGE_KOS } from "@/global"
import { get } from "@/lib/api-bridge"
import DeleteKos from "./deleteKos"
import { CiLocationOn } from "react-icons/ci"
import { LuUpload } from "react-icons/lu"

interface KosCardProps {
    kos: IKos;
    onUpload: () => void
}

const getKos = async () : Promise<IKos[]> => {
    try {
        const TOKEN = await getCookie("token") || ""
        const url = `${BASE_API_URL}/kos/get`
        const { data } = await get(url, TOKEN)
        let result: IKos[] = []
        if (data?.status) result = [...data.data]
        return result 
    } catch (error) {
        console.log(error)
        return []
    }
}

const KosCard = ({ kos, onUpload }: KosCardProps) => {
    

    return (
        <div className="bg-white rounded-xl shadow-md border overflow-hidden flex flex-col">
            {/* foto */}
            <div className="relative w-full h-48 overflow-hidden bg-gray-200">
                {kos.foto && kos.foto.length > 0 ? (
                    <Image 
                        src={
                            kos.foto && kos.foto.length > 0
                      ? `${BASE_IMAGE_KOS}/${kos.foto[0].foto}`
                      : "/image/no-image.jpg"
                        }
                        alt={kos.name}
                        fill
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        No Image
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col gap-3">
                <h2 className="font-bold text-lg">{kos.name}</h2>
                <div className="flex items-center text-gray-600 text-sm gap-1">
                    <CiLocationOn size={17}/>
                    {kos.address}
                </div>

                <div className="flex items-end justify-between">
                    <p className="text-gray-600 font-semibold text-2xl mt-2">Rp {Number(kos.price_per_month).toLocaleString()}
                        <span className="text-sm font-normal"> / bulan</span>
                    </p>
                </div>

                {/* Fasility */}
                {/* Farility End */}

                    <button 
                        onClick={onUpload}
                        className="w-full mt-2 border border-gray-300 rounded-xl py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                    >
                        <LuUpload size={18}/>
                        Upload Foto
                    </button>

                <div className="flex gap-2 mt-2">
                    <div className="flex-1">
                        <EditKos selectedKos={kos} />
                    </div>
                    <div className="flex-1">
                        <DeleteKos selectedKos={kos}/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default KosCard;