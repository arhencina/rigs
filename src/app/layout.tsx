"use client";
import { Providers } from "./providers";
import PageLayout from "@/components/layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <Providers>
        <body style={{ overflowX: "hidden" }}>
          <PageLayout>{children}</PageLayout>
        </body>
      </Providers>
    </html>
  );
}
