import { isUserAuthenticated } from "@/actions/auth.actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, {ReactNode} from "react";


const authLayout = async ({children}:{children:ReactNode}) => {

    // if(!!(await isUserAuthenticated())) redirect('/');
    
    return (
        <div className="auth-layout">{children}</div>
    )
}

export default authLayout;