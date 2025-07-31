import React, { useState } from "react";
import { Menu, MenuItem, HoveredLink } from "./ui/navbar-menu";

const NAV_ITEMS = [
  {
    label: "Home",
    onClick: () => (window.location.href = "/"),
  },
  {
    label: "Inspirations",
    content: <HoveredLink href="/inspirations" />,
  },
  {
    label: "Quotes",
    content: <HoveredLink href="/quotes" />,
  },
];

const Navbar = () => {
  const [active, setActive] = useState(null);
  return (
    <header className="w-full flex justify-center py-4">
      <Menu setActive={setActive}>
        {NAV_ITEMS.map((item) => (
          <MenuItem
            key={item.label}
            setActive={setActive}
            active={active}
            item={item.label}
          >
            {item.content}
          </MenuItem>
        ))}
      </Menu>
    </header>
  );
};

export default Navbar;
