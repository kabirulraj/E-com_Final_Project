import { PageWrapper } from "../styles/styles";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import AuthHeader from "./Header/AuthHeader";

const AuthLayout = () => {
  return (
    <PageWrapper>
      <AuthHeader />
      <h1 style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', width: '100%', padding:'50px', fontFamily:'-moz-initial' }}>Welcome to Our Zapvi Website</h1>
      <main>
        <Outlet />
      </main>
      <Footer />
    </PageWrapper>
  );
};

export default AuthLayout;
