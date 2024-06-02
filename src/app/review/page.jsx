import React from "react";
import Head from "next/head";
import SendReview from "@/components/review/SendReview";

const SendReviewPage = () => {
  return (
    <div>
      <Head>
        <title>Send Review || Blood Link</title>
      </Head>
      <SendReview />
    </div>
  );
};

export default SendReviewPage;
