import {
  Box,
  CardContent,
  Card,
  Container,
  Typography,
  Button,
} from "@mui/material";
import CallToActionSection from "./home/CallToActionSection";
import ContactUsSection from "./home/ContactUsSection";
import RunixExperienceSection from "./home/RunixExperienceSection";
import ServicesSection from "./home/ServicesSection";
import WhySection from "./home/WhySection";

const Home = () => {
  return (
    <>
      <CallToActionSection />
      <WhySection />
      <ServicesSection />
      <RunixExperienceSection />
      <ContactUsSection />
    </>
  );
};

export default Home;
