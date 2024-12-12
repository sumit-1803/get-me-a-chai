"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setHasToken(true);
    }
  }, []);

  return (
    <>
      <div className="flex animate-fadeIn items-center justify-center h-screen px-4  lg:pt-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-heading">
            Empowering Innovation Through <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-blue-500">Community Funding</span>
          </h1>
          <p className="text-xl text-neutral-300 mb-8">
            Build your personal brand and connect with a global audience. Share your journey, gain support, and earn from your community on Devo<span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-blue-500">Sponsor</span>.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href='/signup' className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-lg font-semibold transition-colors">
              Launch Your Profile
            </Link>
            <Link
              href='/allUsers'
              className="px-8 py-3 text-white rounded-xl text-lg font-semibold transition-colors border-2  border-transparent hover:text-white"
              style={{ borderImage: 'linear-gradient(to right, #6a0dad, #1e40af) 1' }}
            >
              Explore Users
            </Link>
          </div>

          <div className="hidden lg:grid mt-16  grid-cols-2 md:grid-cols-4 gap-8 text-center mb-16">
            <div className="p-4">
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-blue-500 mb-2">$10M+</h3>
              <p className="text-neutral-400">Total Funded</p>
            </div>
            <div className="p-4">
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-blue-500 mb-2">100+</h3>
              <p className="text-neutral-400">Projects Launched</p>
            </div>
            <div className="p-4">
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-blue-500 mb-2">50K+</h3>
              <p className="text-neutral-400">Global Backers</p>
            </div>
            <div className="p-4">
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-blue-500 mb-2">95%</h3>
              <p className="text-neutral-400">Success Rate</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10 mt-16"></div>


      {/* New Section for All Users */}
      {/* <div className="text-center py-32  text-white">
        <h2 className="text-3xl font-bold mb-8">Meet All Our Users</h2>
        <p className="mb-4">Explore our community of passionate developers and see how they are getting funded by their fans.</p>
        <Link href="/allUsers">
          <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 border-2 border-gray-800">
            View All Users
          </button>
        </Link>
      </div>
      <div className="bg-white h-1 opacity-10"></div> */}

      {/* Existing Content */}
      <div className="animate-fadeIn text-white container mx-auto py-12 sm:py-16 md:py-32">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-14">
          Your Fans Can sponsor you on DevoSponsor
        </h2>

        <div className="flex flex-wrap gap-5 justify-center sm:justify-around">
          <div className="item space-y-3 flex flex-col items-center w-full sm:w-1/3">
            <img
              className="bg-slate-400 rounded-full p-2 text-black"
              width={88}
              src="https://img1.picmix.com/output/stamp/normal/6/8/5/4/1634586_431e0.gif"
              alt="not loading"
            />
            <p className="font-bold text-center">Empower Your Passion</p>
            <p className="text-center">Let your fans fuel your journey.</p>
          </div>

          <div className="item space-y-3 flex flex-col items-center w-full sm:w-1/3">
            <img
              className="bg-slate-400 rounded-full p-2 text-black"
              width={88}
              src="https://media4.giphy.com/media/OccMlQrNO0YU4zFchY/source.gif"
              alt="not loading"
            />
            <p className="font-bold text-center">Support Your Creativity</p>
            <p className="text-center">Give your fans a chance to contribute.</p>
          </div>

          <div className="item space-y-3 flex flex-col items-center w-full sm:w-1/3">
            <img
              className="bg-slate-400 rounded-full p-2 text-black"
              width={88}
              src="https://i.pinimg.com/originals/2f/8a/a3/2f8aa3c23c2abe1730ca7b2000eb1e20.gif"
              alt="not loading"
            />
            <p className="font-bold text-center">Make an Impact</p>
            <p className="text-center">Your fans can help you make a difference.</p>
          </div>
        </div>
      </div>


      <div className="bg-white h-1 opacity-10 mt-12"></div>

      {/* More Content */}
      <div className="text-white container mx-auto py-32 flex flex-col">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-14">
          Learn More About Us
        </h2>
        <div className="flex justify-center px-4 lg:px-0">
          <div
            className="relative w-full max-w-xl md:max-w-3xl lg:max-w-5xl"
            style={{ paddingTop: "56.25%" }}
          >
            <iframe
              src="https://www.youtube.com/embed/fjHO4fAfCf0"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
