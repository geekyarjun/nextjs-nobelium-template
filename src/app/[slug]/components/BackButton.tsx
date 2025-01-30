"use client";

import { useConfig } from "@/lib/config";
import { useLocale } from "@/lib/locale";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const locale = useLocale();
  const BLOG = useConfig();
  const router = useRouter();

  return (
    <a>
      <button
        onClick={() => router.push(BLOG.path || "/")}
        className="mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100"
      >
        ← {locale.POST.BACK}
      </button>
    </a>
  );
}
