import React from "react";
import Head from "next/head"
import DonarRegComp from "@/components/donor/DonarRegComp";

const DonarRegPage = () => {
  return (
    <div>
      <Head>
        <title>Donar Registration || Blood Link</title>
      </Head>
      <DonarRegComp/>
    </div>
  );
};

export default DonarRegPage;
