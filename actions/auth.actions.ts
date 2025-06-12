"use server";

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";
import { db as userDb } from "@/firebase/client";
import { getDoc, doc } from "firebase/firestore";

export const signUp = async ({ uid, name, email, password }: SignUpParams) => {
  try {
    console.log("server uid: ", uid);
    const user = await db.collection("users").doc(uid).get();
    console.log("user: ", user.exists);
    if (user.exists) {
      console.log("user exist: ", user.exists);
      return {
        success: false,
        code: "auth/email-already-in-use",
      };
    }

    const newUser = await db
      .collection("users")
      .doc(uid)
      .set({ name, email, password });
    console.log("user with ", uid, "have been created");
    return {
      success: true,
    };
  } catch (error: any) {
    auth.deleteUser(uid);
    console.log("user with ", uid, "have been deleted");
    console.log("firestore error: ", error);
    return {
      success: false,
      error: "firestore-failed",
      code: error.code || null,
      message: error.message ?? "Unknown firestore error",
      details: error.stact ?? null,
    };
  }
};

export const signIn = async ({ email, idToken }: SignInParams) => {
  try {
    const expiresIn = 60 * 60 * 24 * 1 * 1000;

    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });
    (await cookies()).set("session", sessionCookie, {
      maxAge: expiresIn / 1000,
      path: "/",
      httpOnly: true,
      secure: true,
    });
    return {
      success: true,
    };
  } catch (error) {
    console.log("error: ", error);
    return {
      success: false,
      code: "auth/invalid-credential",
    };
  }
};

export const signOut = async () => {
  try {
    const res = (await cookies()).set("session", "", {
      maxAge: 0,
      path: "/",
    });
    console.log("cookie deleted")
    return {
      success: true,
    };
  } catch (error) {
    console.log("error: ", error);
    return {
      success: false,
    };
  }
};

export const getUser = async () => {
  try {
    const sessionCookie = (await cookies()).get("session")?.value;
    if (sessionCookie) {
      const decodeClaim = await auth.verifySessionCookie(sessionCookie);
      const user = await db.collection("users").doc(decodeClaim.uid).get();
      return user.data();
    }
  } catch (error) {
    console.log("error.....................", error);
    return null;
  }
};

export const verifyCookie = async (cookie: string) => {
  try {
    const decodeClaim = await auth.verifySessionCookie(cookie, true);
    return {
      success: true,
      uid: decodeClaim.uid,
    };
  } catch (error) {
    console.log("error: ", error);
    return {
      success: false,
    };
  }
};
