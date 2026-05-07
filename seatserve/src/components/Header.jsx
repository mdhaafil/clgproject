import { useState } from "react";
import { Armchair, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Cart", href: "/cartnew" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full text-white bg-black border-b border-red-600 shadow-lg">
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl text-red-600">🍿</span>
          <h1 className="text-2xl font-bold tracking-wide">
            <span className="text-[#E50914]">Seat</span>Serve
          </h1>
        </div>

        {/* Desktop Nav Links */}
        <div className="items-center hidden gap-8 text-sm font-medium md:flex">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="transition hover:text-red-500"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          {/* Seat info (desktop only) */}
          <div className="items-center hidden gap-2 px-4 py-2 border border-red-600 rounded-full md:flex bg-zinc-900">
            <Armchair size={16} className="text-red-500" />
            <Link to="/seatselection" className="text-sm">
              Seat
            </Link>
          </div>

          {/* Desktop Burger Menu Button */}
          <div className="hidden md:block">
            <button onClick={() => setDesktopSidebarOpen(true)}>
              <Menu size={24} className="text-red-500" />
            </button>
          </div>

          {/* Mobile Burger Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileSidebarOpen(true)}>
              <Menu size={24} className="text-red-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#1A1A1A] shadow-xl transform transition-transform duration-300 z-50 md:hidden ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-red-600">
          <h2 className="text-xl font-bold text-red-600">Menu</h2>
          <button onClick={() => setMobileSidebarOpen(false)}>
            <X size={24} className="text-red-500" />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col px-6 mt-6 space-y-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-2 font-medium transition rounded-lg hover:bg-red-600 hover:text-black"
              onClick={() => setMobileSidebarOpen(false)}
            >
              {link.name}
            </a>
          ))}

          {/* Admin Button */}
          <a
            href="/admin"
            className="mt-4 px-4 py-2 rounded-lg bg-red-600 hover:bg-[#E50914] font-bold text-center transition"
            onClick={() => setMobileSidebarOpen(false)}
          >
            Admin
          </a>
        </div>
      </div>

      {/* Desktop Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#1A1A1A] shadow-xl transform transition-transform duration-300 z-50 hidden md:block ${
          desktopSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-red-600">
          <h2 className="text-xl font-bold text-red-600">Admin Menu</h2>
          <button onClick={() => setDesktopSidebarOpen(false)}>
            <X size={24} className="text-red-500" />
          </button>
        </div>

        <div className="flex flex-col px-6 mt-6 space-y-4">
          <a
            href="/login"
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-[#E50914] font-bold text-center transition"
            onClick={() => setDesktopSidebarOpen(false)}
          >
            Admin Panel
          </a>
          <a
            href="/"
            className="px-4 py-2 font-medium transition rounded-lg hover:bg-red-600 hover:text-black"
            onClick={() => setDesktopSidebarOpen(false)}
          >
            Home
          </a>
          <a
            href="/menu"
            className="px-4 py-2 font-medium transition rounded-lg hover:bg-red-600 hover:text-black"
            onClick={() => setDesktopSidebarOpen(false)}
          >
            Menu
          </a>
          <a
            href="/cart"
            className="px-4 py-2 font-medium transition rounded-lg hover:bg-red-600 hover:text-black"
            onClick={() => setDesktopSidebarOpen(false)}
          >
            Cart
          </a>
          <a
            href="/about"
            className="px-4 py-2 font-medium transition rounded-lg hover:bg-red-600 hover:text-black"
            onClick={() => setDesktopSidebarOpen(false)}
          >
            About
          </a>
          <a
            href="/contact"
            className="px-4 py-2 font-medium transition rounded-lg hover:bg-red-600 hover:text-black"
            onClick={() => setDesktopSidebarOpen(false)}
          >
            Contact
          </a>
        </div>
      </div>

      {/* Overlay for mobile */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        ></div>
      )}

      {/* Overlay for desktop */}
      {desktopSidebarOpen && (
        <div
          className="fixed inset-0 z-40 hidden bg-black bg-opacity-50 md:block"
          onClick={() => setDesktopSidebarOpen(false)}
        ></div>
      )}
    </nav>
  );
}
