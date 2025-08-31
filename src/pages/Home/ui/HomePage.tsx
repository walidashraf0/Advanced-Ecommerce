import { Link } from "react-router"

const HomePage = () => {
    return (
        <>
        Home
            <Link to={'/login'}>Login Page</Link>
        </>
    )
}

export default HomePage
