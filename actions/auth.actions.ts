"use server";

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

export const signUp = async ({ uid, name, email, password }: SignUpParams) => {
  try {
    // this was for when the signUpWithEmailAndPassword() not working or sth wrong with the code around it in the front end file related to this.
    // <<< const user = await db.collection("users").doc(uid).get();
    // if (user.exists) {
    //   return {
    //     success: false,
    //     message: "Email already exists.",
    //   };
    // } >>>

    await db.collection("users").doc(uid).set({ name, email, password });
    return {
      success: true,
      message: "Signed up successfully. Please sign in.",
    };
  } catch (error: any) {

    //  this too

    // auth.deleteUser(uid);
    // if (error.code === "auth/email-already-in-use") {
    //   return {
    //     success: false,
    //     message: "Email already exists.",
    //   };
    // }
    return {
      success: false,
      message: "Failed to sign up. Please try again later.",
    };
  }
};

export const signIn = async (idToken: string) => {
  try {
    const result = await createSessionCookie(idToken);
    if(!result.success) throw new Error("Failed to create session cookie")
    return {
      success: true,
      message: "Signed in successfully."
    };
  } catch (error) {
    console.log("error: ", error);
    return {
      success: false,
      message: "Failed to Sign In. Please try again.",
    };
  }
};

export const signOut = async () => {
  try {
    (await cookies()).set("session", "", {
      maxAge: 0,
      path: "/",
    });
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

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const sessionCookie = (await cookies()).get("session")?.value;

    if (!sessionCookie) return null;

    const decodeClaim = await auth.verifySessionCookie(sessionCookie);
    const user = await db.collection("users").doc(decodeClaim.uid).get();
    const userRecord = user.data();

    if(!userRecord) return null;

    return { ...userRecord,id: user.id } as User;
    
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};

export const isUserAuthenticated = async () => {
  const user = await getCurrentUser();
  return !!user;
};

const createSessionCookie = async (idToken: string) => {
  try {
    const cookieStore = await cookies();
    const expiresIn = 60 * 60 * 24 * 1 * 1000;
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });

    cookieStore.set("session", sessionCookie, {
      maxAge: expiresIn / 1000,
      path: "/",
      httpOnly: true,
      secure: true,
    });
    return {
      success: true,
    }
  } catch (error) {
    console.log("error: ", error);
    return {
      success: false,
    };
  }
};
