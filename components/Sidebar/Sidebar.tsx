import React, { useState } from "react";
import Link from "next/link";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { GoogleLogin } from "react-google-login";
import { ImCancelCircle } from "react-icons/im";
import { AiOutlineMenu, AiFillHome } from "react-icons/ai";
import Discover from "../Discover/Discover";
import SuggestedAccounts from "../SuggestedAccounts/SuggestedAccounts";
import Footer from "../Footer/Footer";

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(true);

  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#f15997] rounded";

  return (
    <div className="">
      <div
        className="block xl:hidden m-2 ml-4 mt-3 text-xl"
        onClick={() => setShowSidebar((prevState) => !prevState)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className="xl:w-400 w-20 flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="text-xl hidden xl:block">For You</span>
              </div>
            </Link>
          </div>

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Sidebar;
