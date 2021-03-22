import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [education, setEducation] = useState();
  const [age, setAge] = useState();
  const [income, setIncome] = useState();

  const ready = education && age && income;
  const [predictionResult, setPredictionResult] = useState();
  const [validateResult, setValidateResult] = useState();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = new URL("/api/predict", window.location);
    url.search = new URLSearchParams({ income, ageBin: age, education });
    const response = await fetch(url);
    const result = await response.json();
    setPredictionResult(result);
  };

  const handleValidate = async (validate) => {
    const resp = await fetch(`/api/validate`, {
      method: "POST",
      body: JSON.stringify({
        id: predictionResult.id,
        validate,
      }),
    });
    const result = await resp.json();
    setValidateResult(result);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>How Couples Meet and Stay Together</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>How Couples Meet and Stay Together</h1>

        <p className={styles.description}>give us some datas</p>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={handleSubmit}
          >
            <label htmlFor="cars">Education:</label>
            <select
              id="education"
              value={education}
              onChange={(event) => setEducation(event.target.value)}
            >
              <option disabled selected value>
                {" "}
                -- select an option --{" "}
              </option>
              <option value={12}>GED</option>
              <option value={13}>Bachelor Degree</option>
              <option value={14}>Master's Degree</option>
              <option value={15}>PhD</option>
            </select>
            <label htmlFor="age">Age bucket:</label>

            <select
              id="age"
              value={age}
              onChange={(event) => setAge(event.target.value)}
            >
              <option disabled selected value>
                {" "}
                -- select an option --{" "}
              </option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
            <label htmlFor="age">Income:</label>
            <input
              id="income"
              type="number"
              onChange={(event) => setIncome(event.target.value)}
            />
            <input type="submit" value="Submit" disabled={!ready} />
          </form>
        </div>

        {predictionResult && (
          <div>
            <h5>result</h5>
            <code>{JSON.stringify(predictionResult)}</code>
            <button onClick={() => handleValidate(true)}>true</button>
            <button onClick={() => handleValidate(false)}>false</button>
            <code>{JSON.stringify(validateResult)}</code>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
