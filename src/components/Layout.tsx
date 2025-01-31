"use client";

import Header from "@/components/Header";
import cn from "classnames";
import Footer from "@/components/Footer";
import { useParams } from "next/navigation";

export default function Layout({ children }) {
  const params = useParams();

  const isSlug = Boolean(params.slug);
  const _fullWidth = isSlug ? false : undefined; // TODO: Need to check the case where Post can have fullWidth property
  const _layout = isSlug ? "blog" : "";

  return (
    <>
      <Header />
      <main
        className={cn(
          "flex-grow transition-all",
          _layout !== "blog" && [
            "self-center px-4",
            _fullWidth ? "md:px-24" : "w-full max-w-2xl",
          ]
        )}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
