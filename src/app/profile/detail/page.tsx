"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

import { User } from "@/types/user";
import FormInput from "@app/admin/(block)/components/form-input";

export default function ProfileDetail() {
  const [userData, setUserData] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await fetch(`/api/user/info`, {
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          const { user } = data;
          setUserData(user);
        } else {
          console.error("Failed to fetch user info:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
    fetchUserInfo().then();
  }, []);

  if (!userData) return <p className="p-4 text-center">Loading...</p>;

  return (
    <div className="flex min-h-screen flex-col justify-center gap-8 px-4 py-4 sm:gap-12 sm:px-8 md:gap-16 md:px-20">
      <div className="sr-only">
        <h1>IN MY LINK 회원 정보 페이지입니다!</h1>
        <p>회원님의 정보를 확인하세요.</p>
      </div>

      <div className="flex flex-col gap-4 sm:gap-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-8 sm:w-auto"
        >
          <Image
            src="/assets/icons/icon_back.png"
            alt="뒤로가기 아이콘"
            width={34}
            height={34}
            className="h-auto w-[24px] sm:w-[34px]"
          />
        </button>
        <p className="pageName">IN MY LINK 회원 정보</p>
      </div>

      <div className="flex w-full flex-col gap-3 sm:gap-4">
        {/* 아이디 필드 */}
        <FormInput
          label="아이디"
          id="userId"
          value={userData.userId}
          readOnly
          className="border-gray-300 bg-gray-100"
        />

        {/* 이름 필드 */}
        <FormInput
          label="이름"
          id="name"
          value={userData.name}
          readOnly
          className="border-gray-300 bg-gray-100"
        />

        {/* 이메일 필드 */}
        <FormInput
          label="이메일"
          id="email"
          value={userData.email || "미입력"}
          readOnly
          className="border-gray-300 bg-gray-100"
        />

        {/* 회원 정보 수정 버튼 */}
        <button
          type="button"
          className={twMerge("button color mt-8 text-base sm:mt-16")}
          onClick={() => router.push(`/profile/edit`)}
        >
          회원 정보 수정
        </button>
      </div>
    </div>
  );
}
