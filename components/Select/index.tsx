" use client "

import { ReactNode } from "react"

type Props = {
    value: string,
    onChange: (value: string) => void,
    className?: string,
    id: string,
    required?: boolean,
    children: ReactNode,
    label?: string, 
}

const Select = ({ value, onChange, className, id, required, children, label }: Props) => {
    return (
        <div className="w-full flex-col gap-1 my-1">
            {
                label ?
                <strong className="text-xs font-bold text-slate-500">
                    {label}
                    {required == true ? <sup className="text-red-600">*&#41;</sup> : <></>}
                </strong> :
                <></>
            }

            <div className="w-full h-14 flex items-center gap-1 bg-white border-slate-500 rounded-xl border">
                <select 
                    id={id} 
                    value={value} 
                    onChange={e => onChange(e.target.value)} 
                    required={required || false}
                    className={`w-full rounded-none appearance-none ${className}`}
                >
                    {children}
                </select>
            </div>
        </div>
    )
}

export default Select