import ExtensionManager from "@/components/element/extensions/manager";
import Header from "@/components/element/header";
import Main from "@/components/element/main";
import { useLocalStorage } from "@/hooks/useLocalStorage";
export default function Page() {
  // save extension.json url
  const [extensions, setExtensions] = useLocalStorage<Array<string>>(
    "extensions",
    [],
  );
  return (
    <>
      <Header />
      <Main />
      <ExtensionManager extensions={extensions} setExtensions={setExtensions} />
    </>
  );
}
