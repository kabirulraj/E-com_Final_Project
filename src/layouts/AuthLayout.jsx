import { PageWrapper } from "../styles/styles";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import AuthHeader from "./Header/AuthHeader";

const AuthLayout = () => {
  return (
    <PageWrapper>
      <AuthHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
    </PageWrapper>
  );
};

export default AuthLayout;
