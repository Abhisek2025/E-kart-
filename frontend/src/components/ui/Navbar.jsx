import { LucideShoppingCart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./button";
import ekart from "../../../public/ekart.png";

function Navbar() {
  const user = false;
  return (
    <header className="bg-pink-50 fixed w-full z-20 bborder-b border-pink-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3">
        {/* Logo Section*/}
        <img src={ekart} alt="ekart" className="w-[100px]" />
        <div>
          {/*nav section */}
          <nav className="flex gap-10 justify-between items-center">
            <ul className="flex gap-7 items-center font-semibold">
              <Link to={"/"}>
                <li>Home</li>
              </Link>
              <Link to={"/products"}>
                <li>Products</li>
              </Link>
              {user && (
                <Link to={"/profile"}>
                  <li>Hello User</li>
                </Link>
              )}
            </ul>
            <Link to={"/cart"} className="relative">
              <LucideShoppingCart />
              <span className="bg-pink-500 rounded-full absolute text-white -top-3 -right-3 px-2">
                0
              </span>
            </Link>
            {
              user? <Button className="bg-pink-800 cursor-pointer text-white">Logout</Button>:  <Button className="bg-gradient-to-tl from-blue-600 to-purple-600 cursor-pointer text-white">Login</Button>
            }
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
