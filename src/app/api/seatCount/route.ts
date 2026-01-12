import { NextRequest } from "next/server";
import { db } from "@/db";
import { events } from "@/db/schema";


export async function GET(request : NextRequest){
    try {
        const {id} = await request.json() ;
        db.select(events)

    } catch (error) {
        console.log("ERROR : " , error)
    }
}