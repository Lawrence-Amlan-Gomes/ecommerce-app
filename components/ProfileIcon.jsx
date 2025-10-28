"use client";

import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth";
import { useTheme } from "@/app/hooks/useTheme";
import { usePathname } from "next/navigation";
import Image from "next/image";
import colors from "@/app/color/color";
import { useState } from "react";

const ProfileIcon = ({ active }) => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const { auth } = useAuth();

  // local fallback handling
  const [imgError, setImgError] = useState(false);

  // Choose the correct border & background color
  const baseStyle = `border-[1px] lg:h-[40px] lg:w-[40px] sm:w-[35px] sm:h-[35px] h-[30px] w-[30px] rounded-lg relative overflow-hidden`;

  const lightMode =
    active === "profile"
      ? `bg-transparent hover:bg-[#eeeeee] text-black ${colors.keyColorBorder}`
      : `bg-transparent hover:bg-[#eeeeee] text-black border-[#333333]`;

  const darkMode =
    active === "profile"
      ? `bg-[#000000] hover:bg-[#222222] text-white ${colors.keyColorBorder}`
      : `bg-[#000000] hover:bg-[#222222] text-white border-[#999999]`;

  const profileStyle = `${baseStyle} ${theme ? lightMode : darkMode}`;

  // Determine which image to display
  const defaultIcon = theme ? "/profileIconLight.png" : "/profileIconDark.png";
  const userPhoto = !imgError && auth?.photo ? auth.photo : defaultIcon;

  // Build the href link
  const linkHref = auth
    ? "/profile"
    : pathname === "/login"
    ? "/register"
    : "/login";

  return (
    <div>
      <Link href={linkHref}>
        <div className="flex justify-center items-center h-full">
          <div className={profileStyle}>
            <Image
              priority
              src={userPhoto}
              alt={
                auth
                  ? `${auth.name || "User"}'s profile picture`
                  : "Profile Icon"
              }
              objectFit="cover"
              width={5000}
              height={5000}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
              className="object-cover"
              onError={() => setImgError(true)}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProfileIcon;
