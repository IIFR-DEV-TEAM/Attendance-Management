export const load = ({cookies, locals}) =>{
    const sessionid = cookies.get("sessionid");
    return {
        sessionid
    }
}