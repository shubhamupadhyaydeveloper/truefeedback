"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import MaxWidthWrapper from "./MainWidth";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  const token = useSession();
  console.log(token)
  return (
    <MaxWidthWrapper>
      <div className="p-4 flex justify-between">
        <h1 className="text-xl font-bold">Message Mestery</h1>
        {token?.status === 'authenticated' ? (
          <div className="flex gap-2">
            <Button onClick={() => signOut()}>Logout</Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button>
              <Link href="/signin">Login</Link>
            </Button>
            <Button>
              <Link href="/signup">Signup</Link>
            </Button>
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default Navbar;
