import Image from "next/image";
import { FC, useEffect, useState } from "react";
import TimeBg from "@/../public/images/time-bg.png";

interface IProps {
    value: number;
}

const TimerCard: FC<IProps> = ({ value }) => {
    const [currentValue, setCurrentValue] = useState<number>(value);
    const [animate, setAnimate] = useState<boolean>(false);

    useEffect(() => {
        if (currentValue !== value) {
            setAnimate(false); // Reset animation
            setTimeout(() => setAnimate(true), 600); // Restart animation after a short delay
            setCurrentValue(value);
        }
    }, [value]);

    return (
        <div className="w-full h-full max-h-[74px] 2xs:max-h-[108px] md:max-h-[70px] md2:max-h-[108px] flex flex-col text-3xl font-bold bg-black/30 border-white/5 border-[2px] rounded-2xl p-1.5 2xs:p-3 md:p-1.5 md2:p-3 overflow-hidden relative">
            <Image src={TimeBg} alt="TimeBg" className="w-[120%] h-[120%] absolute z-10 -top-1 -left-0" />
            <div className={`flex flex-col items-center mt-[-72px] 2xs:mt-[-60px] md:mt-[-72px] md2:mt-[-60px] w-full transition-all duration-500 ease-in-out`}>
                <span className={`${animate ? "scrollContainer" : ""} text-white h-10 w-full flex justify-center`}>{(value - 2) < 0 ? "59" : (value - 2).toString().padStart(2, "0")}</span>
                <span className={`${animate ? "scrollContainer" : ""} text-white h-10 w-full flex justify-center`}>{(value - 1) < 0 ? "59" : (value - 1).toString().padStart(2, "0")}</span>
                <span className={`${animate ? "scrollContainer" : ""} text-white h-10 w-full flex justify-center`}>{value.toString().padStart(2, "0")}</span>
                <span className={`${animate ? "scrollContainer" : ""} text-white h-10 w-full flex justify-center`}>{(value + 1) > 59 ? "00" : (value + 1).toString().padStart(2, "0")}</span>
            </div>
        </div>
    );
};

export default TimerCard;
