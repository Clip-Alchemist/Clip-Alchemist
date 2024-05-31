import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import React from "react";
export default function Header() {
  const menubar = [
    {
      label: "File",
      content: [
        { label: "New" },
        {
          label: "Open",
          content: [{ label: "Open file" }, { label: "Open folder" }],
        },
        { label: "Save", shortcut: "Ctrl+S" },
        { label: "Save As", shortcut: "Ctrl+Shift+S" },
        { label: "Close", shortcut: "Alt+F4" },
      ],
    },
    {
      label: "Edit",
      content: [{ label: "Project Settings" }],
    },
    {
      label: "Settings",
      content: [{ label: "Manage extensions" }],
    },
    {
      label: "Help",
      content: [
        { label: "About" },
        { label: "Documentation", shortcut: "F1" },
        { label: "Version Info" },
      ],
    },
  ];
  return (
    <header className="flex-none">
      <Menubar className="rounded-none border-0">
        {menubar.map((menu) => (
          <MenubarMenu>
            <MenubarTrigger>{menu.label}</MenubarTrigger>
            <MenubarContent>
              {menu.content.map((item) =>
                item.content ? (
                  <Sub key={item.label} menu={item} />
                ) : (
                  <MenubarItem key={item.label}>
                    {item.label}
                    {item?.shortcut && (
                      <MenubarShortcut>{item.shortcut}</MenubarShortcut>
                    )}
                  </MenubarItem>
                ),
              )}
            </MenubarContent>
          </MenubarMenu>
        ))}
      </Menubar>
    </header>
  );
}
function Sub({ menu }: { menu: any }) {
  return (
    <MenubarSub>
      <MenubarSubTrigger>{menu.label}</MenubarSubTrigger>
      <MenubarSubContent>
        {menu.content.map((item: any) =>
          item.content ? (
            <Sub key={item.label} menu={item} />
          ) : (
            <MenubarItem key={item.label}>{item.label}</MenubarItem>
          ),
        )}
      </MenubarSubContent>
    </MenubarSub>
  );
}
