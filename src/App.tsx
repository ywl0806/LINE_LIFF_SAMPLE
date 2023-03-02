import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const env = import.meta.env;
  useEffect(() => {
    liff
      .init({
        liffId: env.VITE_LIFF_ID,
      })
      .then(async () => {
        setMessage("LIFF init succeeded.");

        if (!liff.isLoggedIn()) liff.login();

        liff.getProfile().then((profile) => {
          console.log("ログインしてるユーザーのid:" + profile.userId);
          console.log("ログインしてるユーザーの名前:" + profile.displayName);
          console.log("ログインしてるユーザーの画像URL:" + profile.pictureUrl);
        });

        const os = liff.getOS() ?? "";
        setName(os);
      })
      .catch((e: Error) => {
        setMessage("LIFF init failed.");
        setError(`${e}`);
      });
  });

  return (
    <div className="App">
      <h1>create-liff-app</h1>
      <h2>{env.VITE_LIFF_ID}</h2>
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
