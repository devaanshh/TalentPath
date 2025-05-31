import React, { useState } from "react";
import WelcomePage from "./components/WelcomePage";
import RecommendationForm from "./components/RecommendationForm";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className="App">
      {showWelcome ? (
        <WelcomePage onNext={() => setShowWelcome(false)} />
      ) : (
        <RecommendationForm />
      )}
    </div>
  );
}

export default App;
