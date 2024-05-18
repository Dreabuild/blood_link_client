import HomeComp from '@/components/home/HomeComp';
import Head from 'next/head';
import React from 'react';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home || Blood Link</title>
      </Head>
      <HomeComp/>
      
    </div>
  );
};

export default Home;