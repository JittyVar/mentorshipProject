import FormPage from "./form/page";

const Home = () => {
  return (
    <div>
      <a href="/api/auth/logout">Logout</a>
      <FormPage />
    </div>
  );
};

export default Home;
