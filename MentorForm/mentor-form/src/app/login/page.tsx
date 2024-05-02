"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import FormPage from "../form/FormPage";
import RegistrationEnded from "../form/registrationEnd/RegistrationEnd";

interface LoginPageProps {
  isAuthenticated: boolean;
}
const LoginPage: React.FC<LoginPageProps> = ({ isAuthenticated }) => {
  const { user } = useUser();

  if (user) {
    if (isAuthenticated) {
      return <FormPage />;
    } else {
      return <RegistrationEnded />;
    }
  }
  return <a href="/api/auth/login">login</a>;
};

export default LoginPage;
