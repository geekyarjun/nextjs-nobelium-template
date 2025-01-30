"use client";

import { useLocale } from "@/lib/locale";

export default function ScrollTop() {
  const locale = useLocale();

  return (
    <a>
      <button
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className="mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100"
      >
        ↑ {locale.POST.TOP}
      </button>
    </a>
  );
}
