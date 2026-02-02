import React from "react";
import HeroBanner from "../../components/MainHome/HeroBanner";
import ClientMarquee from "../../components/MainHome/ClientMarquee";
import AboutNZL from "../../components/MainHome/AboutNZL";
import ServicesBenefits from "../../components/MainHome/ServicesBenefits";
import HowNZLWorks from "../../components/MainHome/HowNZLWorks";
import TestimonialsMarquee from "../../components/MainHome/TestimonialsMarquee";
import DownloadAppSection from "../../components/MainHome/DownloadAppSection";
import FAQSection from "../../components/MainHome/FAQSection";
import TrustNZL from "../../components/MainHome/TrustNZL";
import ArsenalSection from "../../components/MainHome/ArsenalSection";
import StayConnectedSection from "../../components/MainHome/StayConnectedSection";
import StayInTheLoop from "../../components/MainHome/StayInTheLoop";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// const MainHome = () => {
//   return (
//    <>
//    <HeroBanner />

//    {/* <ClientMarquee/> */}
//    <AboutNZL/>
//    <TrustNZL/>
//    <ArsenalSection/>
//    <StayConnectedSection/>
//    {/* <ServicesBenefits/> */}

//    {/* <HowNZLWorks/> */}
//    <TestimonialsMarquee/>
//    <StayInTheLoop/>
//    <DownloadAppSection/>
//    {/* <FAQSection/> */}
//    </>
//   )
// }
const MainHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      //   If already logged in → go dashboard
      if (token) {
        navigate("/dashboard", { replace: true });
      }
    };

    // Run on load
    checkAuth();

    // Listen for login from another tab
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, [navigate]);

  return (
    <>
      <HeroBanner />
      <AboutNZL />
      <TrustNZL />
      <ArsenalSection />
      <StayConnectedSection />
      <TestimonialsMarquee />
      <FAQSection/>
      <StayInTheLoop />
      <DownloadAppSection />
    </>
  );
};

export default MainHome;
