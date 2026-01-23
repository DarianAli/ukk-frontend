import SocietyTemplate from "@/components/societyTemp"
import sideList from "../sideList"
import { ToastContainer } from "react-toastify"

export const metadata = {
    title: `Kos Page | KosHunter`,
    description: `Created by Darian ^^`
}

type propsLayout = {
    children: React.ReactNode
}

const rootLayout = ({ children }: propsLayout) => {
    return (
         <SocietyTemplate title="Book Page" id="book" sideList={sideList}>
            <ToastContainer 
                containerId={`toastUser`}
            />
            {children}
         </SocietyTemplate>
    )
}

export default rootLayout