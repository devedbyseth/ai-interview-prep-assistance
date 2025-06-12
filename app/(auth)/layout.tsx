import { redirect } from "next/navigation";
import React, {ReactNode} from "react";
import { isUserAuthenticated } from "@/actions/auth.actions";

const authLayout = async ({children}:{children:ReactNode}) => {
    if((await isUserAuthenticated())) redirect("/");
    return (
        <div className="auth-layout">{children}</div>
    )
}

export default authLayout;