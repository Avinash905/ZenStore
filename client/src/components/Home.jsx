import React from "react";
import Hero from "./Hero";
import Services from "./Services";
import Trusted from "./Trusted";
import FeatureServices from "./FeatureServices";

function Home() {
  return (
    <>
      <Hero name="Zen Store" />
      <FeatureServices />
      <Services />
      <Trusted />
    </>
  );
}

export default Home;
