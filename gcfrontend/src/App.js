import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/layout/header/Header";
import ThemeSwitcher from "./components/common/theme/ThemeSwitcher";

function App() {
  return (
    <div className="App">
      <Header />
      <ThemeSwitcher />
      <AppRoutes />
    </div>
  );
}

export default App;

