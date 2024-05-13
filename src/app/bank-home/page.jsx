"use client";

import BankHomeComp from '@/components/bank-home/BankHomeComp';
import Head from 'next/head';
import React from 'react';

const BankHome = () => {
  return (
    <div>
      <Head>
        <title>Banks || Blood Link</title>
      </Head>
      <BankHomeComp />
    </div>
  );
};

export default BankHome;