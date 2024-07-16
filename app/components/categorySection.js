import React from 'react'
import Link from "next/link";

const categorySection = ({ title, pages }) => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center text-black">{title}</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {pages.map((page, index) => (
            <Link
              key={index}
              href={`/${page.href.replace("/wiki/", "")}`}
              legacyBehavior
            >
              <a className="block bg-slate-200 p-4 rounded shadow-md text-center text-blue-500 hover:bg-blue-100 hover:underline">
                {page.title}
              </a>
            </Link>
          ))}
        </div>
      </div>
    );
  }
  

export default categorySection