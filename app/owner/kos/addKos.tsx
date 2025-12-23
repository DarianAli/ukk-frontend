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
import { Files } from "lucide-react"

const AddKos = () => {
    const [ isShow, setIsShow ] = useState<boolean>(false);
    const [kos, setKos] = useState<IKos>({
        idKos: ``,
        uuid: ``,
        name: ``,
        address: ``,
        foto: [],
        price_per_month: ``,
        createdAt: ``,
        updatedAt: ``,
    });

    const router = useRouter();
    const TOKEN = getCookie("token") || "";
    const formRef = useRef<HTMLFormElement>(null)

    const openModal = () => {
        setKos({
            idKos: ``,
            uuid: ``,
            name: ``,
            address: ``,
            foto: [],
            price_per_month: ``,
            createdAt: ``,
            updatedAt: ``,
        });


        setIsShow(true);
        if (formRef.current) formRef.current.reset();
    };


    const handleCreateKos = async () => {
        const url = `${BASE_API_URL}/kos/add`;

        const payload = new FormData()
        payload.append("name", kos.name);
        payload.append("address", kos.address)
        payload.append("price_per_month", kos.price_per_month)

        const { data } = await post(url, payload, TOKEN);

        if (data?.status) {
            toast("Kos Berhasil dibuat!", {
                hideProgressBar: true,
                containerId: `toastKos`,
                type: "success"
            })
            return true
        } else {
            toast(data?.message, {
                hideProgressBar: true,
                containerId: `toastKos`,
                type: "warning"
            })
            return false
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            const created = await handleCreateKos()
            if (!created) return;

            toast("Berhasil membuat kos!", {
                hideProgressBar: true,
                containerId: `toastKos`,
                type: "success"
            })

            setIsShow(false)
            setTimeout(() => router.refresh(), 800)
        } catch (error) {
            console.log(error);
            toast("Something went wrong", {
                hideProgressBar: true,
                containerId: `toastKos`,
                type: "warning"
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
                <form onSubmit={handleSubmit} ref={formRef}>
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
                        id={`address`}
                        type="text"
                        value={kos.address}
                        onChange={(val) => setKos({ ...kos, address: val })}
                        required={true}
                        label="address"
                    />
                    <InputGroupComponent 
                        id={`price_per_month`}
                        type="number"
                        value={kos.price_per_month.toString()}
                        onChange={(val) => setKos({ ...kos, price_per_month: val })}
                        required={true}
                        label="Price"
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