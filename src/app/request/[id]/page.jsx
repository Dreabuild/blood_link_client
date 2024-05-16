"use client";
import React from "react";
import Head from "next/head"
import SingleRequest from "@/components/request/SingleRequest";
import { useRouter } from "next/router";

const SingleRequestPage = () => {

  const router = useRouter();

  const { id } = router.query;

  console.log(router)
  console.log(id)
  return (
    <div>
      <Head>
        <title>Request Details || Blood Link</title>
      </Head>
      <SingleRequest/>
    </div>
  );
};

export default SingleRequestPage;
