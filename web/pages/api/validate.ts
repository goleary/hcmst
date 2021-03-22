// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  try {
    const { validate, id } = JSON.parse(req.body);
    await prisma.input.update({ where: { id }, data: { validated: validate } });
    res.json({ success: true });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error });
  }
};

export default handler;
