import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useWallet } from "@solana/wallet-adapter-react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { LuAlignCenter } from 'react-icons/lu';
import Link from 'next/link';
import { ModalContext } from "@/contexts/ModalContext";
import { NFTDataContext } from "@/contexts/NFTDataContext";
import { CANDYMACHINE_ID, COLLECTION_MINT, SOLANA_RPC } from "@/config";

import {
  dateTime,
  generateSigner,
  keypairIdentity,
  none,
  Option,
  publicKey,
  sol,
  SolAmount,
  some,
  transactionBuilder,
  TransactionBuilderSendAndConfirmOptions,
  Umi,
  unwrapSome,
} from "@metaplex-foundation/umi";
import { walletAdapterIdentity, walletAdapterPayer } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { setComputeUnitLimit, setComputeUnitPrice } from "@metaplex-foundation/mpl-toolbox";
import {
  burnV1,
  findMetadataPda,
  mplTokenMetadata,
  TokenStandard,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  fetchCandyMachine,
  mintV2,
  safeFetchCandyGuard,
  DefaultGuardSetMintArgs,
  DefaultGuardSet,
  SolPayment,
  CandyMachine,
  CandyGuard,
} from "@metaplex-foundation/mpl-candy-machine";
import { addConfigLines, mintV1, mplCandyMachine, updateCandyMachine as updateCoreCandyMachine } from '@metaplex-foundation/mpl-core-candy-machine'
import { create, mplCandyMachine as mplCoreCandyMachine, fetchCandyMachine as fetchCoreCandyMachine } from "@metaplex-foundation/mpl-core-candy-machine";
import { errorAlert, successAlert } from "@/components/ToastGroup";
import { LoadingModal } from '../Spinners';
import { Connection, LAMPORTS_PER_SOL, SystemProgram, Transaction } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import axios from 'axios';

