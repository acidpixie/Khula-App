// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import logo from "../assets/images/khula-logo.svg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white border-b border-white p-4">
        <div className="flex justify-between items-center w-full">
          {/* Left */}
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 mr-4" />
            <input
              type="search"
              placeholder="Search Products"
              className="hidden lg:block px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3CB879] focus:border-transparent w-96"
            />
          </div>

          {/* Center */}
          <div className="hidden lg:flex space-x-6">
            <a href="/" className="text-black hover:font-bold">
              Home
            </a>
            <a href="/quotes" className="text-black hover:font-bold">
              Quotes
            </a>
            <a href="/orders" className="text-black hover:font-bold">
              Orders
            </a>
            <a href="/support" className="text-black hover:font-bold">
              Support
            </a>
            <a href="/account" className="text-black hover:font-bold">
              Account
            </a>
          </div>

          {/* Right */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="/cart"
              className="text-black hover:font-bold flex items-center"
            >
              Cart
              <div className="relative ml-1">
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  1
                </span>
              </div>
            </a>
            <a href="/logout" className="text-black hover:font-bold">
              Logout
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile search */}
        <div className="lg:hidden mt-4">
          <input
            type="search"
            placeholder="Search Products"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3CB879] focus:border-transparent"
          />
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 space-y-4">
            <div className="flex flex-col space-y-4">
              <a href="/" className="text-black hover:font-bold">
                Home
              </a>
              <a href="/quotes" className="text-black hover:font-bold">
                Quotes
              </a>
              <a href="/orders" className="text-black hover:font-bold">
                Orders
              </a>
              <a href="/support" className="text-black hover:font-bold">
                Support
              </a>
              <a href="/account" className="text-black hover:font-bold">
                Account
              </a>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <a
                  href="/cart"
                  className="text-black hover:font-bold flex items-center"
                >
                  Cart
                  <div className="relative ml-1">
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      1
                    </span>
                  </div>
                </a>
                <a href="/logout" className="text-black hover:font-bold">
                  Logout
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;