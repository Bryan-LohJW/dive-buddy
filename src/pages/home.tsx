import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type FC, type PropsWithChildren, useState, useEffect } from "react";
import toast from "react-hot-toast";
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
  if (page !== index) return <></>;

  return <main>{children}</main>;
};

const Home = () => {
  const [page, setPage] = useState(INITIAL_PAGE);
  const { data: sessionData, status: isSessionLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isSessionLoading !== "loading" && !sessionData) {
      void router.push("/");
      toast("Log in to continue", { position: "top-center" });
    }
  }, [isSessionLoading, sessionData, router]);

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
