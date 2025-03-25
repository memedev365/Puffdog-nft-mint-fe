"use client";

import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { web3 } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { ExitIcon } from "../SvgIcons";
import ConnectButton from "../WalletConnectButton";
import { SOLANA_RPC, SOL_DECIMAL } from "@/config";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaWallet } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { FaUser, FaHome } from "react-icons/fa";
import { BiMenu, BiSearch } from "react-icons/bi";
import { TfiWorld } from "react-icons/tfi";
import { FaExchangeAlt } from "react-icons/fa";

import { MdClear, MdSettings } from "react-icons/md";
import { CgClose, CgWebsite } from "react-icons/cg";
import Image from "next/image";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { ModalContext } from "@/contexts/ModalContext";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { BsDiscord, BsTwitterX } from "react-icons/bs";
import { BalanceProps, HeaderProps } from "@/types/types";
import { NFTDataContext } from "@/contexts/NFTDataContext";
import { IoMenu } from "react-icons/io5";

const Header: FC<HeaderProps> = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = usePathname();
  const { publicKey, connected } = useWallet();
  const { openSearchCollectionModal, setFilterWith } = useContext(ModalContext);
  const { myBalance, solPrice } = useContext(NFTDataContext);
  const [isFocused, setIsFocused] = useState(false);
  const [menuState, setMenuState] = useState(false)

  useOnClickOutside(inputRef, () => setIsFocused(false));

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        setIsFocused(true);
        inputRef.current?.focus();
        openSearchCollectionModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="fixed w-full bg-black z-[9] overflow-visible">
      <div className="py-2 px-4 flex items-center justify-between relative w-full mx-auto max-w-[1460px]">
        <a href={"/"} className="z-[1]">
          <div className="flex items-center justify-center gap-3">
            <div className="md:w-[260px] md:h-[86px] w-[130px] h-[44px] relative  overflow-visible" style={{ overflow: "visible" }}>
              <Image
                src="/images/sol_puff_dog.png"
                fill
                alt=""
                className="object-cover"
                sizes=""
              />
            </div>
          </div>
        </a>

        <div className="flex items-center z-[1]">
          <ul className="md:flex hidden items-center justify-center gap-6 lg:gap-12 font-bold">
            <li className="text-white text-base lg:text-xl cursor-pointer uppercase ">
              <a href="#home">Home</a>
            </li>
            <li className="text-white text-base lg:text-xl cursor-pointer uppercase ">
              <a href="#mint">Mint</a>
            </li>
            <li className="text-white text-base lg:text-xl cursor-pointer uppercase ">
              <a href="#roadmap">roadmap</a>
            </li>
            <li className="text-white text-base lg:text-xl cursor-pointer uppercase ">
              <a href="#faq">faq</a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col text-white relative">
          {connected && (
            <BalanceBox myBalance={myBalance} address={publicKey} />
          )}
          {!connected && <ConnectButton />}
        </div>
      </div>
    </header >
  );
};

export default Header;

