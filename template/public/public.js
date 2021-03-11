
import Header from './header'
import Footer from './footer'

const PubliTemplate = ({ children }) => {
    return <>
        <Header/>
        {children}
        <Footer/>
    </>
}


export default PubliTemplate