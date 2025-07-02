import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { db } from "@/firebase/admin";
import { getCurrentUser } from "@/actions/auth.actions";

export async function GET() {
  const user = await getCurrentUser();
  console.log(!user);
  if(user) return Response.json({ status: 202, message: "Success", user }, { status: 200 });
  return Response.json({status: 404, message: "User not found"}, { status: 404 });
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
      let questions: String[] = [];
      try {
        questions = JSON.parse(text.toString());
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return Response.json({ status: 500, message: "Error parsing JSON", error })
      }
      const interview = {
        id: user?.id,
        role,
        level,
        techstack,
        type,
        amount,
        questions
      };

      await db.collection("interviews").add(interview);
      return Response.json({ status: 200, message: "Success", interview }, {status: 200});
    } else {
      return Response.json({ status: 500, message: "User not found" }, {status: 500});
    }
  } catch (error) {
    return Response.json({ status: 500, message: "Error", error }, {status: 500});
  }
}
