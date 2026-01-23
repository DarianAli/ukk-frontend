"use client"

import { useEffect, useState } from "react"
import { BASE_API_URL } from "@/global"
import { get, post } from "@/lib/api-bridge"
import { getCookie } from "@/lib/client-cookies"
import { IFaci } from "@/app/types"
import { toast } from "react-toastify"

interface Props {
    value: IFaci[]
    onChange: (data: IFaci[]) => void
}

const FasilitasSelector = ({ value = [], onChange }: Props) => {
    const [allFasilitas, setAllFasilitas] = useState<IFaci[]>([])
    const [input, setInput] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const TOKEN = getCookie("token") || ""
            const { data } = await get(
                `${BASE_API_URL}/fasility/get-Fasility`,
                TOKEN
            )

            if (data?.status) {
                setAllFasilitas(data.data)
            }
        }

        fetchData()
    }, [])

    const toggle = (fas: IFaci) => {
        const exists = (value ?? []).some(
            v => v.idFasilitas === fas.idFasilitas
        )

        if (exists) {
            onChange(
                value.filter(v => v.idFasilitas !== fas.idFasilitas)
            )
        } else {
            onChange([...value, fas])
        }
    }

    const handleDelete = () => {

    }


    const addNew = async () => {
        if (!input.trim()) return

        const TOKEN = getCookie("token") || ""

        const payload = JSON.stringify({
            fasilitas: input
        })

        const res = await post(
            `${BASE_API_URL}/fasility/create-Fasility`,
            payload,
            TOKEN
        )

        if (res?.status && res.data?.status) {
            const newFas: IFaci = {
                idFasilitas: res.data.data.idFasilitas,
                fasilitas: res.data.data.fasilitas
            }

            setAllFasilitas(prev => [...prev, newFas])
            onChange([...value, newFas])
            setInput("")
        }

        if (res?.status) {
            toast("Fasilatas berhasil dibuat!", {
                hideProgressBar: true,
                containerId: `toastKos`,
                type: `success`
            })
            return true
        } else {
            toast(res?.message, {
                hideProgressBar: true,
                containerId: `toastKos`,
                type: `warning`
            })
            return false
        }
    }

    return (
        <div className="mt-4">
            <label className="font-semibold">Facilities</label>

            {/* INPUT */}
            <div className="flex gap-2 mt-2">
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Add new facility..."
                    className="border rounded px-3 py-2 flex-1"
                />
                <button
                    type="button"
                    onClick={addNew}
                    className="px-4 py-2 rounded bg-[#4E635E] text-white"
                >
                    +
                </button>
            </div>

            {/* LIST */}
            <div className="flex flex-wrap gap-2 mt-4">
                {allFasilitas.map(f => {
                    const active = (value ?? []).some(
                        v => v.idFasilitas === f.idFasilitas
                    )

                    return (
                        <button
                            key={f.idFasilitas}
                            type="button"
                            onClick={() => toggle(f)}
                            className={`px-3 py-1 rounded-full border text-sm
                                ${active
                                    ? "bg-[#4E635E] text-white"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                        >
                            {f.fasilitas}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default FasilitasSelector

