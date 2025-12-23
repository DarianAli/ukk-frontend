"use client"

import { IKos } from "@/app/types";
import { BASE_API_URL, BASE_IMAGE_KOS } from "@/global";
import { get } from "@/lib/api-bridge";
import Image from "next/image";
import AddKos from "./addKos";
import EditKos from "./editkos";
import DeleteKos from "./deleteKos";
import { Search } from "lucide-react";
import { AlertInfo } from "@/components/Alert";
import { useEffect, useState } from "react";
import { getCookie } from "@/lib/client-cookies";
import KosCard from "./kosCard";



const KosPage =  () => {

    const [kos, setKos] = useState<IKos[]>([])
    const TOKEN = getCookie("token") || "";

    const fetchKos = async () => {
        try {
            const url = `${BASE_API_URL}/kos/get`
            const { data } = await get(url, TOKEN)

            if (data?.status) {
                setKos(data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchKos();
    }, [])


    return (
        <div className="m-2 bg-white rounded-lg p-3 border-t-primary shadow-md">
            <h4 className="text-xl font-bold mb-2">
                <span className="text-primary">Kos</span> Data
            </h4>
            <p className="text-sm text-secondary mb-4">
                This page display Kos data, allowing you to view details and manage kos property by adding, editing or deleting them
            </p>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center w-full max-w-md flex-grow">
                    <AddKos />
                </div>
            </div>
            {
                kos.length == 0 ? 
                <AlertInfo title="information">
                    No Data Aviable
                </AlertInfo>
                :
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {kos.map((kos) => (
                            <KosCard
                                key={kos.idKos}
                                kos={kos}
                                onUpload={() => window}
                            />
                        ))}
                    </div>
                </>
            }
        </div>
    )
}

export default KosPage

