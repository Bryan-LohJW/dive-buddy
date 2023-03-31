import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import "@fontsource/inter";
import { SkeletonTheme } from "react-loading-skeleton";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import MyHead from "~/components/MyHead";
import { Toaster } from "react-hot-toast";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <SkeletonTheme highlightColor="#B3B3B3" baseColor="	#E3E3E3">
        <MyHead />
        <Toaster />
        <Component {...pageProps} />
      </SkeletonTheme>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
