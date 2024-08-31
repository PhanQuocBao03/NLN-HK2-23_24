import React from "react";

import Headers from "../components/Header/Headers";

import Routers from "../routes/Routers";

const Layout = () =>{
    return (
        <div className="grid lg:grid-cols-5 grid-cols-1">
            <Headers className="lg:col-span-1 col-span-5" /> {/* Header chiếm 1 phần */}
            <main className="lg:col-span-4 col-span-1"> {/* Main chiếm 4 phần */}
                <Routers />
            </main>
        </div>
    );
}

export default Layout;
