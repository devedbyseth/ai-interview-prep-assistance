import React from "react";
import Image from "next/image";


const rootLayout = ({children}: {children: React.ReactNode}) =>{
    return(
        <div className="root-layout">
            <nav className="flex items-center gap-2">
                <Image src="./logo.svg" alt="logo" width={38} height={38}/>
                <h2 className="">Advance Prep</h2>
            </nav>

            <div>{children}</div>

        </div>
    )
}

export default rootLayout;

