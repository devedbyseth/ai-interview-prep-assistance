import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { getCurrentUser } from "@/actions/auth.actions";
import { db } from "@/firebase/admin";
import {  NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    // const body = await req.json();
    const body= {
        role: "Software Engineer",
        level: "Entry Level",
        techstack: ["nextjs"],
        type: "Behavioural",
        amount: 10
    }
    const { role, level, techstack, type, amount } = body;

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
    let user = {name: "USER", id: "123"}
    // const user = await getCurrentUser();
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { text } = await generateText({
      model: google("gemini-2.0-flash"),
      prompt,
    });

    let questions: string[] = JSON.parse(text);

    const interview = {
        id: user?.id,
        ...body,
        questions
    }
    await db.collection("interviews").add(interview);

    return NextResponse.json({ questions, message: "Questions generated successfully" }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
