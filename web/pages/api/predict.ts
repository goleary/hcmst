// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiHandler } from "next";
import { PrismaClient } from "@prisma/client";
const API_BASE_URL = "https://plumber-ldldwxmigq-uw.a.run.app/";

const PREDICT_ROUTE = "predict";

// this is essentially proxying the request as is...
// is there an easier way to do with with next API routes?
// this also means we could turn authentication on and set it up here.

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  try {
    const { income, ageBin, education } = req.query as {
      [key: string]: string;
    };

    const url = new URL(PREDICT_ROUTE, API_BASE_URL);
    url.searchParams.append("income", income);
    url.searchParams.append("education", education);
    url.searchParams.append("age_bin", ageBin);

    const result = await fetch(url.toString());
    const prediction = await result.json();
    const { id } = await prisma.input.create({
      data: {
        income: parseInt(income, 10),
        ageBin: parseInt(ageBin, 10),
        education: parseInt(education, 10),
        prediction: JSON.stringify(prediction),
      },
    });
    res.json({ prediction, id });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error });
  }
};

export default handler;
