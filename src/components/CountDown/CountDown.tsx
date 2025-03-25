"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import TimeBg from "@/../public/images/timebg.png";
import TimerCard from "./Timer";

const Countdown: React.FC = () => {

    // Function to update the target time
    const getTargetTime = () => {
        return new Date().getTime() + 24 * 60 * 60 * 1000; // Add 24 hours
    };

    // State for countdown values
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    }>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    // Countdown logic
    useEffect(() => {
        let targetDate = getTargetTime(); // Set initial target date

        const updateCountdown = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / (1000 * 60)) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, [])

    return (
        <div className="relative w-full h-full max-w-sm flex flex-col items-center justify-center px-2 2xs:px-4 md:px-2 md2:px-4 pt-2 2xs:pt-4 md:pt-2 md2:pt-4 pb-1 2xs:pb-2 md:pb-1 md2:pb-2 rounded-3xl border border-white/10 bg-black object-cover overflow-hidden mx-auto">
            <Image
                src={TimeBg}
                alt="Countdown Background"
                className="absolute w-full h-full top-0 left-0 z-10"
            />
            <div className="flex flex-row w-full text-center items-center auto-cols-max z-20">
                <div className="flex flex-col items-center w-full object-cover overflow-hidden relative">
                    <TimerCard value={timeLeft.hours} />
                    <div className="text-[10px] 2xs:text-sm md:text-[12px] md2:text-sm text-gray-400 pt-1 2xs:pt-2 md:pt-1 md2:pt-2 uppercase">hours</div>
                </div>
                <p className="text-white px-0.5 2xs:px-1 md:px-1.5 lg:px-2 text-lg lg:text-2xl pb-8">:</p>
                <div className="flex flex-col items-center w-full object-cover overflow-hidden relative">
                    <TimerCard value={timeLeft.minutes} />
                    <div className="text-[10px] 2xs:text-sm md:text-[12px] md2:text-sm text-gray-400 pt-1 2xs:pt-2 md:pt-1 md2:pt-2 uppercase">minutes</div>
                </div>
                <p className="text-white px-0.5 2xs:px-1 md:px-1.5 lg:px-2 text-lg lg:text-2xl pb-8">:</p>
                <div className="flex flex-col items-center w-full object-cover overflow-hidden relative">
                    <TimerCard value={timeLeft.seconds} />
                    <div className="text-[10px] 2xs:text-sm md:text-[12px] md2:text-sm text-gray-400 pt-1 2xs:pt-2 md:pt-1 md2:pt-2 uppercase">seconds</div>
                </div>
            </div>
        </div>
    );
};

export default Countdown;
