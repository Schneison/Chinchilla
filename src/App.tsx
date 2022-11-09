import React from "react";
import logo from "./logo.svg";
import "./App.css";
import UserPage from "./pages/user/UserPage";

function App() {
    return (
        <div className="App">
            <header className="App-header" />
            <div className="App-body">
                <UserPage />
            </div>
        </div>
    );
}

export default App;
