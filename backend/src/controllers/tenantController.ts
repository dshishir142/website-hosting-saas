import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const prisma = new PrismaClient();

export const checkTenant = async (req: Request, res: Response) => {
    const subdomain = req.params.subdomain;
    try {
        const dataInDb = await prisma.user.findFirst({
            where: {
                subdomain: subdomain,
            }
        })

        if(dataInDb) {
            res.json({
                status: "success",
                message: "subdomain found",
                data: dataInDb,
            })
        } else {
            res.json({
                status: 'error',
                message: 'No such subdomain found',
            })
        }
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "something went wrong in checking tenants website",
        })
        console.log(err);
    }
}

export const getTenant = async (req: Request, res: Response) => {
    const subdomain = req.params.subdomain;
    try {
        const dataInDb = await prisma.tenant.findFirst({
            where: {
                subdomain: subdomain,
            }
        })

        if(dataInDb) {
            res.json({
                status: "success",
                message: "tenant data retrieved successfully",
                data: dataInDb,
            })
        } else {
            res.json({
                status: 'error',
                message: 'No tenant data found',
            })
        }
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "something went wrong in retrieving tenant data",
        })
        console.log(err);
    }
}