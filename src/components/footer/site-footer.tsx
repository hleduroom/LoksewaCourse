import Link from "next/link";
import React from "react";

import {
  FaDiscord,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1c203c] px-6 py-10 text-gray-300 dark:bg-gray-900">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 border-b border-gray-600 pb-8 md:grid-cols-5">
        <div>
          <h4 className="mb-3 text-lg font-semibold text-white">Learning</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/services/Public Service Commission"
                className="hover:underline"
              >
                Public Service Commission
              </Link>
            </li>
            <li>
              <Link href="/services/Engineering" className="hover:underline">
                Engineering
              </Link>
            </li>
            <li>
              <Link href="/services/Nepal Police" className="hover:underline">
                Nepal Police
              </Link>
            </li>
            <li>
              <Link href="/services/Nepal Army" className="hover:underline">
                Nepal Army
              </Link>
            </li>
            <li>
              <Link
                href="/services/Teacher Service Commission"
                className="hover:underline"
              >
                Teacher Service Commission
              </Link>
            </li>
            <li>
              <Link
                href="/services/Nepal Health Service"
                className="hover:underline"
              >
                Nepal Health Service
              </Link>
            </li>
            <li>
              <Link href="/services/banking" className="hover:underline">
                banking
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-lg font-semibold text-white">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/#">About Us</Link>
            </li>
            <li>
              <Link href="/#">Blog</Link>
            </li>
            <li>
              <Link href="/#">FAQs</Link>
            </li>
            <li>
              <Link href="/#">Work With Us</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-lg font-semibold text-white">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/#">Buy Subscription</Link>
            </li>
            <li>
              <Link href="/#">Gift Voucher</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-lg font-semibold text-white">
            Get in Touch
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/#">Contact Us</Link>
            </li>
            <li>
              <Link href="/#">Support</Link>
            </li>
            <li>
              <Link href="/#">Forum</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 md:col-span-1">
          <div className="text-sm text-white">
            We’re building a modern learning platform focused on Nepali students
            prepare for loksewa examination.
          </div>
          <div className="text-sm text-gray-400">Kathmandu, Nepal 🇳🇵</div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 pt-6 text-sm text-gray-400 md:flex-row">
        <div className="flex flex-wrap justify-center gap-4 md:justify-start">
          <span>© {new Date().getFullYear()} Loksewa Preparation</span>
          <span>Privacy Policy</span>
          <span>Terms of Use</span>
          <span>Cookie Policy</span>
        </div>

        <div className="flex gap-4 text-xl">
          <a href="#" className="hover:text-white">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-white">
            <FaLinkedinIn />
          </a>
          <a href="#" className="hover:text-white">
            <FaDiscord />
          </a>
          <a href="#" className="hover:text-white">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-white">
            <FaYoutube />
          </a>
          <a href="#" className="hover:text-white">
            <FaGithub />
          </a>
        </div>
      </div>
      <div className="pointer-events-none absolute -top-20 -left-32 z-0 h-[600px] w-[600px] rounded-full bg-purple-500/20 opacity-50 blur-3xl dark:bg-purple-500/10" />
      <div className="pointer-events-none absolute right-0 bottom-0 z-0 h-[400px] w-[400px] rounded-full bg-blue-400/10 opacity-30 blur-2xl dark:bg-blue-400/5" />
    </footer>
  );
};

export default Footer;
