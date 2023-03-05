import { useRouter } from "next/router";
import { type FC } from "react";
import { BiHome } from "react-icons/bi";

const Appbar: FC = () => {
  const router = useRouter();

  const NAVBAR_LINKS = [
    { icon: <BiHome className="text-2xl" />, label: "Home", link: "/" },
  ];

  return (
    <div className="fixed bottom-0 left-0 flex h-16 w-full items-center justify-between bg-blue-900 px-8">
      {NAVBAR_LINKS.map(({ icon, label, link }) => (
        <div
          key={label}
          className="flex cursor-pointer flex-col items-center gap-[2px] text-white"
          onClick={() => void router.push(link)}
        >
          {icon}
          <div>{label}</div>
        </div>
      ))}
    </div>
  );
};
export default Appbar;
