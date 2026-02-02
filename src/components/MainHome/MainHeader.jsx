import React from "react";
import Button from "../ui/button/Button";
import { Link } from "react-router-dom";

const MainHeader = () => {
  return (
    <header
      className="
    sticky top-0 z-50 w-full
    bg-white/40 backdrop-blur-xl
    border-b border-white/10
  "
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* LEFT – LOGO */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src="/images/logo/nzl-logo.png"
              alt="Logo"
              className="h-12 w-auto"
            />
          </Link>
        </div>

        {/* CENTER – MENU */}
        <nav className="hidden md:flex items-center gap-10">
          {[
            "Home",
            " About Us",
            "Our Services",
            "How It Works",
            "Contact Us",
          ].map((item) => (
            <a
              key={item}
              href="#"
              className="
                relative text-[16px] font-medium
                text-dark
                transition-all duration-200
                hover:text-brand-500
                after:absolute after:left-0 after:-bottom-1
                after:h-[2px] after:w-0
                after:bg-[var(--color-primary)]
                after:transition-all
                hover:after:w-full
              "
            >
              {item}
            </a>
          ))}
        </nav>

        {/* RIGHT – LOGIN */}
        <div className="flex items-center gap-3">
          <Link to={localStorage.getItem("token") ? "/dashboard" : "/signin"}>
            <Button size="sm" className="uppercase px-5">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