export default function Introduction() {

  const wallet = useWallet();
  const { connected, publicKey: pubkey } = useWallet();
  const { ownNFTs, getOwnNFTs } = useContext(NFTDataContext);
  const [countRemaining, setCountRemaining] = useState<number>(0);
  const [mintDisabled, setMintDisabled] = useState<boolean>(true);

  const [mintLoading, setMintLoading] = useState<boolean>(false);
  const memorizedOwnNFTs = useMemo(() => ownNFTs, [ownNFTs]);

  const umi = createUmi(SOLANA_RPC);
  umi
    .use(mplTokenMetadata())
    .use(mplCandyMachine())
    .use(walletAdapterIdentity(wallet));

  const options: TransactionBuilderSendAndConfirmOptions = {
    send: { skipPreflight: true },
    confirm: { commitment: 'processed' },
  }

  interface MintResponse {
    signatuer: string;
    status: string;
  }

  const getCountAmount = async () => {
    // try {
    //   const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    //   const response = await axios.get(`${BACKEND_URL}/api/mint/getCount`);
    //   console.log("response.data : ", response.data)
    //   // setCountRemaining(response.data)
    // } catch (error) {
    //   throw new Error(`Failed to get count: ${error}`);

    // }
  }

  const getMintStatus = async (signature: string) => {
    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await axios.get<MintResponse>(`${BACKEND_URL}/api/mint/${signature}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch mint status: ${error}`);
    }
  }

  const handleMint = async () => {
    console.log("handle mint on introduction");
    setMintLoading(true)
    // 6. Mint NFTs
    try {
      const devnet = process.env.NEXT_PUBLIC_DEVNET_RPC || 'https://api.devnet.solana.com';
      const connection = new Connection(devnet);

      const amount = parseFloat(process.env.NEXT_PUBLIC_MINT_PRICE || "0"); // Ensure amount is a number
      const backendWalletAddress = process.env.NEXT_PUBLIC_BACKEND_WALLET;

      // Validate the environment variables
      if (!backendWalletAddress) {
        throw new Error("NEXT_PUBLIC_BACKEND_WALLET environment variable is not set!");
      }

      if (!amount || isNaN(amount) || amount <= 0) {
        throw new Error("NEXT_PUBLIC_MINT_PRICE is not properly defined!");
      }

      // Ensure the backend wallet address is a valid PublicKey
      let Backend_Wallet: PublicKey;
      try {
        Backend_Wallet = new PublicKey(backendWalletAddress);
      } catch (error) {
        throw new Error("Invalid NEXT_PUBLIC_BACKEND_WALLET address! Please check the value of the environment variable.");
      }

      // Validate the user's wallet
      if (!wallet || !wallet.publicKey) {
        throw new Error("Wallet is not connected or the public key is missing!");
      }

      // Create the transaction
      const transferTx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey, // Sender's public key
          toPubkey: Backend_Wallet,    // Backend wallet's public key
          lamports: amount * LAMPORTS_PER_SOL // Convert amount to lamports
        })
      );
      transferTx.feePayer = wallet.publicKey;
      transferTx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      const lastValidBlockHeight = (await connection.getLatestBlockhash()).lastValidBlockHeight;

      // Verify that the wallet can sign the transaction
      if (wallet.signTransaction) {
        const signedTx = await wallet.signTransaction(transferTx);
        const sTx = signedTx.serialize();
        console.log('----', await connection.simulateTransaction(signedTx));
        const signature = await connection.sendRawTransaction(
          sTx,
          {
            preflightCommitment: 'confirmed',
            skipPreflight: false
          }
        );
        const res = await connection.confirmTransaction(
          {
            signature,
            blockhash: transferTx.recentBlockhash,
            lastValidBlockHeight: lastValidBlockHeight,
          },
          "confirmed"
        );

        console.log("Successfully initialized.\n Signature: ", signature);

        // successAlert("Successfully launched tokens.")
        const resBack = await getMintStatus(signature);
        console.log("respons from backend: ", resBack)
        successAlert("Successfully mint NFT.")
        setMintLoading(false)
        return res;
      }
    }
    catch (error) {
      console.log("handle mint error")
      setMintLoading(false)
    }
  }

  useEffect(() => {
    getCountAmount()
  }, [])

  return (
    <div className='max-w-7xl mx-auto w-full flex flex-col items-center text-center py-8 px-4'>
      <div className='flex flex-col gap-6 items-center justify-center'>
        <div className='flex flex-col gap-2 md:gap-0 md:flex-row justify-between items-center w-full'>
          <div className='flex flex-col gap-2 justify-center w-full items-center text-center'>
            <span className='text-lg md:text-xl lg:text-2xl text-black font-extrabold font-arco'>
              Buy Puff Dog NFT
            </span>
            <span className='text-[10px] md:text-[12px] lg:text-sm text-black w-full font-semibold'>
              (MINT YOUR PUFF DOG TODAY & START WINNING!)
            </span>
          </div>
          <div className='w-full flex flex-col justify-center items-center gap-2'>
            <div className="w-full flex items-center justify-start gap-2 flex-col">
              <span className="text-black text-sm sm:text-lg font-semibold">
                {countRemaining} / 10000 Available
              </span>
            </div>
            <div className='flex flex-row gap-3.5 items-center justify-center w-full text-center'>
              <LuAlignCenter className='text-2xl lg:text-3xl text-black' />
              <span className='text-base md:text-lg lg:text-xl text-black  font-extrabold'>
                {process.env.NEXT_PUBLIC_MINT_PRICE} SOL* + GAS
              </span>
            </div>
          </div>

          <div className='flex flex-col w-full items-center'>
            <div onClick={() => handleMint()} className='bg-black text-white text-lg font-extrabold px-12 py-2.5 rounded-lg mx-auto cursor-pointer'>
              Mint Now
            </div>
          </div>
        </div>
        <div className='flex flex-col text-black justify-center items-center w-full text-[12px] sm:text-sm md:text-base lg:text-lg font-bold'>
          Don't wait—these rare NFTs won't last forever. Grab yours now, lock in your rewards, and let the good vibes roll!
        </div>
        {/* <div className='w-full h-full flex flex-col mx-auto'>
          <Countdown />
        </div> */}
        <div className='flex flex-col w-full justify-center items-center'>
          <div onClick={() => handleMint()} className='bg-black text-white text-lg font-extrabold px-12 py-2.5 rounded-lg mx-auto cursor-pointer'>
            Mint Puff Dogs NFT
          </div>
        </div>
      </div>
      {mintLoading &&
        <LoadingModal />
      }
    </div>
  )
}
