"use client";

import Image from "next/image";
import React from "react";

import { motion } from "framer-motion";

import { Button } from "../ui/button";

const ebooks = [
  {
    title: "Bagmati Pradesh Panchau Taha Pariksha Margadarshan Dwitiya Patra",
    price: "रु 400",
    link: "#",
    image: "/book1.jpg",
  },
  {
    title:
      "Nepal Bank Limited Banking Safalatako Antardristi Taha-6 Sahayak Prabandhak",
    price: "रु 250",
    link: "#",
    image: "/book2.jpg",
  },
  {
    title: "Kharidar Pariksha Margadarshan Prashnottar Sangraha Dwitiya Patra",
    price: "रु 250",
    link: "#",
    image: "/book3.jpg",
  },
  {
    title: "Shakha Adhikrit 25 Set Format Based Namuna Prashnottar",
    price: "रु 400",
    link: "#",
    image: "/book4.jpg",
  },
  {
    title: "Bagmati Pradesh Sahayakstar Panchau Taha Tritiya Patra",
    price: "Free",
    link: "#",
    image: "/book5.jpg",
  },
  {
    title: "Lok Sewa Ayog Pharma Idol for Pharmacy Supervisor (5th Level)",
    price: "Free",
    link: "#",
    image: "/book6.jpg",
  },
  {
    title:
      "Prabidhik Samanya Gyan ra Sarbajanik Byawasthapan Question Bank 23 Set",
    price: "रु 250",
    link: "#",
    image: "/book7.jpg",
  },
  {
    title: "Nepal Bank Limited Banking Safalatako Antardhristi Taha-4 Sahayak",
    price: "रु 250",
    link: "#",
    image: "/book8.jpg",
  },
  {
    title: "Krishi Loksewa Safal Agri Pustak Dwitiya Patra",
    price: "रु 250",
    link: "#",
    image: "/book9.jpg",
  },
];

export default function EBooksPage() {
  return (
    <div className="min-h-screen bg-white px-6 dark:bg-gray-900">
      <h2 className="mb-5 text-center text-2xl font-bold md:text-3xl">
        📚 Explore Our E-Book Collection
      </h2>
      <p className="mb-6 text-center text-lg text-gray-600 dark:text-gray-300">
        लोकसेवा तयारीको लागि सङ्कलन गरिएका नोटहरू र गाइडहरू।
      </p>
      <div className="flex flex-col gap-6">
        {ebooks.map((book, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="flex flex-row items-center gap-6 rounded-xl bg-gray-100 p-4 shadow dark:bg-gray-800"
          >
            <Image
              src={book.image}
              alt={book.title}
              width={150}
              height={180}
              className="rounded object-contain shadow"
            />
            <div className="flex flex-col justify-between">
              <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
                {book.title}
              </h2>
              <p className="mb-3 font-semibold text-blue-600 dark:text-blue-400">
                {book.price}
              </p>
              <Button className="w-fit cursor-pointer">Start Learning</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
