import React from "react";

export default function Breadcrumb({ items = [] }) {
  return (
    <div className="px-4 sm:px-10 lg:px-[180px] pb-2">
      <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
        <ol className="inline-flex p-0 list-none">
          {items.map((item, idx) => (
            <li key={idx} className={item.active ? "font-semibold text-gray-700 hover:cursor-default" : ""}>
              {item.href ? (
                <a
                  href={item.href}
                  className="transition-colors hover:text-orange-500 hover:font-semibold"
                >
                  {item.label}
                </a>
              ) : (
                <span>{item.label}</span>
              )}
              {idx < items.length - 1 && <span className="mx-2">/</span>}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
