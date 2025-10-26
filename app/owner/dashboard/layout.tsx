import OwnerTemplate from "@/components/owner"
import Sidebar from "@/components/owner/sideBar"
import Topbar from "@/components/owner/TopBar"
import sideList from "../sideList"

export const metadata = {
    title: `Dashboard | KosHunter`,
    description: `Created by Darian ^^`
}

type propsLayout = {
    children: React.ReactNode
}

const rootLayout = ({ children }: propsLayout) => {
    return (
         <OwnerTemplate title="Dashboard" id="dashboaord" sideList={sideList}>
            {children}
         </OwnerTemplate>
    )
}

export default rootLayout