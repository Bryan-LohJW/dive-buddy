import { type ReactNode } from "react";
import { type IconType } from "react-icons/lib";
import { TbScubaMask, TbHistory, TbAward } from "react-icons/tb";

type NavItemProps = {
  title: string;
  Icon: IconType;
  pageNo: number;
  pageHandler: (pageNo: number) => void;
};

type NavBarProps = {
  children: ReactNode;
  page: number;
  pageHandler: (pageNo: number) => void;
};

const NavItem = ({ title, Icon, pageNo, pageHandler }: NavItemProps) => {
  const onChangePage = () => {
    pageHandler(pageNo);
  };
  return (
    <div className="flex w-1/3 flex-col justify-center" onClick={onChangePage}>
      <Icon size={36} className="mx-auto text-secondary" />
      <p className="text-center text-sm font-semibold text-secondary">
        {title}
      </p>
    </div>
  );
};

const NavBar = ({ children, page, pageHandler }: NavBarProps) => {
  const xTransVariants: { [key: number]: string } = {
    0: "translate-x-0",
    1: "translate-x-full",
    2: "translate-x-[200%]",
  };

  return (
    <>
      {children}
      <div className="fixed top-full flex h-20 w-full -translate-y-full justify-between rounded-t-xl bg-primary align-middle">
        <div
          className={`absolute -z-10 h-full w-1/3 ${
            xTransVariants[page] || "translate-x-full"
          } -translate-y-4 transform rounded-full bg-primary transition-transform duration-300 ease-in-out`}
        ></div>
        <NavItem
          title="Best"
          Icon={TbAward}
          pageNo={0}
          pageHandler={pageHandler}
        />
        <NavItem
          title="Training"
          Icon={TbScubaMask}
          pageNo={1}
          pageHandler={pageHandler}
        />
        <NavItem
          title="History"
          Icon={TbHistory}
          pageNo={2}
          pageHandler={pageHandler}
        />
      </div>
    </>
  );
};

export default NavBar;
