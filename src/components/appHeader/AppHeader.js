import { Link, NavLink } from 'react-router-dom';

import './appHeader.scss';

const AppHeader = () => {
    const styles = ({isActive}) => ({color: isActive ? '#9f0013' : 'inherit'});

    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/" alt="Home">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink
                        end
                        to="/"
                        alt="Home"
                        style={styles}
                    >Characters</NavLink></li>
                    /
                    <li><NavLink
                        to="/comics"
                        alt="comics"
                        style={styles}
                    >Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;