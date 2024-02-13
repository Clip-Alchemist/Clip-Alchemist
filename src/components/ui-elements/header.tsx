export default function Header() {
  return (
    <header className="select-none bg-gray-50 flex-none h-12 fixed top-0 inset-x-0">
      <div>
        <p className="w-full text-center my-0">Clip Alchemist</p>
      </div>
      <nav>
        <ul className="flex">
          <li>
            <Menu
              title="File"
              items={[{ name: "New" }, { name: "Open" }, { name: "Save" }]}
            />
          </li>
          <li>
            <Menu title="Settings" />
          </li>
          <li>
            <Menu title="help" />
          </li>
        </ul>
      </nav>
    </header>
  );
}
function Menu({ title, items }: { title: string; items?: { name: string }[] }) {
  return (
    <div className="group hover:bg-gray-100">
      <p className="px-4">{title}</p>
      <ul className="hidden group-hover:block fixed bg-gray-100">
        {items?.map((item, i) => (
          <li key={i} className="p-2">
            <button>{item.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
