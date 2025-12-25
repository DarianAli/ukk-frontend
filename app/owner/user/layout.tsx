import OwnerTemplate from "@/components/owner"
import Sidebar from "@/components/owner/sideBar"
import Topbar from "@/components/owner/TopBar"
import sideList from "../sideList"
import { ToastContainer } from "react-toastify"

export const metadata = {
    title: `Dashboard | KosHunter`,
    description: `Created by Darian ^^`
}

type propsLayout = {
    children: React.ReactNode
}

const rootLayout = ({ children }: propsLayout) => {
    return (
         <OwnerTemplate title="Profile Setting" id="userSetting" sideList={sideList}>
            <ToastContainer 
                containerId={`toastUser`}
            />
            {children}
         </OwnerTemplate>
    )
}

export default rootLayout