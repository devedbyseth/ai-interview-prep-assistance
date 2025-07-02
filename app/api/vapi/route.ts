import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { db } from "@/firebase/admin";
import { getCurrentUser } from "@/actions/auth.actions";

// ✅ GET route
export async function GET() {
  const user = await getCurrentUser();
  console.log("User found?", !!user);

  if (user) {
    return Response.json(
      { status: 202, message: "Success", user },
      { status: 202 }
    );
  }

  return Response.json(
    { status: 404, message: "User not found" },
    { status: 404 }
  );
}

// ✅ POST route
export async function POST(req: Request) {
  try {
    const { role, level, techstack, type, amount } = await req.json();

    const prompt = `Prepare questions for a job interview.
      The job role is ${role}.
      The job experience level is ${level}.
      The tech stack used in the job is: ${techstack}.
      The focus between behavioural and technical questions should lean towards: ${type}.
      The amount of questions required is: ${amount}.
      Please return only the questions, without any additional text.
      The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
      Return the questions formatted like this: ["Question 1", "Question 2", "Question 3"]
      
      Thank you! <3
    `;

    const user = await getCurrentUser();
    if (!user) {
      return Response.json(
        { status: 401, message: "Unauthorized: User not found" },
        { status: 401 }
      );
    }

    const { text } = await generateText({
      model: google("gemini-2.0-flash"),
      prompt,
    });

    console.log("Response from Gemini:", text);

    let questions: string[] = [];
    try {
      // ✅ Only attempt parse if text is valid
      if (typeof text === "string" && text.trim().startsWith("[")) {
        questions = JSON.parse(text.trim());
      } else {
        console.warn("Invalid AI response format:", text);
        return Response.json(
          { status: 500, message: "AI response is not valid JSON array", raw: text },
          { status: 500 }
        );
      }
    } catch (error) {
      console.error("Error parsing Gemini response:", error);
      return Response.json(
        { status: 500, message: "Error parsing AI output", raw: text },
        { status: 500 }
      );
    }

    const interview = {
      id: user.id,
      role,
      level,
      techstack,
      type,
      amount,
      questions,
    };

    await db.collection("interviews").add(interview);

    return Response.json(
      { status: 200, message: "Success", interview },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error in POST handler:", error);
    return Response.json(
      { status: 500, message: "Server error", error: error?.toString() },
      { status: 500 }
    );
  }
}
