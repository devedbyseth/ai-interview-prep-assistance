
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, {ReactNode} from "react";


const authLayout = async ({children}:{children:ReactNode}) => {

    const cookieStore = await cookies();
    const response = await fetch("http://localhost:3000/api/vapi",{
        method: "GET",
        headers: {
            Cookie: cookieStore.toString()
        }
    })

    if(response.ok) redirect("/");

    return (
        <div className="auth-layout">{children}</div>
    )
}

export default authLayout;