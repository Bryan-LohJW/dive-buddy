import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

import googleSignIn from "/public/btn_google_signin_light_normal_web@2x.png";

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
    <div className="h-screen w-auto flex-col overflow-y-hidden bg-primary">
      <div className={`relative ${height} transition-all duration-1000`}>
        <h1 className="relative top-1/3 -translate-y-1/2 text-center text-4xl font-bold text-secondary">
          Dive Buddy
        </h1>
        <h1 className="relative top-1/2 -translate-y-1/2 text-center text-xl font-bold text-secondary">
          Probably the logo or smth
        </h1>
      </div>
      <div className="h-96 w-full rounded-3xl border-4 bg-secondary px-5 pt-10 text-primary">
        <h1 className="mb-5 text-2xl font-bold">Welcome</h1>
        <p className="mb-5">
          Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit
          amet. Vitae tortor condimentum lacinia quis vel eros.
        </p>
        <button
          className="w-48 border-2 border-solid border-secondary"
          onClick={() => {
            void signIn("google", { callbackUrl: "http://localhost:3000/" });
          }}
        >
          <Image src={googleSignIn} alt="google icon" />
        </button>
      </div>
    </div>
  );
};

export default Auth;
