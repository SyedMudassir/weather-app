import Card from "./components/Card"
import React from "react";
import { io } from "socket.io-client";

import "./App.css";

function App() {
  const socket = io.connect("http://localhost:4000");
  
  return (
    <div className="App">
        <Card/>

        {console.log(socket)}
    </div>
  );
}

export default App;
