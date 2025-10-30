import { Children, ReactNode } from "react"
import Link from "next/link"

type Prop = {
    children: ReactNode
    title: string
}
type Button = {
    children: ReactNode
    className?: string
}

export const AlertInfo = ({ children, title }: Prop) => {
    return (
        <div className="h-fit my-2 bg-sky-200 rounded-md text-sky-800 px-4 py-3 shadow-md border-l-4 border-sky-800" role="alert">
            <div className="flex gap-1">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                </div>
                <div>
                    <p className="font-bold text-lg">{title}</p>


                    <div className="text-sm">
                        {children}
                    </div>
                </div>
            </div>


        </div>


    )
}

export const AlertSuccess = ({ children, title }: Prop) => {
    return (
        <div className="h-fit my-2 bg-green-200 rounded-md text-green-800 px-4 py-3 shadow-md border-l-4 border-green-800" role="alert">
            <div className="flex gap-1">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
                <div>
                    <p className="font-bold text-lg">{title}</p>


                    <div className="text-sm">
                        {children}
                    </div>
                </div>
            </div>


        </div>


    )
}

export const AlertWarning = ({ children, title }: Prop) => {
    return (
        <div className="h-fit my-2 bg-yellow-200 rounded-md text-yellow-800 px-4 py-3 shadow-md border-l-4 border-yellow-800" role="alert">
            <div className="flex gap-1">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                </div>
                <div>
                    <p className="font-bold text-lg">{title}</p>
                    <div className="text-sm">
                        {children}
                    </div>
                </div>
            </div>


        </div>


    )
}

export const AlertDanger = ({ children, title }: Prop) => {
    return (
        <div className="h-fit y-2 bg-red-200 rounded-md text-red-800 px-4 py-3 shadow-md border-l-4 border-red-800" role="alert">
            <div className="flex gap-1">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>

                </div>
                <div>
                    <p className="font-bold text-lg">{title}</p>


                    <div className="text-sm">
                        {children}
                    </div>
                </div>
            </div>


        </div>
    )
}

export const ReturnButton = ({ className, children }: Button) => {
    return (
        <Link href="/button">
        <button
            className={`h-fit my-2 border-2 text-sm bg-white text-black rounded-md py-2 px-4 hover:bg-black hover:text-white font-bold ${className}`}>
            {children}
        </button>
        </Link>
        )
}


