import OwnerTemplate from "@/components/owner";
import sideList from "../sideList";
import { ToastContainer } from "react-toastify";
import { title } from "process";

export const metadata = {
    title: "Kos | Kos Hunter",
    description: "Created by Darian"
}

type PropsLayout = {
    children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
    return (
        <OwnerTemplate title="Kos Page" id="kos" sideList={sideList}>
            <ToastContainer 
                containerId={`toastKos`}
            />
            {children}
        </OwnerTemplate>
    )
}

export default RootLayout