"use client";
import { useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseConfig";
import LoginPage from "./login";

export default function AccessGroupsPage() {
  const [inputValue, setInputValue] = useState<string>("");
  const [data, setData] = useState<string[]>([]);

  // Firestore'ye veri yazma
  const writeData = async () => {
    try {
      await addDoc(collection(db, "sampleData"), {
        text: inputValue,
      });
      alert("Document successfully written!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Firestore'dan veri okuma
  const readData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "sampleData"));
      const dataList: string[] = [];
      querySnapshot.forEach((doc) => {
        dataList.push(doc.data().text);
      });
      setData(dataList);
    } catch (e) {
      console.error("Error fetching documents: ", e);
    }
  };

  return (
    <div>
      {/* Login Page Bileşeni */}
      <LoginPage /> {/* Burada login.tsx bileşenini render ediyoruz */}
      <h1>Hello, This is the Page for Access group overview</h1>
      <div style={{ padding: "2rem" }}>
        <h1>Firestore Write & Read Example</h1>

        {/* Input Field */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter some text"
          style={{ padding: "0.5rem", marginBottom: "1rem" }}
        />

        {/* Button to write data */}
        <button onClick={writeData} style={{ marginRight: "1rem", padding: "0.5rem 1rem" }}>
          Write to Firestore
        </button>

        {/* Button to read data */}
        <button onClick={readData} style={{ padding: "0.5rem 1rem" }}>
          Read from Firestore
        </button>

        {/* Display fetched data */}
        <div style={{ marginTop: "2rem" }}>
          <h2>Fetched Data:</h2>
          {data.length > 0 ? (
            <ul>
              {data.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
}
