"use server";

import React from "react";
import Image from "next/image";
import AuthButton from "@/components/AuthButton";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/actions/auth.actions";

const rootLayout = async ({ children }: { children: React.ReactNode }) => {
  // const cookieStore = await cookies();
  // const END_POINT = "/api/user";
  // const URL = process.env.HOSTNAME + END_POINT
  // const response = await fetch(URL, {
  //   method: "GET",
  //   credentials: "include",
  //   headers: {
  //     Cookie: cookieStore.toString(),
  //   }
  // });

  // let user = await getCurrentUser();
  let user = {name: "USER"}
  // user = user.user;
  
  return (
    <div className="root-layout">
      <nav className="flex justify-between">
        <div className="flex items-center gap-2">
          <Image src="./logo.svg" alt="logo" width={38} height={38} />
          <h2 className="">Advance Prep</h2>
        </div>
        <div className="flex gap-4 justify-between items-center">
          <h5 className="text-xl">{user?.name}</h5>
          <AuthButton user={user} />
        </div>
      </nav>

      <div>{children}</div>
    </div>
  );
};

export default rootLayout;
