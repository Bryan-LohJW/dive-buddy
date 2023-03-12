import { useState } from "react";
import NavBar from "~/components/ui/NavBar";

const Home = () => {
  const [page, setPage] = useState(1);
  const pageHandler = (pageNo: number) => {
    if (page === pageNo) {
      return;
    }
    setPage(pageNo);
  };

  const pageSwitch = (pageNo: number) => {
    switch (pageNo) {
      case 0:
        return <>Best</>;
      case 1:
        return <>Training</>;
      case 2:
        return <>History</>;
      default:
        return <>Training</>;
    }
  };

  return (
    <>
      <NavBar page={page} pageHandler={pageHandler}>
        {pageSwitch(page)}
      </NavBar>
    </>
  );
};

export default Home;
