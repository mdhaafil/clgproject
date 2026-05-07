import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-20 bg-black border-t border-red-600 text-zinc-400">
      <div className="grid grid-cols-1 gap-8 px-6 py-12 mx-auto max-w-7xl md:grid-cols-4">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            <span className="text-[#E50914]">Seat</span>Serve
          </h2>
          <p className="mt-3 text-sm">
            Order delicious food directly from your seat while enjoying the
            movie. No queues. No missing scenes.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-3 font-semibold text-[#E50914]">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-[#E50914]">
                Home
              </Link>
            </li>
            <li>
              <Link to="/menu" className="hover:text-[#E50914]">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-[#E50914]">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#E50914]">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#E50914]">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="mb-3 font-semibold text-[#E50914]">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/help" className="hover:text-[#E50914]">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/orderissue" className="hover:text-[#E50914]">
                Order Issues
              </Link>
            </li>
            <li>
              <Link to="/refundpolicy" className="hover:text-[#E50914]">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link to="/termsandconditions" className="hover:text-[#E50914]">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-3 font-semibold text-[#E50914]">Contact</h3>
          <p className="text-sm">📍 Cinema Food Court</p>
          <p className="text-sm">📞 +91 93422 71843</p>
          <p className="text-sm">✉ mohammedhaafil5@gmail.com</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-4 text-sm text-center border-t border-zinc-800">
        © {new Date().getFullYear()} SeatServe. All rights reserved.
      </div>
    </footer>
  );
}