const BalanceBox: FC<BalanceProps> = ({ myBalance }) => {
  const { setVisible } = useWalletModal();
  const { publicKey, disconnect } = useWallet();
  const [openModal, setOpenModal] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const elem = useRef(null);
  useOnClickOutside(elem, () => setOpenModal(false));

  const handleCopy = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58());
      setShowCheck(true);
      setTimeout(() => {
        setShowCheck(false);
      }, 1000);
    }
  };
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex gap-2 items-center justify-center cursor-pointer`}
        onClick={() => setOpenModal(true)}
      >
        <div className="flex sm2:hidden px-2 sm2:px-10 py-2 cursor-pointer border-white border-[1px] rounded-full">
          <IoMenu className="text-xl" />
        </div>

        <div className="sm2:flex flex-row gap-1 hidden px-10 py-2 cursor-pointer border-white border-[1px] rounded-full">
          <div className="w-[14px] h-[14px] sm2:w-[18px] sm2:h-[18px] relative">
            <Image
              src="/svgs/solana-sol-logo.svg"
              alt="Avatar"
              fill
              className=""
            />
          </div>
          <span className="text-white text-lg leading-[1]">
            {myBalance?.toFixed(2)} SOL
          </span>
        </div>
      </div>
      <div
        className={`w-[300px] absolute -right-1 2sm:right-[10px] top-[40px] sm2:top-[60px] md:top-[70px] bg-black border-white border-opacity-30 shadow-md shadow-[#ebdb6042] border rounded-md hover:duration-300 z-[9999] duration-200 origin-top-right`}
        ref={elem}
        style={{
          opacity: openModal ? 1 : 0,
          scale: openModal ? 1 : 0.6,
          pointerEvents: openModal ? "all" : "none",
        }}
      >
        <div className="w-full flex items-center justify-between px-2 py-2 border-b border-customborder">
          <div className="flex items-center justify-center gap-2">
            <div className="relative w-[30px] h-[30px] rounded-full gap-3">
              <Image
                alt="Avatar"
                src={"/svgs/initialAvatar.svg"}
                fill
                className="rounded-full"
              />
            </div>
            <span className="text-white">
              {publicKey?.toBase58().slice(0, 4) +
                "...." +
                publicKey?.toBase58().slice(-4)}
            </span>
          </div>
          <span
            className="cursor-pointer mb-3"
            onClick={() => setOpenModal(false)}
          >
            <CgClose color="white" size={22} />
          </span>
        </div>
        <ul className=" border-gray-500 rounded-lg bg-black p-2 mt-1 pt-2">
          <li className="flex gap-2 items-center mb-3 text-sm duration-300 text-white transition-all w-full justify-between">
            <span className="flex items-center justify-center gap-[7px]">
              <FaWallet color="#86B0A8" size={15} className="pl-[2px]" />
              My Wallet :
            </span>
            <span className="flex items-center justify-center gap-1">
              {publicKey?.toBase58().slice(0, 4) +
                "...." +
                publicKey?.toBase58().slice(-4)}
              <span className="cursor-pointer">
                {!showCheck && <FaCopy onClick={handleCopy} />}
                {showCheck && <FaCheck />}
              </span>
            </span>
          </li>
          <li className="flex gap-2 items-center mb-3 text-sm text-white transition-all cursor-pointer">
            <FaHome size={17} color="#86B0A8" className="pl-[2px]" />
            <a href="#home">Home</a>
          </li>
          <li className="flex gap-[5px] items-center mb-3 text-sm text-white transition-all cursor-pointer">
            <MdSettings size={17} color="#86B0A8" />
            <a href="#mint">Mint</a>
          </li>
          <li className="flex gap-[5px] items-center mb-3 text-sm text-white transition-all cursor-pointer">
            <MdSettings size={17} color="#86B0A8" />
            <a href="#roadmap">Roadmap</a>
          </li>
          <li className="flex gap-[5px] items-center mb-3 text-sm text-white transition-all cursor-pointer">
            <MdSettings size={17} color="#86B0A8" />
            <a href="#faq">faq</a>
          </li>
          <li>
            <div
              className="flex gap-2 items-center mb-3 text-sm text-white transition-all cursor-pointer"
              onClick={() => setVisible(true)}
            >
              <FaExchangeAlt size={14} color="#86B0A8" className="pl-[2px]" />{" "}
              Change Wallet
            </div>
          </li>
          <li className="border-b-[1px] border-white border-opacity-15 pb-3">
            <button
              className="flex gap-[6px] items-center text-sm text-white transition-all cursor-pointer"
              onClick={disconnect}
            >
              <ExitIcon className="brightness-200" /> Disconnect
            </button>
          </li>
          <li className="flex items-center justify-start gap-3 p-2">
            <span className="text-white bg-gray-600 p-2 rounded-md hover:bg-gray-700 duration-300 cursor-pointer">
              <BsTwitterX />
            </span>
            <span className="text-white bg-gray-600 p-2 rounded-md hover:bg-gray-700 duration-300 cursor-pointer">
              <BsDiscord />
            </span>
            <span className="text-white bg-gray-600 p-2 rounded-md hover:bg-gray-700 duration-300 cursor-pointer">
              <TfiWorld />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

const MobileMenu: FC<{ openMobileMenu: boolean; close: () => void }> = ({
  openMobileMenu,
  close,
}) => {
  const router = usePathname();

  return (
    <div
      className={`fixed top-0 bottom-0 left-0 right-0 bg-gray-900 z-[9999] flex items-center justify-center lg:hidden 
    ${!openMobileMenu && "hidden"}`}
    >
      <div className="absolute top-4 right-3" onClick={close}>
        <CgClose size={25} color="white" />
      </div>
      <ul className="flex items-center justify-center gap-4 flex-col">
        <li
          className={`text-white font-normal uppercase text-3xl ${router === "/" && "border-b-[1px] border-white"
            }`}
        >
          <a href="#home">Mint</a>
        </li>
        <li
          className={`text-white font-normal uppercase text-3xl ${router === "/market" && "border-b-[1px] border-white"
            }`}
        >
          <a href={"/market"}>Marketplace</a>
        </li>
      </ul>
    </div>
  );
};
