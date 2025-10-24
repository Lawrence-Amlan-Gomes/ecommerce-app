"use client";
import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth";
import { useTheme } from "@/app/hooks/useTheme";
import { usePathname } from "next/navigation";
import Image from "next/image";
import colors from "@/app/color/color";
import { useEffect, useState } from "react";

const ProfileIcon = ({ active }) => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [image, setImage] = useState("");
  const { auth } = useAuth();

  useEffect(() => {
    if (auth?.photo) {
      setImage(auth.photo);
    }
  }, [auth]);

  return (
    <div>
      {auth ? (
        <Link href="/profile">
          <div
            className={`border-[1px] lg:h-[40px] lg:w-[40px] sm:w-[35px] sm:h-[35px] h-[30px] w-[30px] rounded-lg  ${
              theme
                ? active == "profile"
                  ? `bg-transparent hover:bg-[#eeeeee] text-black ${colors.keyColorBorder}`
                  : `bg-transparent hover:bg-[#eeeeee] text-black border-[#333333]`
                : active == "profile"
                ? `bg-[#000000] hover:bg-[#222222] text-white ${colors.keyColorBorder}`
                : `bg-[#000000] hover:bg-[#222222] text-white border-[#999999]`
            } relative overflow-hidden`}
          >
            {auth.photo == "" ? (
              <div className="w-full h-full flex justify-center items-center sm:text-[25px] text-[18px] font-bold">
                <div className="h-full w-full relative">
                  {" "}
                  <Image
                    priority
                    src={
                      theme ? "/profileIconLight.png" : "/profileIconDark.png"
                    }
                    alt={theme ? "Proflie Icon Light" : "Proflie Icon Dark"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={auth.photo} alt="profilepic" width="100%"></img>
            )}
          </div>
        </Link>
      ) : (
        <Link href={pathname == "/login" ? "/register" : "/login"}>
          <div className="flex justify-center items-center h-full">
            <div
              className={`rounded-lg border-[1px] lg:h-[40px] lg:w-[40px] sm:w-[35px] sm:h-[35px] h-[30px] w-[30px] relative ${
                theme
                  ? active == "profile"
                    ? `bg-transparent hover:bg-[#eeeeee] text-black ${colors.keyColorBorder}`
                    : `bg-transparent hover:bg-[#eeeeee] text-black border-[#333333]`
                  : active == "profile"
                  ? `bg-[#000000] hover:bg-[#222222] text-white ${colors.keyColorBorder}`
                  : `bg-[#000000] hover:bg-[#222222] text-white border-[#999999]`
              }`}
            >
              <div className="h-full w-full relative">
                {" "}
                <Image
                  priority
                  src={theme ? "/profileIconLight.png" : "/profileIconDark.png"}
                  alt={theme ? "Proflie Icon Light" : "Proflie Icon Dark"}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default ProfileIcon;
