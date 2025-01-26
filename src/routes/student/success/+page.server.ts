import { type Actions } from "@sveltejs/kit";

export const actions : Actions ={
    logout: ({cookies}) =>{
        const session = cookies.get("sessionid")
        if(session){
            cookies.delete('sessionid',{path:'/'})
        }
    }
}