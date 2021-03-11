
import Link from 'next/link'

import Style from './styles/header'

const Header = () => {
    return <header>
        <div className="logoContainer">
            <Link href="/">
                <img src="/img/logo.svg" alt="logo" />
            </Link>
        </div>
        <Style />
    </header>
}


export default Header