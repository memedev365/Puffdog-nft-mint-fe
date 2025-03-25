/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import LogoImg from "@/../public/images/sol_logo.png"

export const FoldingCubeSpinner = () => {
  return (
    <div className="sk-folding-cube">
      <div className="sk-cube1 sk-cube"></div>
      <div className="sk-cube2 sk-cube"></div>
      <div className="sk-cube4 sk-cube"></div>
      <div className="sk-cube3 sk-cube"></div>
    </div>
  );
};

export const DiscordSpinner = () => {
  return (
    <div className="spinner">
      <div className="cube1"></div>
      <div className="cube2"></div>
    </div>
  );
};

export const LoadingModal = () => {
  return (
    <>
      <div className="h-screen w-screen fixed z-50">
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-lg z-50">
          <div className="flex flex-col items-center relative">

            {/* Loading Title */}
            <div className="flex flex-col items-center justify-center h-full bg-transparent text-center font-raleway gap-4">
              <Image src={LogoImg} alt="LogoImg" width={100} height={100} className="rounded-full flex border-[#fdd52f] border-[2px] shadow-[0px_8px_8px_0px] shadow-[#fdd52f]" />
              <span className="loader"></span>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
