import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";
export interface Profile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

function App() {
  const [profile, setProfile] = useState<Profile>({
    userId: "",
    displayName: "",
  });
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

        const newProfile = await liff.getProfile();

        setProfile(newProfile);
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
      <h3>{profile.displayName}</h3>
      <h3>{profile.statusMessage}</h3>
      <h3>{profile.userId}</h3>
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
