import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ClientRoute } from "@config/route";
import Contour from "@app/admin/(block)/components/contour";

const HomeMenu = () => {
  const [isMenuOn, setIsMenuOn] = useState<boolean>(false);
  const router = useRouter();

  async function handleLogout() {
    try {
      // 인증 관련 데이터 제거
      const response = await fetch("/api/logout", {
        credentials: "include",
        method: "POST",
      });
      if (response.ok) {
        alert("로그아웃 되었습니다.");
        router.push(`/intro`);
      }
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  }

  return (
    <>
      {isMenuOn && (
        <button
          type="button"
          onClick={() => setIsMenuOn(false)}
          className="cursor-default before:fixed before:left-0 before:top-0 before:h-screen before:w-screen before:opacity-0"
          aria-label="메뉴 닫기"
        />
      )}
      <nav
        aria-label="프로필 관련 메뉴"
        className="absolute right-3 top-3 sm:right-4 sm:top-4"
      >
        <button
          onClick={() => setIsMenuOn((prev) => !prev)}
          className="rounded-3xl border-2 border-gray-200 bg-white p-1.5 shadow-inner transition-colors duration-200 dark:bg-[var(--background)] sm:p-2"
          aria-expanded={isMenuOn}
          aria-controls="user-menu"
          aria-label="프로필 메뉴 열기/닫기"
        >
          <Image
            src="/assets/icons/icon_menu.png"
            alt=""
            width={20}
            height={20}
            className="h-4 w-4 sm:h-5 sm:w-5"
          />
        </button>
        {isMenuOn && (
          <div id="user-menu" className="relative right-0 top-1">
            <ul className="absolute right-0 w-max rounded-md border-1 border-gray-200 bg-white px-2 text-sm dark:bg-[var(--background)] dark:text-[var(--foreground)] sm:text-base">
              <li className="p-1.5 sm:p-2">
                <Link
                  href={ClientRoute.ADMIN}
                  className="block w-full rounded-md px-2 py-1 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Admin
                </Link>
              </li>
              <Contour />
              <li className="p-1.5 sm:p-2">
                <Link
                  href={ClientRoute.PROFILE.DETAIL}
                  className="block w-full rounded-md px-2 py-1 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  회원 정보 조회
                </Link>
              </li>
              <Contour />
              <li className="p-1.5 sm:p-2">
                <button
                  onClick={handleLogout}
                  className="block w-full rounded-md px-2 py-1 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Logout
                </button>
              </li>
              <Contour />
              <li className="p-1.5 sm:p-2">
                <Link
                  href={ClientRoute.LOGIN}
                  className="block w-full rounded-md px-2 py-1 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default HomeMenu;
