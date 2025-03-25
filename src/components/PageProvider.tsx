"use client";
import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import SolanaWalletProvider from "@/contexts/WalletContext";
import { NFTDataProvider } from "@/contexts/NFTDataContext";
import { ModalProvider } from "@/contexts/ModalContext";
import Header from "./Header";
import Footer from "./Footer";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { CollectionProvider } from "@/contexts/CollectionContext";
import Progressbar from "./Progressbar";

export default function PageProvider({ children }: { children: ReactNode }) {
  return (
    <SolanaWalletProvider>
      <CollectionProvider>
        <NFTDataProvider>
          <ModalProvider>
            <LoadingProvider>
              <Header />
              {children}
              <Footer />
              <ToastContainer
                pauseOnFocusLoss={false}
                theme="colored"
                stacked
              />
              <Progressbar />
            </LoadingProvider>
          </ModalProvider>
        </NFTDataProvider>
      </CollectionProvider>
    </SolanaWalletProvider>
  );
}
