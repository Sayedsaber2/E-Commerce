  "use client"
  import React from "react";
  import { Toaster } from "react-hot-toast";
  import Footer from "@/components/Footer/Footer";
  import CookieBanner from "@/components/CookieBanner/CookieBanner";
  import { SessionProvider } from "next-auth/react";
  export default function MianContext({children}:{children:React.ReactNode}) {
    return <div>
      <SessionProvider>

            
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
            <div className=" ">

              {children}
            </div>
            <CookieBanner />
            <Footer />
          </SessionProvider>
    </div>;
  }
