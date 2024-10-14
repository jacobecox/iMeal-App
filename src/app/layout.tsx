"use client";
import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/navBar";
import { Provider } from "react-redux";
import store from "./store/configureStore";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-cyan-700 to-cyan-700 via-cyan-500">
        <NavBar />
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
