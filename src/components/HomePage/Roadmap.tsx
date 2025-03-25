import { RoadmapData } from '@/data/RoadmapData';
import React from 'react'

export default function Roadmap() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <div className="flex flex-col gap-2 w-full justify-center items-center text-center text-white">
        <div className="flex flex-col text-4xl md:text-5xl lg:text-6xl font-extrabold font-arco">
          ROADMAP
        </div>
        <span className="text-sm md:text-base lg:text-lg font-semibold">
          Puff Dog NFT Collection
        </span>
      </div>
      <div className="w-full h-full flex flex-col justify-end items-end left-0">
        <div className="flex flex-col w-[90%] sm:w-1/2 border-l-[8px] border-l-white py-3 gap-4 relative">
          {RoadmapData.map((item: any, index: number) => {
            const isLeftAligned = index % 2 === 0; // Alternate between left and right

            return (
              <div key={index} className="flex flex-row w-full h-full gap-2 relative">
                {/* Circular Indicator */}
                <div className="min-w-10 h-10 sm:min-w-16 sm:h-16 rounded-full bg-white relative top-3 sm:top-0 -left-6 sm:-left-9 text-white flex justify-center items-center text-center"></div>

                {/* Roadmap Item */}
                <div
                  className={`flex flex-col gap-2 w-[90%] h-full top-0 relative px-2 md:px-3 lg:px-4 py-2.5 md:py-4 lg:py-6 justify-center items-center bg-white rounded-xl sm:mr-16 ${isLeftAligned ? "self-start -left-4" : "self-end -left-4 sm:-left-[100%]"
                    }`}
                >
                  <div className={`${isLeftAligned ? "-left-2" : "-right-2"} hidden sm:flex w-4 h-4 bg-white rotate-45 absolute top-6`}></div>
                  <div className="flex sm:hidden w-4 h-4 bg-white rotate-45 absolute top-6 -left-2"></div>
                  <span className="text-xl md:text-2xl lg:text-3xl text-black text-start w-full font-extrabold">
                    {item.title}
                  </span>
                  <span className="text-sm md:text-base lg:text-lg text-black">{item.text}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
