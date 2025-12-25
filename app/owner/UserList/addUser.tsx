"user client"

import { IUser } from "@/app/types"
import { BASE_API_URL } from "@/global"
import { post } from "@/lib/api-bridge"
import { getCookie } from "@/lib/client-cookies"
import { useRouter } from "next/navigation"
import { FormEvent, useRef, useState } from "react"
import { toast } from "react-toastify"
import { ButtonSuccess, ButtonWarning } from "@/components/button"
import { InputGroupComponent } from "@/components/inputComponent"
import Modal from "@/components/Modal"
import Select from "@/components/Select"
import FileUpload from "@/components/FileInput"

const AddUser = () => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [user, setUser] = useState<IUser>({
        idUser: 0,
        uuid: ``,
        name: ``,
        email: ``,
        password: ``,
        profile: ``,
        role: ``,
        phone: ``,
        createdAt: ``,
        updatedAt: ``,
    });
    const router = useRouter()
    const TOKEN = getCookie("token") || "";
    const [file, setFile] = useState<File | null>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const openModal = () => {
        setUser({
            idUser: 0,
            uuid: ``,
            name: ``,
            email: ``,
            password: ``,
            profile: ``,
            role: ``,
            phone: ``,
            createdAt: ``,
            updatedAt: ``,
        })
        setIsShow(true);
        if (formRef.current) formRef.current.reset();
    };
    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault();
            const url = `${BASE_API_URL}/user/register`
            const { name, email, password, role, phone } = user;
            const payload = new FormData();
            payload.append("name", name || "")
            payload.append("email", email || "")
            payload.append("phone", phone || "")
            payload.append("password", password || "")
            payload.append("role", role || "")
            if (file != null) payload.append("profile", file || "")
            const { data } = await post(url, payload, TOKEN)
            if (data?.status) {
                setIsShow(false)
                toast(data?.message, {
                    hideProgressBar: true,
                    containerId: `userList`,
                    type: `success`
                })
                setTimeout(() => router.refresh(), 1000);
            } else {
                toast(data?.message, {
                    hideProgressBar: true,
                    containerId: `userList`,
                    type: `warning`
                })
            }
        } catch (error) {
            console.log(error)
            toast(`something wrong`, {
                hideProgressBar: true,
                containerId: `userList`,
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
                    Add User
                </div>
            </ButtonSuccess>
            <Modal isShow={isShow} onClose={(state) => setIsShow(state)}>
                <form onSubmit={handleSubmit}>
                    {/* Modal Header Startttt */}
                    <div className="sticky top-0 bg-[#4E635E] px-5 pt-5 pb-3 shadow">
                        <div className="w-full flex items-center">
                            <div className="flex flex-col">
                                <strong className="font-bold text-2xl text-white">Create New User!</strong>
                                <small className="text-slate-200 text-sm">Owner can create user items on this page</small>
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
                    {/* Modal Header End :( */}

                    {/* MOdal Body Starttt */}
                    <div className="p-5">
                        <InputGroupComponent
                            id={`name`}
                            type="text"
                            value={user.name}
                            onChange={(val) => setUser({ ...user, name: val })}
                            required={true}
                            label="Name"
                        />
                        <InputGroupComponent 
                            id={"email"}
                            type="text"
                            value={user.email}
                            onChange={(val) => setUser({ ...user, email: val })}
                            required={true}
                            label="Email"
                        />
                        <InputGroupComponent
                            id={"password"}
                            type="text"
                            value={user.password}
                            onChange={(val) => setUser({ ...user, password: val })}
                            required={true}
                            label="Password"
                        />
                        <InputGroupComponent
                            id={"phone"}
                            type="text"
                            value={user.phone}
                            onChange={(val) => setUser({ ...user, phone: val })}
                            required={true}
                            label="Phone"
                        />
                        <Select
                            className="text-slate-500 p-2"
                            id={"role"}
                            value={user.role}
                            label="Role"
                            required={true}
                            onChange={(val) => setUser({ ...user, role: val })}
                        >
                            <option value="">--- Select Role ---</option>
                            <option value="owner">Owner</option>
                            <option value="society">Society</option>
                        </Select>
                        <FileUpload
                            acceptTypes={[
                                "application/pdf",
                                "image/pdf",
                                "image/jpeg",
                                "image/jpg",
                            ]}
                            id="profile"
                            label="Upload Picture (Max 2mb, PDF/JPG/JPEG/PNG)"
                            onChange={(f) => setFile(f)}
                            required={false}
                            maxSize={2 * 1024 * 1024}
                        />
                    </div>
                    {/* Modal Body endd */}

                    {/* Modal Footer Starto */}
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
                    {/* Modal Footer enddo' */}
                </form>
            </Modal>
        </div>
    )
}

export default AddUser