import { type FC, type PropsWithChildren, useState } from "react";
import NavBar from "~/components/ui/NavBar";

const INITIAL_PAGE = 1;

type PageContentProps = {
  page: number;
  index: number;
};

const PageContent: FC<PropsWithChildren<PageContentProps>> = ({
  children,
  page,
  index,
}) => {
  return (
    <main className={`${page === index ? "" : "hidden"}`}>{children}</main>
  );
};

const Home = () => {
  const [page, setPage] = useState(INITIAL_PAGE);
  const pageHandler = (pageNo: number) => {
    if (page === pageNo) {
      return;
    }
    setPage(pageNo);
  };

  return (
    <>
      <PageContent index={0} page={page}>
        <p>Best</p>
      </PageContent>
      <PageContent index={1} page={page}>
        <p>Training</p>
      </PageContent>
      <PageContent index={2} page={page}>
        <p>History</p>
      </PageContent>
      <NavBar page={page} pageHandler={pageHandler} />
    </>
  );
};

export default Home;
