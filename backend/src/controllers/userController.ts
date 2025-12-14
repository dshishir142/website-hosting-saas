import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { generateToken } from "../jwtmiddleware";
import { stat } from "fs";
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
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password,
            }
        });
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

export const logOutUser = async (req: Request, res: Response) => {
    try {
        const response = res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/",
        });
        if (response) {
            res.json({
                status: "success",
                message: 'User logged out successfully'
            })
        }
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "something went wrong in logging out user user",
        })
        console.log(err);
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;
        const dataInDb = await prisma.user.findFirst({
            where: {
                email: email,
                password: password,
            }
        })

        if (dataInDb) {

            const token = generateToken(dataInDb.id);

            const safeUser = {
                id: dataInDb.id,
                email: dataInDb.email,
                name: dataInDb.name,
                subdomain: dataInDb.subdomain || null,
            }

            res.cookie("token", token, {
                httpOnly: true,
                secure: false,        // true after hosting
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24 * 7
            });

            res.json({
                status: "success",
                message: "User found",
                user: safeUser,
                token: token,
            })

        } else {
            res.json({
                status: 'error',
                message: 'Invalid credentials',
            })
        }

    } catch (error) {
        res.json({
            status: 'error',
            message: 'Internal server error',
        })
    }
}


export const setSubDomainName = async (req: Request, res: Response) => {
    try {
        const { user: { email }, domainName } = req.body;
        console.log(domainName);
        const dataInDb = await prisma.user.findFirst({
            where: {
                subdomain: domainName,
            }
        })
        console.log(dataInDb);
        if (dataInDb) {
            res.json({
                status: 'error',
                message: 'this subdomain name already exists',
            })
        }
        const setSubDomain = await prisma.user.update({
            where: { email: email },
            data: { subdomain: domainName },
        })
        if (setSubDomain) {
            res.json({
                status: 'success',
                message: 'Successfully created subdomain name',
                data: setSubDomain,
            })
        }

    } catch (err) {
        console.log(err);
        res.json({
            status: "error",
            message: "Internal server error",
        })
    }
}