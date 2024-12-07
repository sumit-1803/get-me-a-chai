import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="animate-fadeIn flex min-h-screen justify-center flex-col items-center gap-6 text-white px-4 md:px-10">
        <div className="font-bold flex gap-2 text-4xl md:text-5xl items-center justify-center text-center">
          DevSponsor
          <span>
            <img
              className="invertImg w-12 md:w-20"
              src="https://media2.giphy.com/media/KanTM1jNrX7TgQ2d4X/giphy.gif?cid=6c09b952pfgv0n376m7hxzqa4tayg0xkrdk8zgwa1ad4unxp&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
              alt="not loading"
            />
          </span>
        </div>
        <p className="text-center text-sm md:text-base lg:text-lg">
          A Crowd Funding Platform for Developers. Get Funded by Your Fans and Followers. Start Now!
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <Link href={"/login"}>
            <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm md:text-base font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Start Here
              </span>
            </button>
          </Link>
          <Link href={"/about"}>
            <button
              type="button"
              className="text-black bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm md:text-base px-5 py-2.5 text-center border-2 border-gray-800"
            >
              Read More...
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      {/* New Section for All Users */}
      <div className="text-center py-32  text-white">
        <h2 className="text-3xl font-bold mb-8">Meet All Our Users</h2>
        <p className="mb-4">Explore our community of passionate developers and see how they are getting funded by their fans.</p>
        <Link href="/allUsers">
          <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 border-2 border-gray-800">
            View All Users
          </button>
        </Link>
      </div>
      <div className="bg-white h-1 opacity-10"></div>

      {/* Existing Content */}
      <div className="animate-fadeIn text-white container mx-auto py-12 sm:py-16 md:py-32">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-14">
          Your Fans Can sponsor you on DevSponsor
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


      <div className="bg-white h-1 opacity-10"></div>

      {/* More Content */}
      <div className="text-white container mx-auto py-32 flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-14">
          Learn More About Us
        </h2>
        <div className="flex justify-center">
          <div className="relative w-full max-w-xl" style={{ paddingTop: "56.25%" }}>
            <iframe
              src="https://www.youtube.com/embed/fjHO4fAfCf0"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>


    </>
  );
}
