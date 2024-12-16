import styled from "styled-components";
import Banner from "../../Components/home/Banner";
import Featured from "../../Components/home/Featured";
import SavingZone from "../../Components/home/SavingsZone";
import Brands from "../../Components/home/Brands";
import Feedback from "../../Components/home/Feedback";

const HomeScreenWrapper = styled.main``;

const HomeScreen = () => {
  return (
    <HomeScreenWrapper>
      <Banner/>
      <Featured/>
      <SavingZone/>
      <Brands/>
      <Feedback/>
      
    </HomeScreenWrapper>
  );
};

export default HomeScreen;
