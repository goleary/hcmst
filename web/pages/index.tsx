import Head from "next/head";
import { useMemo, useState } from "react";
import styles from "../styles/Home.module.css";

type RelationshipStatus =
  | "maried"
  | "widowed"
  | "divorced"
  | "separated"
  | "never_maried"
  | "living_with_partner";
type Prediction = Record<RelationshipStatus, number>;

type ApiResponse = {
  id: number;
  prediction: Prediction;
};

export default function Home() {
  const [education, setEducation] = useState<string>();
  const [age, setAge] = useState<string>();
  const [income, setIncome] = useState<string>();

  const ready = education && age && income;
  const [predictionResult, setPredictionResult] = useState<ApiResponse>();
  const [validateResult, setValidateResult] = useState<any>();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = new URL("/api/predict", window.location.toString());
    url.search = new URLSearchParams({
      income: income,
      ageBin: age,
      education: education,
    }).toString();
    const response = await fetch(url.toString());
    const result = await response.json();
    setPredictionResult(result);
  };

  const handleValidate = async (validate) => {
    if (!predictionResult?.id) {
      throw Error("can't store validated result with no id");
    }
    const resp = await fetch(`/api/validate`, {
      method: "POST",
      body: JSON.stringify({
        id: predictionResult?.id,
        validate,
      }),
    });
    const result = await resp.json();
    setValidateResult(result);
  };
  const predictedStatus = useMemo(() => {
    if (!predictionResult?.prediction) {
      return undefined;
    }
    const prediction = predictionResult.prediction;
    let maxRelationshipStatus: RelationshipStatus;
    // TODO: do this without Object.keys & casting (may not be possible)
    Object.keys(predictionResult.prediction).forEach((key) => {
      if (!maxRelationshipStatus) {
        maxRelationshipStatus = key as RelationshipStatus;
      } else if (prediction[key] > predictionResult[maxRelationshipStatus]) {
        maxRelationshipStatus = key as RelationshipStatus;
      }
    });

    return maxRelationshipStatus;
  }, [predictionResult]);

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
              <option disabled selected>
                {" "}
                -- select an option --{" "}
              </option>
              <option value={9}>GED</option>
              <option value={12}>Bachelor Degree</option>
              <option value={13}>Master's Degree</option>
              <option value={14}>PhD</option>
            </select>
            <label htmlFor="age">Age bucket:</label>

            <select
              id="age"
              value={age}
              onChange={(event) => setAge(event.target.value)}
            >
              <option disabled selected>
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h5>result</h5>
            <code>{predictedStatus}</code>
            <code>{JSON.stringify(predictionResult?.prediction)}</code>
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
