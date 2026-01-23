"use client"

import { ReactNode } from "react"

type Props = {
  children: ReactNode
  isShow: boolean
  onClose: (status: boolean) => void
}

const Modal = ({ children, isShow, onClose }: Props) => {
  if (!isShow) return null

  return (
    <div
      className="fixed inset-0 z-[1024] bg-slate-900/90 flex justify-center items-center"
      onMouseDown={() => onClose(false)}
    >
      <div
        className="w-5/6 md:w-4/6 lg:w-3/6 max-h-[90vh] overflow-auto bg-white rounded-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
