import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

import googleSignIn from "/public/assets/btn_google_signin_light_normal_web@2x.png";

import diveBuddyIcon from "/public/assets/dive-logo.png";

const Auth = () => {
  const [height, setHeight] = useState("h-full");
  const toggleHeight = () => {
    setTimeout(() => {
      setHeight("h-4/6");
    }, 1500);
  };
  console.log("render");
  toggleHeight();

  return (
    <div className="h-screen w-auto flex-col overflow-y-hidden bg-secondary">
      <div className={`relative ${height} p-5 transition-all duration-1000`}>
        <h1 className="relative top-1/4 -translate-y-1/2 text-center text-4xl font-bold text-primary">
          Dive Buddy
        </h1>
        <Image
          alt="dive buddy"
          src={diveBuddyIcon}
          className="relative top-2/3 left-1/2 w-72 -translate-y-1/2 -translate-x-1/2"
        />
      </div>
      <div className="h-96 w-full rounded-3xl bg-primary px-5 pt-10 text-secondary">
        <h1 className="mb-5 text-2xl font-bold">Welcome</h1>
        <p className="mb-5">
          Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit
          amet. Vitae tortor condimentum lacinia quis vel eros.
        </p>
        <button
          className="w-48"
          onClick={() => {
            void signIn("google", { callbackUrl: "http://localhost:3000/" });
          }}
        >
          <Image src={googleSignIn} alt="google icon" />
        </button>
      </div>
      <div className="animation-test absolute">Hello</div>
    </div>
  );
};

export default Auth;
