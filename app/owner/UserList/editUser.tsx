"use client"

import { useState, FormEvent, useRef } from "react"
import { BASE_API_URL } from "@/global"
import { put } from "@/lib/api-bridge"
import { getCookie } from "@/lib/client-cookies"
import { toast } from "react-toastify"
import { ButtonSuccess, ButtonWarning } from "@/components/button"
import { useRouter } from "next/navigation"
import { InputGroupComponent } from "@/components/inputComponent"
import { FileUploadDemo } from "@/components/FileUpload"
import Modal from "@/components/Modal"
import Select from "@/components/Select"
import { IUser } from "@/app/types"

const EditUser = ({ selectedUser }: { selectedUser: IUser }) => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [user, setUSer] = useState<IUser>({ ...selectedUser })
    const [showPass, setShowPass] = useState<boolean>(false)
    const [password, setPassword] = useState<string>("")
    const [file, setFile] = useState<File | null>(null)
    const router = useRouter()
    const TOKEN = getCookie("token") || ""
    const formRef = useRef<HTMLFormElement>(null)

    const openModal = () => {
        setUSer({ ...selectedUser })
        setPassword("")
        setIsShow(true)
        setShowPass(false)
        if (formRef.current) formRef.current.reset()
    };

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault();
            const url = `${BASE_API_URL}/user/update/${selectedUser.idUser}`
            const { name, email, role } = user;
            const payload = new FormData();
            payload.append("name", name || "")
            payload.append("email", email || "")
            payload.append("role", role || "")
            if (file !== null) payload.append("picture", file || "")
            if (password) payload.append("password", password); 

            const { data } = await put (url, payload, TOKEN)
            if (data?.status) {
                setIsShow(false)
                toast(data?.message, {
                    hideProgressBar: true,
                    containerId: "editUserL",
                    type: "success"
                })
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(data?.message, {
                    hideProgressBar: true,
                    containerId: 'editUserL',
                    type: `warning`
                })
            }
        } catch (error) {
            console.log(error);
            toast(`something wrong`, {
                hideProgressBar: true,
                containerId: `editUserL`,
                type: `error`
            })
        }
    } 

    return (
        <div>
            <ButtonSuccess type="button" onClick={openModal}>
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
                    {/* Modal Header */}
                    <div className="sticky top-0 px-5 pt-5 pb-3 shadow">
                        <div className="w-full flex items-center">
                            <div className="flex flex-col">
                                <strong className="font-bold text-2xl text-slate-800">Update User</strong>
                                <small className="text-slate-600 text-sm">Owner can update both Cashier and Manager roles on this page.</small>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    )
    }