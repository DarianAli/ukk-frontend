import SocietyTemplate from "@/components/societyTemp"
import sideList from "../sideList"
import { ToastContainer } from "react-toastify"
import OwnerTemplate from "@/components/owner"

export const metadata = {
    title: `Kos Page | KosHunter`,
    description: `Created by Darian ^^`
}

type propsLayout = {
    children: React.ReactNode
}

const rootLayout = ({ children }: propsLayout) => {
    return (
         <OwnerTemplate title="Book Page" id="book" sideList={sideList}>
            <ToastContainer 
                containerId={`toastUser`}
            />
            {children}
         </OwnerTemplate>
    )
}

export default rootLayout