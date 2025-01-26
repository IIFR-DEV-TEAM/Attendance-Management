// import type { RequestHandler } from "@sveltejs/kit";
// import type { SessionType } from "models/Session";

// export const POST : RequestHandler= async({fetch, request}) =>{
//     try {
//         const res = await fetch("/api/attendance/edit",{
//             method: "PUT",
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body: JSON.stringify(request)
//         })
//         const {session} : {session:SessionType} = await res.json()
//         if(res.ok){
//             return json({success:true, session},{status:200})
//         }else{
//             return json({success:false, session},{status:500})
//         }
//     } catch (error) {
        
//     }
// }