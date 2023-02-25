import { InputHTMLAttributes, useState } from "react";
import "./App.css";

function App() {
  const [error, setError] = useState("");

  const handleUpload = (e: any) => {
    const file = e.target.files[0];
    console.log(file);

    if (file.type !== "image/png") {
      setError("File must be in PNG format");
      return;
    }

    if (file.size > 5 * 1000000) {
      setError("File size must be less than 5MBs");
      return;
    }

    let img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      const ratio = img.height / img.width;
      console.log(ratio);
      if (ratio > 2 || ratio < 0.5) {
        setError("Image ratio must not exceed 2");
      }
    };

    setError("");
  };

  return (
    <div className="App">
      <input type="file" onChange={handleUpload} />

      {error && <h3>{error}</h3>}
    </div>
  );
}

export default App;
