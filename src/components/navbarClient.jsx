"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import localFont from "next/font/local";

import { IoHome } from "react-icons/io5";
import { MdDashboardCustomize } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import { LuMailCheck } from "react-icons/lu";
import { FaCircleInfo } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import { RiCloseLargeFill } from "react-icons/ri";
import { logout } from "@/actions/auth";

const customFont = localFont({ src: "../fonts/JungleFlame-nAAv4.otf" });

export default function NavbarClient({ isLoggedIn }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigationItems = [
    {
      name: "Home",
      href: "/",
      icon: <IoHome className="w-5 h-5" />,
      visible: true,
    },
    {
      name: "Admin Dashboard",
      href: "/Admin-Dashboard",
      icon: <MdDashboardCustomize className="w-5 h-5" />,
      visible: isLoggedIn, // Show only if user is admin
      ismobile: true, // Show in mobile menu only
    },
    {
      name: "Services",
      href: "/services",
      icon: <GrServices className="w-5 h-5" />,
      visible: true,
    },
    {
      name: "About",
      href: "/about",
      icon: <FaCircleInfo className="w-5 h-5" />,
      visible: true,
    },
    {
      name: "Contact Us",
      href: "/contacts",
      icon: <LuMailCheck className="w-5 h-5" />,
      visible: true,
    },
  ];

  const visibleNavItems = navigationItems.filter(
    (item) => item.visible && !item.ismobile
  );
  const visibleNavItems_mobile = navigationItems.filter((item) => item.visible);

  const ProfileDropdown = () => (
    <div className="mx-3 lg:mx-8 flex items-center space-x-12">
      {isLoggedIn && (
        <Link
          href="/Admin-Dashboard"
          className="hidden p-2 lg:flex items-center gap-1 text-md font-semibold
             hover:rounded-md hover:bg-gray-700 hover:shadow-lg 
             transition-all duration-300 transform hover:scale-105 group"
        >
          <MdDashboardCustomize className="w-5 h-5" />
          <span>Admin Dashboard</span>
          <div
            className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 
                  group-hover:w-full transition-all duration-400 ease-out"
          />
        </Link>
      )}
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsProfileOpen(!isProfileOpen);
            if (setIsMobileMenuOpen) setIsMobileMenuOpen(false);
          }}
          className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-400 hover:scale-105 transition-transform duration-200"
        >
          KD
        </button>

        {/* Updated Dropdown Menu with adjusted positioning and triangle connector */}
        <div
          className={`absolute right-0 mt-6 w-40 rounded-md py-1 bg-gray-800/90 backdrop-blur-xs border-none ${
            isProfileOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }`}
        >
          {/* Updated Triangle Connector */}
          <div
            className="absolute -top-[10px] right-[15px] w-0 h-0 z-10"
            style={{
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderBottom: "10px solid rgba(43, 44, 46, 1)", // Matches bg-gray-800
              filter: "drop-shadow(0 -1px 1px rgba(28, 27, 27, 0.1))",
            }}
          />
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 text-center"
            onClick={() => setIsProfileOpen(false)}
          >
            My Profile
          </Link>
          <Link
            href="/settings"
            className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 text-center"
            onClick={() => setIsProfileOpen(false)}
          >
            Settings
          </Link>

          {/* Separator */}
          <div className="my-1 border-t border-gray-600"></div>

          {/* Red Logout Button */}
          <button
            onClick={() => {
              logout();
              setIsProfileOpen(false);
            }}
            className="flex items-center justify-center my-3 px-6 py-1.5 text-sm bg-red-500 text-white hover:bg-red-600 font-medium transition-colors duration-200 rounded-md w-24 mx-auto block text-center"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const handleClickOutside = () => {
      isMobileMenuOpen && setIsMobileMenuOpen(false);
      isProfileOpen && setIsProfileOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen, isProfileOpen]);

  // Prevent menu close when clicking inside the menu
  const handleMenuClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="h-20 lg:h-15 navbar bg-gray-800 text-white lg:px-8 shadow-lg">
      {/* Logo Section - Hidden on Mobile */}
      <div className="hidden lg:navbar-start">
        <Link
          href="/"
          className={`ml-5 mt-2 ${customFont.className} text-5xl duration-300 transform hover:scale-105`}
        >
          SCS
        </Link>
      </div>
      {/* Mobile Menu Button */}
      <div className="navbar-start lg:hidden">
        <div className="dropdown" onClick={handleMenuClick}>
          <div className="relative">
            <button
              className={`h-12 btn bg-gray-500 border-none shadow-none`}
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
                if (isProfileOpen) setIsProfileOpen(false);
              }}
            >
              {isMobileMenuOpen ? (
                <RiCloseLargeFill className="w-5 h-5 fill-current" />
              ) : (
                <FiMenu className="w-5 h-5 fill-current" />
              )}
            </button>

            {/* Wrapper for triangle and menu */}
            <div className={`${isMobileMenuOpen ? "block" : "hidden"}`}>
              {/* Triangle Indicator */}
              <div
                className={`absolute mt-1 h-4 w-0
          border-l-[8px] border-l-transparent 
          border-r-[8px] border-r-transparent 
          border-b-[8px] border-b-gray-800/90
          left-4 top-[calc(100%+4px)] duration-300
        `}
              ></div>
              <ul className="menu menu-sm dropdown-content mt-6 p-3 bg-gray-800/90 backdrop-blur-xs rounded-box w-45 border-gray-800">
                {visibleNavItems_mobile.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="hover:bg-gray-700 transition-all transform hover:scale-105 rounded-lg p-3 flex items-center gap-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Section - Mobile Centered */}

      <div className="navbar-center lg:hidden">
        <Link
          href="/"
          className={`pt-3 ${customFont.className} text-5xl duration-300 transform hover:scale-105`}
        >
          SCS
        </Link>
      </div>

      {/* Desktop Center -  Navigation Items */}

      <div className="navbar-center hidden lg:flex">
        <div className="menu menu-horizontal px-3 space-x-5">
          {visibleNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative p-2 flex items-center gap-1 text-md font-semibold
             hover:rounded-md hover:bg-gray-700 hover:shadow-lg 
             transition-all duration-300 transform hover:scale-105 group"
            >
              <div
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 
                  group-hover:w-full transition-all duration-400 ease-out"
              />
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Right - Auth Section */}
      <div className="h-12 navbar-end">
        {!isLoggedIn ? (
          <Link
            className="bg-sky-600 text-white px-4 py-2 rounded text-center tracking-tighter "
            href="/Login-Signup"
          >
            <span className="hidden sm:inline">Login or Signup</span>
            <span className="sm:hidden flex flex-col items-center ">
              <span className="text-base/4">Login</span>
              <span className="text-xs/3">or Signup</span>
            </span>
          </Link>
        ) : (
          <ProfileDropdown />
        )}
      </div>
    </div>
  );
}
