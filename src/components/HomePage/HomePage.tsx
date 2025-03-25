import React from 'react'
import CollectionSlider from '../CollectionSlider'
import Image from 'next/image'
import HeaderImg from "@/../public/images/sol_puff_dog.png"

export default function HomePage() {

  return (
    <div className="flex items-center justify-center max-w-[1440px] w-full flex-col gap-6 mx-auto">
      <div className="flex flex-col gap-8 items-center justify-center px-4">

        <div className="flex flex-col md:flex-row w-full items-center justify-center gap-4">
          <div className="flex flex-col gap-2">
            <Image src={HeaderImg} alt="HeaderImg" className="w-full max-w-[480px] flex flex-col mx-auto" />
            {/* <p className="flex flex-col w-full text-center text-white text-xl md:text-2xl lg:text-3xl">
              Chill, Collect, & Win Big!
            </p> */}
          </div>

        </div>
        <div className="flex flex-col justify-center items-center text-center w-full h-full gap-6 max-w-[1024px] mx-auto text-white text-lg px-2">
          PUFF DOG (PUFF) is a meme-driven cryptocurrency built on the Solanablockchain, integrating NFTs and gaming tocreate an engaging ecosystem for the PUFF community.
        </div>
      </div>
      <CollectionSlider loadingState={false} />

      <div className="flex flex-col items-center w-[200px] justify-center">
        <a href={"#mint"} className="flex flex-col px-6 py-2 rounded-lg bg-[#f59e0b] text-white font-bold text-lg">
          Mint Now
        </a>
      </div>
    </div>
  )
}
