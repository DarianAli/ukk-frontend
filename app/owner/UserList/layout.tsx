import OwnerTemplate from "@/components/owner";
import sideList from "../sideList";
import { ToastContainer } from "react-toastify";


export const metadata = {
    title: 'User List | Hunters',
    description: 'Created by Darian'
}

type PropLayout = {
    children: React.ReactNode
}

const RootLayout = ({ children }: PropLayout ) => {
    return (
        <OwnerTemplate title="UserList" id="userList" sideList={sideList}>
            <ToastContainer containerId={`toastUserList`} />
            {children}
        </OwnerTemplate>
    )
}

export default RootLayout