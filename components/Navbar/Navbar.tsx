import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import Logo from "../../utils/tiktik-logo.png";
import { createOrGetUser } from "../../utils";
import useAuthStore from "../../store/authStore";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px] ">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="tik-tik"
            layout="responsive"
          />
        </div>
      </Link>
      <div>Search</div>
      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2 rounded-md">
                <IoMdAdd className="text-xl" /> {` `}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="/">
                <>
                  <Image
                    width={100}
                    height={100}
                    className="rounded-full cursor-pointer"
                    src={userProfile.image}
                    alt="profile photo"
                    layout="responsive"
                  />
                </>
              </Link>
            )}
            <button type="button">
              <AiOutlineLogout
                color="red"
                // fontSize={40}
                size={45}
                className="px-2"
                onClick={() => {
                  googleLogout();
                  removeUser();
                }}
              />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("Error ")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
