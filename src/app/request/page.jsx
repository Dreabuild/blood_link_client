"use client";
import React from "react";
import Head from "next/head"
import SendRequest from "@/components/request/SendRequest";

const SendRequestPage = () => {
  return (
    <div>
      <Head>
        <title>Send Request || Blood Link</title>
      </Head>
      <SendRequest/>
    </div>
  );
};

export default SendRequestPage;
