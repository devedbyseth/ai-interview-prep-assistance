import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { db } from "@/firebase/admin";
import { getCurrentUser } from "@/actions/auth.actions";

export async function GET() {
  const user = await getCurrentUser();
  return Response.json({ status: 200, message: "Success", user });
}

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

    if (user) {
      const { text } = await generateText({
        model: google("gemini-2.0-flash"),
        prompt,
      });

      console.log("text from gg api: ", text);

      const interview = {
        id: user?.id,
        role,
        level,
        techstack,
        type,
        amount,
        questions: JSON.parse(text.toString()),
      };

      await db.collection("interviews").add(interview);
      return Response.json({ status: 200, message: "Success", interview });
    } else {
      return Response.json({ status: 500, message: "User not found" });
    }
  } catch (error) {
    Response.json({ status: 500, message: "Error", error });
  }
}
