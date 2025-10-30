import { ReactNode } from "react";
import Link from "next/link";

type Props = {
    children: ReactNode;
    type: "button" | "submit" | "reset";
    onClick?: () => void;
    className?: string; 
}

type Filter = {
    children: ReactNode
    path: string;
    className?: string
}

export const ButtonSuccess = ({ children, type, onClick, className }: Props ) => {
    return(
        <button 
            className={`shadow-[inset_0_0_0_2px_#616467] text-[#4E635E] px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200`}
            type={type} 
            onClick={() => {
                if (onClick) onClick()
            }}   
        >
            {children}
        </button>
    )
}

export const ButtonWarning = ({ children, type, onClick, className }: Props) => {
    return (
        <button 
            className={`shadow-[inset_0_0_0_2px_#616467] text-[#4E635E] px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#E2E0C8] hover:text-[#A6B49E] dark:text-neutral-200 transition duration-200`}
            type={type} 
            onClick={() => {
                if (onClick) onClick()
            }}   
        >
            {children}
        </button>
    )
}