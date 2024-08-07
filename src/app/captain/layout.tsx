import type { Metadata } from "next";
// import "./globals.css";
import { Navigation } from "../../components";
import Footer from "../../components/Footer";
import { Session, viewport } from "@/lib/definitions";
import NextTopLoader from "nextjs-toploader";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session: Session = await getSession();

  return (
    <html lang="english">
      <head >
        <meta name="viewport" content={viewport} />
      </head>
      <body className={"font-Inter-Regular"}>

        {/* Top Loader */}
        <div className="z-[99999]">
          <NextTopLoader showSpinner={false} color="#b1dc30" />
        </div>

        {/* Navigation0 */}
        <Navigation session={session} />

        {children}
        <Footer />
      </body>
    </html>
  );
}
