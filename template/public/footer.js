/*
 *
 * -------------------------------- JSX Admin Component Footer --------------------------------
 *
 * Name export : Footer
 *
 *  @Alexis Baylet CC-BY-SA https://github.com/Alexis-ba6
 *
*/

// Node modules
import React  from "react"
import Link from "next/link"
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Style from './styles/footer'

const Footer = () => {
    return <footer id="public">
        <div className="footer-frame">
            <div className="primary-frame">
                <ul className="primary-col">
                    <li className="primary text">
                        <Link href='/nous'>
                        <span>
                            qui sommes nous
                        </span>
                        </Link>
                    </li>
                    <li className="secondary text">
                        <a href='http://claveille.org/' target='_blank' rel='Instagram Albert Claveille'>
                        <span>
                            Lycée Albert Caveille
                        </span>
                        </a>
                    </li>
                </ul>
                <ul className="primary-col">
                    <li className="primary text">
                        <Link href='/'>
                        <span>
                            Développeur
                        </span>
                        </Link>
                    </li>
                    <li className="secondary text">
                        <a href="https://github.com/Alexis-ba6" target="_blank" rel="Github Alexis Baylet">
                        <span>
                            Develop by Alexis Baylet
                        </span>
                        </a>
                    </li>
                </ul>
                <ul className="secondary-col">
                    <li className="primary text social">
                    <span>
                        Social
                    </span>
                    </li>
                    <li className="social-media">
                        <ul>
                            <li>
                                <a href='https://www.instagram.com/albert_claveille/' target='_blank' rel='Instagram Albert Claveille'>
                                <span>
                                    <div className="mask">
                                        <FontAwesomeIcon icon={faInstagram}/>
                                    </div>
                                </span>
                                </a>
                            </li>
                            <li>
                                <a href='https://www.facebook.com/LYCEE-Albert-Claveille-589288837911319/' target='_blank' rel='Facebook Albert Claveille'>
                                <span>
                                    <div className="mask">
                                        <FontAwesomeIcon icon={faFacebook}/>
                                    </div>
                                </span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className="secondary-frame">
                <ul>
                    <li className="link">
                        <Link href='/'>
                        <span>
                            Terms of Use
                        </span>
                        </Link>
                    </li>
                    <li className="link">
                        <Link href='/'>
                        <span>
                            Privacy {'&'} Cookie Policy
                        </span>
                        </Link>
                    </li>
                    <li className="link">
                        <Link href='/admin/login'>
                        <span>
                            Admin
                        </span>
                        </Link>
                    </li>
                    <li className="licence link">
                        <Link href='/'>
                        <span>
                            © 2021 Un Jour Un Mathématicien, CC-BY-SA
                        </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
        <Style />
    </footer>
}

export default Footer