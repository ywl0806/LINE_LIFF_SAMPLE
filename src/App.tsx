import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    liff
      .init({
        liffId: "1660682589-pm6rr6GA",
      })
      .then(async () => {
        setMessage("LIFF init succeeded.");

        if (!liff.isLoggedIn()) liff.login();

        const profile = await liff.getProfile();
        setName(profile.displayName);
      })
      .catch((e: Error) => {
        setMessage("LIFF init failed.");
        setError(`${e}`);
      });
  });

  return (
    <div className="App">
      <h1>create-liff-app</h1>
      {name && <h1>hello {name}</h1>}
      {message && <p>{message}</p>}
      {error && (
        <p>
          <code>{error}</code>
        </p>
      )}
    </div>
  );
}

export default App;
