import { PageWrapper } from "../styles/styles";
import { Outlet } from "react-router-dom";
import MainHeader from "./Header/MainHeader";
import Footer from "./Footer/Footer";
import Sidebar from "./sidebar/Sidebar";

const MainLayout = () => {
  return (
    <PageWrapper>
      <MainHeader/>
      <Sidebar/>
      <div
        style={{
          minHeight: "calc(100vh - 545px)",
        }}
      >
        <Outlet />
      </div>
      <Footer />
    </PageWrapper>
  );
};

export default MainLayout;
