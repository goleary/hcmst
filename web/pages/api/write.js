// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { Client } = require("pg");

export default async (req, res) => {
  try {
    const client = new Client();

    const { income, age_bin, education } = req.query;

    await client.connect();
    const query = `
      INSERT INTO input_data(income, age_bin, education)
      VALUES (${income}, ${age_bin}, ${education});`;
    const result = await client.query(query);
    console.log("result.oid: ", result.oid);
    await client.end();
    res.send("hooray");
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error });
  }
};
