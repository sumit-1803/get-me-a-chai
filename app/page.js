import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col items-center gap-4 text-white h-[44vh]">
        <div className="font-bold flex gap-2 text-5xl items-center justify-center">DevSponsor <span ><img className="invertImg" width={80} src="https://media2.giphy.com/media/KanTM1jNrX7TgQ2d4X/giphy.gif?cid=6c09b952pfgv0n376m7hxzqa4tayg0xkrdk8zgwa1ad4unxp&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s" alt="not loading" /> </span></div>
        <p>
          A Crowd Funding Platform for Developers .
          Get Funded by Your Fans and Followers. Start Now!
        </p>
        <div>
          <Link href={"/about"}>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Start Here
              </span>
            </button>
          </Link>
          <Link href={"/login"}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More...</button>
          </Link>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>



      {/* New Content Starts */}
      <div className="text-white container mx-auto py-32">
        <h2 className="text-3xl font-bold text-center mb-14 ">
          Your Fans can Buy you a Chai</h2>
        <div className="flex gap-5 justify-around ">
          <div className="item space-y-3 flex flex-col items-center">
            <img className=" bg-slate-400 rounded-full p-2 text-black" width={88} src="https://img1.picmix.com/output/stamp/normal/6/8/5/4/1634586_431e0.gif" alt="not loading" />
            <p className="font-bold">Fund Yourself!</p>
            <p className="text-center">Your Fans are Availiable To Help You</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center">
            <img className=" bg-slate-400 rounded-full p-2 text-black" width={88} src="https://media4.giphy.com/media/OccMlQrNO0YU4zFchY/source.gif" alt="not loading" />
            <p className="font-bold">Fund Yourself!</p>
            <p className="text-center">Your Fans are Availiable To Help You</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center">
            <img className=" bg-slate-400 rounded-full p-2 text-black" width={88} src="https://img1.picmix.com/output/stamp/normal/6/8/5/4/1634586_431e0.gif" alt="not loading" />
            <p className="font-bold">Fans want to help</p>
            <p className="text-center">Your Fans are Availiable To Help You</p>
          </div>
        </div>

      </div>

      <div className="bg-white h-1 opacity-10"></div>

      {/* New Content Starts */}
      <div className="text-white container mx-auto py-32 flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-14 ">
          Learn More About Us
        </h2>
        <div className="flex justify-center">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/fjHO4fAfCf0?si=K0vQ_uJsLQKd2qok" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>



    </>
  );
}
