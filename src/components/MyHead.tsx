import Head from "next/head";
import { type FC } from "react";

const MyHead: FC = ({}) => {
  return (
    <Head>
      <title>Freedive Buddy</title>
      <meta name="description" content="Freedive Buddy" />
      <link rel="icon" href="/assets/icons/favicon.ico" />
      <meta name="application-name" content="PWA App" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Freedive Buddy" />
      <meta name="description" content="Freedive Buddy" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-config" content="/icons/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#F4819F" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#F4819F" />

      <link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/assets/icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/assets/icons/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="mask-icon"
        href="/assets/icons/maskable-icon.png"
        color="#F4819F"
      />
      <link rel="shortcut icon" href="/assets/icons/favicon.ico" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content="https://yourdomain.com" />
      <meta name="twitter:title" content="Freedive Buddy" />
      <meta name="twitter:description" content="Freedive Buddy" />
      {/* <meta
        name="twitter:image"
        content="https://yourdomain.com/icons/android-chrome-192x192.png"
      /> */}
      {/* <meta name="twitter:creator" content="@DavidWShadow" /> */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Freedive Buddy" />
      <meta property="og:description" content="Freedive Buddy" />
      <meta property="og:site_name" content="Freedive Buddy" />
      <meta property="og:url" content="https://yourdomain.com" />
      <meta
        property="og:image"
        content="https://yourdomain.com/icons/apple-touch-icon.png"
      />
      {/* apple splash screen images
<link rel='apple-touch-startup-image' href='/images/apple_splash_2048.png' sizes='2048x2732' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_1668.png' sizes='1668x2224' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_1536.png' sizes='1536x2048' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_1125.png' sizes='1125x2436' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_1242.png' sizes='1242x2208' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_750.png' sizes='750x1334' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_640.png' sizes='640x1136' /> */}
    </Head>
  );
};
export default MyHead;
