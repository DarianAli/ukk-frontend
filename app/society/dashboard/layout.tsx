import SocietyTemplate from "@/components/societyTemp";
import sideList from "../sideList";

export const metadata = {
    title: `Dashboard | KosHunter`,
}

type propsLayout = {
    children: React.ReactNode
}

const rootLayout = ({ children }: propsLayout) => {
    return (
        <SocietyTemplate title="Dashboard" id="dashboard" sideList={sideList}>
            {children}
        </SocietyTemplate>
    )
}

export default rootLayout