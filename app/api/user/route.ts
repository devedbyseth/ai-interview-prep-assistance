import { getCurrentUser } from "@/actions/auth.actions";

export async function GET(){
    // const user = await getCurrentUser();
    let user = {
        name: "USER"
    }
    if(!user) return Response.json({message: "Unauthorized"}, {status: 401});
    return Response.json({user}, {status: 200 })
}