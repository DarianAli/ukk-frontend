export const metadata = {
    title: "Login | Kos Hunter",
    description: "Made by Darian",
}

type propLayout = {
    children: React.ReactNode
}

const RootLayout = ({ children }: propLayout) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default RootLayout
