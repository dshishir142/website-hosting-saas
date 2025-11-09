import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response } from "express";

export const getUsers = async (req: Request,res: Response)=>{
    try{
        console.log("Here");
    }catch(error){
        res.status(500).json({
            status: "Error",
            message: "There has been an error",
        })
    }
}