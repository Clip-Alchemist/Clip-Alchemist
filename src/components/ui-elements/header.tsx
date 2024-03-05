import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
export default function Header() {
  return (
    <header className="select-none bg-gray-50 flex-none">
      <div>
        <p className="w-full text-center my-0">Clip Alchemist</p>
      </div>
      <Menubar className="bg-gray-50">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
            <MenubarItem>
              Open<MenubarShortcut>Ctrl+O</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Save<MenubarShortcut>Ctrl+S</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Settings</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Manage extensions</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Help</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>About</MenubarItem>
            <MenubarItem>Documentation</MenubarItem>
            <MenubarItem>Version</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <div className="h-full static" />
    </header>
  );
}
