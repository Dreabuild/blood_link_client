"use client";
import React from "react";
import Head from "next/head";
import SingleRequest from "@/components/request/SingleRequest";

const SingleRequestPage = () => {
  return (
    <div>
      <Head>
        <title>Request Details || Blood Link</title>
      </Head>
      <SingleRequest />
    </div>
  );
};

export default SingleRequestPage;
