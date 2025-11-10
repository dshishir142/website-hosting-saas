import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient;

async function getUser(){
    try{
        const user = await prisma.user.findMany()
        if(user){
            console.log(user);
        }else{
            console.log("no user");
        }
    }catch(error){
        console.log(error)
    }

}

getUser();