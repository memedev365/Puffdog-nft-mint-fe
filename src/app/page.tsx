"use client";
/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import React from "react";
import MainPageLayout from "@/components/Layout";
import Introduction from "@/components/Introduction";
import HomePage from "@/components/HomePage/HomePage";
import Roadmap from "@/components/HomePage/Roadmap";
import FaqList from "@/components/HomePage/FaqList";

const Home: NextPage = () => {

  return (
    <MainPageLayout>
      <React.StrictMode>
        <div className="w-full flex flex-col items-center justify-center duration-300">
          <div id="home" className="w-full min-h-[60px] md:min-h-[102px] flex flex-col">
          </div>
          <div className="flex flex-col w-full h-full min-h-[calc(100vh-60px)] md:min-h-[calc(100vh-102px)] bg-black">
            <HomePage />
          </div>

          <div id="mint" className="w-full min-h-[60px] md:min-h-[102px] flex flex-col">
          </div>
          <div className="flex flex-col w-full h-full bg-white">
            <div className="flex items-center justify-center max-w-[1440px] w-full flex-col gap-3 py-8 mx-auto">
              <Introduction />
            </div>
          </div>

          <div id="roadmap" className="w-full min-h-[60px] md:min-h-[102px] flex flex-col">
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full bg-black">
            <div className="flex items-center justify-center max-w-[1440px] w-full flex-col gap-3 py-8 mx-auto">
              <Roadmap />
            </div>
          </div>

          <div id="faq" className="w-full min-h-[60px] flex flex-col">
          </div>
          <div className="flex flex-col w-full justify-center items-center h-full bg-black">
            <FaqList />
          </div>

        </div>
      </React.StrictMode>
    </MainPageLayout>
  );
};

export default Home;
