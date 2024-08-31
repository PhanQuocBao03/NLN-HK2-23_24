

import Headers from "../components/Header/Headers";
import Footer from "../components/Footer/Footer";
import Routers from "../routes/Routers";

const Layout = () =>{
    return( 
    <>
        <Headers />
        <main>
            <Routers/>
        </main>
        <Footer/>
    </>)
}

export default Layout;
