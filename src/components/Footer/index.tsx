"use client";
import { FaXTwitter, FaSquareInstagram, FaTelegram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { SiOpensea } from "react-icons/si";
import { IoGameControllerSharp } from "react-icons/io5";

export default function Footer() {

  const SocialList = [
    { text: "twitter", icon: <FaXTwitter />, url: "https://x.com/PuffDogCoin" },
    { text: "instagram", icon: <FaSquareInstagram />, url: "https://www.instagram.com/puffdogcoin" },
    { text: "tiktok", icon: <FaTiktok />, url: "https://www.tiktok.com/@puffdogcoin" },
    { text: "telegram", icon: <FaTelegram />, url: "https://t.me/PUFFDOGs" },
    { text: "Website", icon: <TbWorld />, url: "https://puffdog.vip/" },
    { text: "Opensea", icon: <SiOpensea />, url: "https://opensea.io/" },
    { text: "Game", icon: <IoGameControllerSharp />, url: "https://sshib.games/PUFF_DOG_DASH/" },
  ]

  return (
    <div className="w-full h-full py-3 flex flex-col items-center justify-center z-50 bg-black text-white px-4">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex flex-row gap-3 items-center justify-center mx-auto">
          {SocialList.map((item: any, index: number) => {
            return (
              <a key={index} href={item.url} className="flex flex-col p-2 text-white rounded-full text-xl">
                {item.icon}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  );
}
