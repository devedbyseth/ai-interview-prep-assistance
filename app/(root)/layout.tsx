"use server"

import React from "react";
import Image from "next/image";
import { getCurrentUser, isUserAuthenticated } from "@/actions/auth.actions";
import AuthButton from "@/components/AuthButton";
import { redirect } from "next/navigation";


const rootLayout = async ({ children }: { children: React.ReactNode }) => {
  if(!(await isUserAuthenticated())) redirect("/sign-in");
  const user = await getCurrentUser();
  return (
    <div className="root-layout">
      <nav className="flex justify-between">
        <div className="flex items-center gap-2">
          <Image src="./logo.svg" alt="logo" width={38} height={38} />
          <h2 className="">Advance Prep</h2>
        </div>
        <div className="flex gap-4 justify-between items-center">
          <h5 className="text-xl">{user?.name}</h5>
          <AuthButton user={user}  />
        </div>
      </nav>

      <div>{children}</div>
    </div>
  );
};

export default rootLayout;
