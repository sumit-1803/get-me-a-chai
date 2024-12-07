"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import React from 'react';

const AboutPage = () => {
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setHasToken(true);
        }
    }, []);


    return (
        <div className="animate-fadeIn flex min-h-screen justify-center flex-col items-center gap-8 text-white bg-gradient-to-br from-blue-900 via-purple-800 to-gray-900 px-4 sm:px-8">
            <div className="font-bold flex gap-2 text-4xl sm:text-5xl items-center justify-center text-center">
                <span>
                    <img
                        className="invertImg w-16 sm:w-20 md:w-24"
                        src="https://media2.giphy.com/media/KanTM1jNrX7TgQ2d4X/giphy.gif?cid=6c09b952pfgv0n376m7hxzqa4tayg0xkrdk8zgwa1ad4unxp&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
                        alt="DevSponsor Animation"
                    />
                </span>
                About
                DevSponsor
            </div>

            <div className="text-center max-w-3xl">
                <p className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed">
                    Welcome to <span className="font-extrabold text-purple-400">DevSponsor</span>, the ultimate crowdfunding platform designed for developers!
                </p>
                <p className="text-lg sm:text-xl md:text-2xl leading-relaxed mt-4">
                    At <span className="font-semibold text-blue-400">DevSponsor</span>, we aim to bridge the gap between creators and their community by enabling seamless support from fans and followers.
                </p>
                <p className="text-lg sm:text-xl md:text-2xl leading-relaxed mt-4">
                    Join us in celebrating creativity and innovation. Let your fans fuel your dreams!
                </p>
            </div>
            <div>
                {!hasToken && (
                    <Link href={"/login"}>
                        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm md:text-base font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Start Supporting
                            </span>
                        </button>
                    </Link>
                )}
            </div>

            <div className="bg-white h-1 w-1/2 md:w-1/4 opacity-10 mt-8"></div>
        </div>

    );
};

export default AboutPage;
