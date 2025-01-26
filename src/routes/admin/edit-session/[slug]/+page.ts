import { error } from "@sveltejs/kit"
import type { SessionType } from "models/Session"

export const load = ({params,fetch}) =>{
    const slug = params.slug
        return {
            slug: slug,
        }
}