"use client"

import { IKos } from "@/app/types"
import { BASE_API_URL } from "@/global"
import { put } from "@/lib/api-bridge"
import { getCookie } from "@/lib/client-cookies"
import { useRouter } from "next/navigation"
import { FormEvent, useRef, useState } from "react"
import { toast } from "react-toastify"
import { ButtonSuccess, ButtonWarning } from "@/components/button"
import { InputGroupComponent } from "@/components/inputComponent"
import Modal from "@/components/Modal"
import Select from "@/components/Select"
import FileUpload from "@/components/FileInput"

const EditKos = ({ selectedKos } : { selectedKos: IKos }) => {
    const [ isShow, setIsShow ] = useState<boolean>(false)
    const [ kos, setKos ] = useState<IKos>({ ...selectedKos })
    const [file, setFile] = useState<File | null>(null)

    const router = useRouter()
    const TOKEN = getCookie("token") || ""
    const formRef = useRef<HTMLFormElement>(null)
    const openModal = () => {
        setKos({ ...selectedKos })
        setIsShow(true)
        if ( formRef.current ) formRef.current.reset()
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `${BASE_API_URL}/kos/update/${selectedKos}`
            const { name, addres, price_per_month } = kos
            const payload = new FormData();

            payload.append("name", name || "")
            payload.append("addres", addres || "")
            payload.append("price_per_month", price_per_month !== undefined ? price_per_month.toString() : "0")
            if (file !== null) payload.append("foto", file || "")
            const { data } = await put(url, payload, TOKEN)
            if (data?.status) {
                setIsShow(false)
                toast(data?.message, {
                    hideProgressBar: true,
                    containerId: `toastKos`,
                    type: `warning`,
                })
            }
        } catch (error) {
            console.log(error)
            toast(`Something Wrong`, {
                hideProgressBar: true,
                containerId: `toastKos`,
                type: `error`
            })
        }
    } 
    return (
        <div>
            <ButtonSuccess type="button" onClick={() => openModal()}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
                </svg>
            </ButtonSuccess>
            <Modal isShow={isShow} onClose={(state) => setIsShow(state)}>
                <form onSubmit={handleSubmit}>
                    {/* Modal Header Start */}
                    <div className="sticky top-0 bg-[#4E635E] px-5 pt-5 pb-3 shadow">
                        <div className="w-full flex items-center">
                            <div className="flex flex-col">
                                <strong className="font-bold text-2xl text-white">Update Now</strong>
                                <small className="text-slate-200 text-sm">Small Text</small>
                            </div>
                            <div className="ml-auto">
                                <button
                                    type="button"
                                    className="text-slate-200"
                                    onClick={() => setIsShow(false)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                    />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Modal Header End */}

                    {/* Modal Body Start */}
                    <div className="p-5">
                        <InputGroupComponent
                            id={`name`}
                            type="text"
                            value={kos.name}
                            onChange={(val) => setKos({ ...kos, name: val })}
                            required={true}
                            label="Name"
                        />
                        <InputGroupComponent
                            id={`price_per_month`}
                            type="number"
                            value={kos.price_per_month.toString()}
                            onChange={(val) => setKos({ ...kos, price_per_month: Number(val) })}
                            required={true}
                            label="Price"
                        />
                        <InputGroupComponent 
                            id={`addres`}
                            type="text"
                            value={kos.addres}
                            onChange={(val) => setKos({ ...kos, addres: val })}
                            required={true}
                            label="Address"
                        />
                        <FileUpload 
                            acceptTypes={[
                                "application/pdf",
                                "image/png",
                                "image/jpeg",
                                "image/jpg",
                            ]}
                            id="foto"
                            label="Unggah Foto (Max 2mb, PDF/JPG/JPEG/PNG)"
                            maxSize={2 * 1024 * 1024}
                            onChange={(f) => setFile(f)}
                            required={false}
                        />
                    </div>
                    {/* Modal Body End */}

                    {/* Modal Footer Start */}
                    <div className="w-full p-5 flex rounded-b-2xl shadow">
                        <div className="flex ml-auto gap-2">
                            <ButtonWarning type="button" onClick={() => setIsShow(false)}>
                                Cancel
                            </ButtonWarning>
                            <ButtonSuccess type="submit">
                                Save
                            </ButtonSuccess>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default EditKos