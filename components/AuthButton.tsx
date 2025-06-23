"use client"

import { signOut } from "@/actions/auth.actions";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthButton({ user }: any) {
  async function handleSignOut() {
    const result = await signOut();
    result.success && toast.success("Sign out successfully");
  }
  return (
    <div>
      {!user ? (
        <Button className="btn-secondary card-interview border !text-white">
          <Link href="/sign-in">Sign In</Link>
        </Button>
      ) : (
        <Button
          className="btn-secondary card-interview border !text-white"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      )}
    </div>
  );
}
