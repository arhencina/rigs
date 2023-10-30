"use client";
import dynamic from "next/dynamic";
import Providers from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const NoSSRLayout = dynamic(() => import("../components/layout"), {
    ssr: false,
  });

  return (
    <html suppressHydrationWarning={true}>
      <Providers>
        <body style={{ overflowX: "hidden" }}>
          <NoSSRLayout>{children}</NoSSRLayout>
        </body>
      </Providers>
    </html>
  );
}
