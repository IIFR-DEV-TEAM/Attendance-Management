export const load = ({cookies}) =>{
    const sessionid = cookies.get("sessionid");
    return {
        sessionid
    }
}