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
type Content = {
  label: string;
  shortcut?: string;
  content?: Array<Content>;
  onClick?: () => void;
};
type Menu = {
  label: string;
  content: Array<Content>;
};
export default function Header() {
  const menubar: Menu[] = [
    {
      label: "File",
      content: [
        { label: "New" },
        {
          label: "Open",
          content: [
            {
              label: "Open file",
              onClick: () => window.dispatchEvent(new CustomEvent("open-file")),
            },
            {
              label: "Open folder",
              // Todo: これが機能していないs
              onClick: () =>
                window.dispatchEvent(new CustomEvent("open-folder")),
            },
          ],
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
      content: [
        {
          label: "Manage extensions",
          onClick: () =>
            window.dispatchEvent(new CustomEvent("open-extensions-manager")),
        },
      ],
    },
    {
      label: "Help",
      content: [
        {
          label: "About",
          onClick: () => window.dispatchEvent(new CustomEvent("open-about")),
        },
        { label: "Documentation", shortcut: "F1" },
        { label: "Version Info" },
      ],
    },
  ];
  return (
    <header className="flex-none">
      <Menubar className="rounded-none border-0">
        {menubar.map((menu) => (
          <MenubarMenu key={menu.label}>
            <MenubarTrigger>{menu.label}</MenubarTrigger>
            <MenubarContent>
              {menu.content.map((item) =>
                item.content ? (
                  <Sub key={item.label} menu={item} />
                ) : (
                  <MenubarItem key={item.label} onClick={item.onClick}>
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
function Sub({ menu }: { menu: Content }) {
  return (
    <MenubarSub>
      <MenubarSubTrigger>{menu.label}</MenubarSubTrigger>
      <MenubarSubContent>
        {menu.content?.map((item: any) =>
          item.content ? (
            <Sub key={item.label} menu={item} />
          ) : (
            <MenubarItem key={item.label} onClick={item?.onClick}>
              {item.label}
            </MenubarItem>
          ),
        )}
      </MenubarSubContent>
    </MenubarSub>
  );
}
