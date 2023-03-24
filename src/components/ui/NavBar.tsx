import { type FC, type PropsWithChildren } from "react";
import { type IconType } from "react-icons/lib";
import { TbScubaMask, TbHistory, TbAward } from "react-icons/tb";

type NavItemProps = {
  title: string;
  Icon: IconType;
  pageNo: number;
  pageHandler: (pageNo: number) => void;
};

type NavBarProps = {
  page: number;
  pageHandler: (pageNo: number) => void;
};

const NavItem: FC<PropsWithChildren<NavItemProps>> = ({
  children,
  title,
  Icon,
  pageNo,
  pageHandler,
}) => {
  const onChangePage = () => {
    pageHandler(pageNo);
  };
  return (
    <div
      className="relative flex flex-1 flex-col justify-center"
      onClick={onChangePage}
    >
      {children}
      <Icon size={36} className="mx-auto text-secondary" />
      <p className="text-center text-sm font-semibold text-secondary">
        {title}
      </p>
    </div>
  );
};

const NavBar: FC<NavBarProps> = ({ page, pageHandler }) => {
  const xTransVariants: { [key: number]: string } = {
    0: "translate-x-0",
    1: "translate-x-full",
    2: "translate-x-[200%]",
  };

  return (
    <>
      <div className="fixed top-full flex h-20 w-full -translate-y-full justify-between rounded-t-2xl bg-primary align-middle">
        <NavItem
          title="Best"
          Icon={TbAward}
          pageNo={0}
          pageHandler={pageHandler}
        >
          <div
            className={`absolute -z-10 h-full w-full ${
              xTransVariants[page] || "translate-x-full"
            } -translate-y-4 transform rounded-full bg-primary transition-transform duration-300 ease-in-out`}
          ></div>
        </NavItem>
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
