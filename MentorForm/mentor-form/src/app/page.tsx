import React from "react";
import LoginPage from "./login/page";

const Home = () => {
  return (
    <div>
      <LoginPage isAuthenticated={false} />
    </div>
  );
};

export default Home;
