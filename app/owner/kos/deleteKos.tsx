"use client"

import { IKos } from "@/app/types"
import { BASE_API_URL } from "@/global"
import { drop } from "@/lib/api-bridge"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast } from "react-toastify"
import { ButtonSuccess, ButtonWarning } from "@/components/button"
import Modal from "@/components/Modal"
import { getCookie } from "@/lib/client-cookies"

const DeleteKos = ({ selectedKos }: {selectedKos: IKos}) => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [kos, setKos] = useState<IKos>({ ...selectedKos })
    const router = useRouter()
    const TOKEN = getCookie("token") || ""
    
    const openModal = () => {
        setKos({ ...selectedKos })
        setIsShow(true)
    }
    const handleSubmit = async ( e: FormEvent ) => {
        try {
            e.preventDefault()
            const url = `${BASE_API_URL}/kos/${selectedKos.idKos}`
            const { data } = await drop(url, TOKEN)
            
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
            toast(`something ware wrong`, {
                hideProgressBar: true,
                containerId: `toastUser`,
                type: `error`
            })
        }
    }
    return (
        <div>
            <ButtonWarning type="button" onClick={() => openModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </ButtonWarning>
            <Modal isShow={isShow} onClose={state => setIsShow(state)}>
                <form onSubmit={handleSubmit}>
                    <div className="sticky top-0 bg-[#4E635E] px-5 pt-5 pb-5 shadow">
                        <div className="w-full flex items-center">
                            <div className="flex flex-col">
                                <strong className="font-bold text-2xl text-white">
                                    Delete Kos
                                </strong>
                                <small className="text-slate-200 text-sm">
                                    Kos with existing booking data cannot be deleted form this page
                                </small>
                            </div>
                            <div className="ml-auto">
                                <button type="button" className="text-slate-200" onClick={() => setIsShow(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Modal Header End */}

                    {/* Modal body */}
                    <div className="p-5">
                        Are you sure you want to delete this menu {kos.name}?
                    </div>
                    {/* Modal body end */}

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

export default DeleteKos