// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const API_BASE_URL = "https://plumber-ldldwxmigq-uw.a.run.app/";

const PREDICT_ROUTE = "predict";

// this is essentially proxying the request as is...
// is there an easier way to do with with next API routes?
// this also means we could turn authentication on and set it up here.

export default async (req, res) => {
  try {
    const url = new URL(PREDICT_ROUTE, API_BASE_URL);
    url.search = new URLSearchParams(req.query);
    const result = await fetch(url);
    const text = await result.text();
    console.log({ text });
    res.send(text);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error });
  }
};
