import React from "react";

const DropdownMenu = () => {
  return (
    <nav className="p-4 bg-gray-100">
      <ul className="space-y-2">
        {[
          { label: "Juice", items: ["Mango Juice", "Pineapple Juice"] },
          { label: "Soft Drinks", items: ["Coca Cola", "Pepsi"] },
          { label: "Energy Drinks", items: ["Red Bull", "Monster"] },
          { label: "Drinking Water", items: ["Aquafina", "Bisleri"] },
        ].map((menu, index) => (
          <li
            key={index}
            className="group relative p-2 bg-white rounded hover:bg-gray-200 cursor-pointer shadow-sm"
          >
            {menu.label}
            <ul className="hidden group-hover:flex flex-col absolute left-0 top-full mt-2 bg-white border rounded shadow-lg w-40">
              {menu.items.map((item, idx) => (
                <li
                  key={idx}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DropdownMenu;
