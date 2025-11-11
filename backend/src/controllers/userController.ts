import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { generateToken } from "../jwtmiddleware";
const prisma = new PrismaClient

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        if (users) {
            res.send(users);
        }
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "something went wrong in fetching users data",
        })
        console.log(err);
    }
}


export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const user = await prisma.user.create({data: {
            name: name,
            email: email,
            password: password,
        }});
        if (user) {
            res.json({
                status: 'success',
                message: 'User created successfully',
            })
        }
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "something went wrong in creating user",
        })
        console.log(err);
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try{

        const { email, password } = req.body;
        const dataInDb = await prisma.user.findFirst({
            where: {
                email: email,
                password: password,
            }
        })

        if(dataInDb){

            const token = generateToken(dataInDb.id);
            console.log(`Token is ${token}`);

            const safeUser = {
                id: dataInDb.id,
                email: dataInDb.email,
                name: dataInDb.name,
                subdomain: dataInDb.subdomain || null,
            }

            res.json({
                status: "success",
                message: "User found",
                user: safeUser,
                token: token,
            })
        }else{
            res.json({
            status: 'error',
            message: 'Invalid credentials',
        })
        }

    }catch(error){
        res.json({
            status: 'error',
            message: 'Internal server error',
        })
    }
}