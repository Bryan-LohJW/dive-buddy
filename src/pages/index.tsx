import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import googleSignIn from "/public/assets/btn_google_signin_light_normal_web@2x.png";
import diveBuddyIcon from "/public/assets/dive-logo.png";
import { useEffect } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const Auth = () => {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      void router.push("/home");
      toast(`Logged in`, {
        position: "top-center",
      });
    }
  }, [status, router]);

  return (
    <div className="absolute top-0 bottom-0 w-full flex-col overflow-y-hidden bg-secondary">
      <div className={`relative h-[calc(100%-10rem)] p-5`}>
        <h1 className="relative top-[20%] text-center text-4xl font-bold text-primary">
          Dive Buddy
        </h1>
        <Image
          alt="dive buddy"
          src={diveBuddyIcon}
          className="relative top-1/4 left-1/2 w-72 -translate-x-1/2"
        />
      </div>
      <div className="relative z-10 flex h-[10rem] w-full flex-col justify-between rounded-t-3xl bg-primary py-5 px-10 text-secondary">
        <div>
          <h1 className="text-2xl font-bold">Welcome</h1>
          <p className="">Please sign in to continue.</p>
        </div>
        <button
          className="w-48"
          onClick={() => {
            void signIn("google", {
              callbackUrl: "http://localhost:3000/home",
            });
          }}
        >
          <Image src={googleSignIn} alt="google icon" />
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-0 flex justify-evenly">
        <div className="h-8 w-8 animate-float1 rounded-full bg-primary delay-1000"></div>
        <div className="h-10 w-10 animate-float2 rounded-full bg-primary delay-1000"></div>
        <div className="h-12 w-12 animate-float3 rounded-full bg-primary delay-1000"></div>
        <div className="h-6 w-6 animate-float4 rounded-full bg-primary delay-1000"></div>
        <div className="h-10 w-10 animate-float5 rounded-full bg-primary delay-1000"></div>
        <div className="h-13 w-13 animate-float6 rounded-full bg-primary delay-1000"></div>
        <div className="h-10 w-10 animate-float1 rounded-full bg-primary delay-1000"></div>
        <div className="h-15 w-15 animate-float2 rounded-full bg-primary delay-1000"></div>
      </div>
    </div>
  );
};

export default Auth;
