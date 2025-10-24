import { Roboto } from "next/font/google";
import "./globals.css";
import AuthProvider from "./providers/AuthProvider";
import { SessionProvider } from "next-auth/react";
import { dbConnect } from "@/services/mongo";
import ThemeProvider from "./providers/ThemeProvider";
import ResponseProvider from "./providers/ResponseProvider";
import TopNavbar from "@/components/TopNavbar";
import TopNavBarWarper from "@/components/TopNavBarWarper";
import ThemeWrapper from "@/components/ThemeWrapper";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: "E-commerce",
  description: "E-commerce",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (
    <html lang="en">
      <body className={roboto.className}>
        <SessionProvider>
          <ResponseProvider>
            <ThemeProvider>
              <AuthProvider>
                  <ThemeWrapper>
                    <TopNavbar />
                    <TopNavBarWarper>{children}</TopNavBarWarper>
                  </ThemeWrapper>
              </AuthProvider>
            </ThemeProvider>
          </ResponseProvider>
        </SessionProvider>
      </body>
    </html>
  );
}