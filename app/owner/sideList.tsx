import { ReactNode } from "react";
import { GoHomeFill } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";

interface IPropSide {
    id: string, 
    path: string,
    label: string,
    icon: ReactNode
}

let sideList: IPropSide[] = [
    {
        id: `dashboard`,
        path: `/owner/dashboard`,
        label: `Dashboard`,
        icon: <GoHomeFill />
    },
    {
        id: `user`,
        path: `/owner/user`,
        label: `User`,
        icon: <CgProfile />
    },
    {
        id: `userList`,
        path: `/owner/userList`,
        label: `UserList`,
        icon: <FaUser />
    },
    {
        id: `menu`,
        path: `/owner/kos`,
        label: `kos`,
        icon: <MdMenuBook />
    },
    {
        id: `Booking`,
        path: `/owner/Booking`,
        label: `Booking`,
        icon: <GrTransaction />
    }
]

export default sideList