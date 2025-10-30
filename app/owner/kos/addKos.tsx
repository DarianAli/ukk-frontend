"use client"

import { IKos } from "@/app/types"
import { BASE_API_URL } from "@/global"
import { post } from "@/lib/api-bridge"
import { getCookie } from "@/lib/client-cookies"
import { useRouter } from "next/navigation"
import { FormEvent, useRef, useState } from "react"
import { toast } from "react-toastify"
import { InputGroupComponent } from "@/components/inputComponent"
import { FileUploadDemo } from "@/components/FileUpload"
import { ButtonSuccess, ButtonWarning } from "@/components/button"
import Modal from "@/components/Modal"
import FileUpload from "@/components/FileInput"

const AddKos = () => {
    const [ isShow, setIsShow ] = useState<boolean>(false);
    const [kos, setKos] = useState<IKos>({
        idKos: ``,
        uuid: ``,
        name: ``,
        addres: ``,
        foto: ``,
        price_per_month: 0,
        createdAt: ``,
        updatedAt: ``,
    });
    const router = useRouter();
    const TOKEN = getCookie("token") || "";
    const [file, setFile] = useState<File | null>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const openModal = () => {
        setKos({
            idKos: ``,
            uuid: ``,
            name: ``,
            addres: ``,
            foto:``,
            price_per_month: 0,
            createdAt: ``,
            updatedAt: ``,
        });
        setIsShow(true);
        if (formRef.current) formRef.current.reset();
    };
    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `${BASE_API_URL}/kos`;
            const {name, addres, price_per_month} = kos;
            const payload = new FormData()
            payload.append("name", name || "");
            payload.append("addres", addres || "")
            payload.append("price_per_month", price_per_month !== undefined ? price_per_month.toString() : "0")

            if (file !== null) payload.append("foto", file || "")
            const { data } = await post(url, payload, TOKEN);
            if (data?.status) {
                setIsShow(false)
                toast(data?.message, {
                    hideProgressBar: true,
                    containerId: `toastKos`,
                    type: `success`
                })
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(data?.message, {
                    hideProgressBar: true,
                    containerId: `toastKos`,
                    type: `warning`
                })
            }
        } catch (error) {
            console.log(error)
            toast(`something wrong`, {
                hideProgressBar: true,
                containerId: `toastKos`,
                type: `error`
            })
        }
    }
    return (
        <div>
            <ButtonSuccess type="button" onClick={() => openModal()}>
                <div className="flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                    </svg>
                </div>
            </ButtonSuccess>
            <Modal isShow={isShow} onClose={(state) => setIsShow(state)}>
                <form onSubmit={handleSubmit}>
                {/* Modal Header */}
                <div className="sticky top-0 bg-[#4E635E] px-5 pb-3 shadow">
                    <div className="w-full flex items-center">
                        <div className="flex flex-col">
                            <strong className="font-bold text-2xl pt-3 text-white">
                                Create New Kos
                            </strong>
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

                {/* Modal Body */}
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
                        id={`addres`}
                        type="text"
                        value={kos.addres}
                        onChange={(val) => setKos({ ...kos, addres: val })}
                        required={true}
                        label="addres"
                    />
                    <InputGroupComponent 
                        id={`price_per_month`}
                        type="number"
                        value={kos.price_per_month.toString()}
                        onChange={(val) => setKos({ ...kos, price_per_month: Number(val) })}
                        required={true}
                        label="Price"
                    />
                    <FileUpload 
                        acceptTypes={[
                            "application/pdf",
                            "image/png",
                            "image/jpeg",
                            "image/jpg",
                        ]}
                        label="Upload Foto Profile"
                        maxSize={2048}
                        onChange={(file) => console.log("File:", file)}
                        id={`foto`}
                    />
                </div>
                {/* modal body end */}

                {/* modal footer */}
                <div className="w-full p-5 flex rounded-b-2xl shadow">
                    <div className="flex ml-auto gap-2">
                        <ButtonWarning type="button" onClick={() => setIsShow(false)}>
                            Cancel
                        </ButtonWarning>
                        <ButtonSuccess type="submit">Save</ButtonSuccess>
                    </div>
                </div>
                {/* modal footer end */}
                </form>
            </Modal>
        </div>
    )
}

export default AddKos