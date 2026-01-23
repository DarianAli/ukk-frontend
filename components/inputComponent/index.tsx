"use client"

import { KeyboardEvent, ReactNode } from "react"

type PropsInput = {
    value: string,
    onChange: (value: string) => void,
    type: "text" | "number" | "email" | "password" | "date",
    className?: string,
    id: string,
    required?: boolean,
    placeholder?: string,
    readOnly?: boolean,
    children?: ReactNode,
    label?: string,
    onKeyUp?: (Event: KeyboardEvent<HTMLInputElement>) => void
}

export const InputComponent = ({ value, onChange, type, className, id, required, placeholder, onKeyUp }: PropsInput) => {
    return (
        <input 
            type={type} 
            id={id} 
            value={value} 
            onChange={e => onChange(e.target.value)}
            className={`text-sm w-full rounded-md p-2 bg-white border border-secondary focus:border-primary focus:outline-none ${className}`}
            required={required ? required : false} placeholder={placeholder || ""} onKeyUp={ e => {
                if (onKeyUp) onKeyUp(e)
            }} />
    )
}

export const InputGroupComponent = ({ value, onChange, type, className, id, required, placeholder, onKeyUp, label, children, readOnly }: PropsInput) => {
    return (
        <div className="w-full flex-col gap-1 my-2">
            <strong className="text-xs font-bold text-slate-500">
                {label}{required == true ? <sup className="text-red-600">*&#41;</sup> : <></>}
            </strong>
            <div className="w-full h-14 flex items-center gap-2 bg-white border border-slate-500 rounded-xl">
                {
                    children ?
                        <div className="px-2">
                            {children}
                        </div> : <div className=""></div>
                }
                <input
                    type={type}
                    id={id}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className={`text-sm w-full rounded-r-md p-2 bg-white focus:outline-none ${className}`}
                    required={required ? required : false}
                    placeholder={placeholder || ""}
                    readOnly={readOnly ? readOnly : false} onKeyUp={e => {
                        if (onKeyUp) onKeyUp(e)
                    }}
                />
            </div>
        </div>
    )
}

export const TextGroupComponent = ({ value, onChange, className, id, required, placeholder, label }: PropsInput) => {
    return (
        <div className="w-full flex flex-col gap-1 my-2">
            <strong className="text-xs font-bold text-slate-500">
                {label}
                {required == true ? <sup className="text-red-600">*&#41;</sup> : <></>}
            </strong>
            <div className="w-full flex items-center gap-1 bg-white border border-slate-500 rounded-md">
                <textarea 
                    id={id}
                    value={value}
                    cols={10}
                    rows={3}
                    onChange={e => onChange(e.target.value)}
                    required={required ? required : false}
                    placeholder={placeholder || ""}
                />
            </div>
        </div>
    )
}