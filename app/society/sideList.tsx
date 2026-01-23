import { ReactNode } from "react";
import { GoHomeFill } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { Settings2 } from "lucide-react";

interface IPropSide {
    id: string, 
    path: string,
    label: string,
    icon: ReactNode
}

let sideList: IPropSide[] = [
    {
        id: `dashboard`,
        path: `/society/dashboard`,
        label: `Dashboard`,
        icon: <GoHomeFill />
    },
    {
        id: `user`,
        path: `/society/user`,
        label: `User`,
        icon: <FaUser />
    },
    {
        id: `kos`,
        path: `/society/kos`,
        label: `kos`,
        icon: <MdMenuBook />
    },
    {
        id: `Booking`,
        path: `/society/Booking`,
        label: `Booking`,
        icon: <GrTransaction />
    }
]

export default sideList