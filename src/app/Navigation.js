import { Link } from "react-router-dom";

const Navigation = () => {

    const navObj = [
        {
            label: 'Home',
            route: '/'
        },
        {
            label: 'Artists',
            route: '/artists'
        },
        {
            label: 'Events',
            route: '/events'
        }
    ]

    return(
        <div className='navigation'>
            {navObj.map(({ label, route }) => (
                <Link key={route} to={route} style={{ marginRight: '15px' }}>
                    {label}
                </Link>
            ))}
        </div>
    )    
}

export default Navigation;