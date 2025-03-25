import { FaqData } from '@/data/FaqsData'
import React, { useState } from 'react'

export default function FaqList() {
  const [faqState, setFaqState] = useState<string>("")

  const selectFaq = (target: string) => {
    if (target === faqState) {
      setFaqState("")
    } else {
      setFaqState(target)
    }
  }

  return (
    <div className="flex items-center justify-center max-w-sm sm:max-w-md sm2:max-w-[500px] md:max-w-xl md2:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl w-[90%] flex-col gap-3 py-8 px-4 mx-auto">
      <div className="w-full flex flex-col gap-2 text-white justify-center text-center">
        <span className="text-[12px] md:text-sm lg:text-base font-semibold">
          Need more information? Please read our
        </span>
        <p className="text-6xl font-extrabold font-arco">
          FAQS
        </p>
      </div>
      <div className="flex flex-col gap-6 w-full items-center p-4 pb-10">
        {FaqData.map((item: any, index: number) => {
          return (
            <div key={index} className="flex flex-col w-full h-full items-center justify-center">
              <div onClick={() => selectFaq(item.title)} className="flex flex-col font-extrabold p-4 text-black text-base md:text-lg lg:text-xl relative w-full bg-white rounded-xl cursor-pointer">
                {item.title}
              </div>
              <div className={`${faqState === item.title ? "h-full opacity-100 pt-3 lg:pt-6 pb-3 px-6 lg:px-10 -mt-3" : "h-0 opacity-0 py-0 px-0"} w-full flex flex-col font-semibold text-black text-sm md:text-base lg:text-lg bg-white rounded-b-xl duration-300`}>
                {item.text}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
