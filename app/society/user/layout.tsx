import SocietyTemplate from "@/components/societyTemp"
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
         <SocietyTemplate title="Profile Setting" id="kos" sideList={sideList}>
            <ToastContainer 
                containerId={`toastUser`}
            />
            {children}
         </SocietyTemplate>
    )
}

export default rootLayout