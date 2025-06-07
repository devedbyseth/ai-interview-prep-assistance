import { cn, getSrcRandomCover, getTechLogos } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { Button } from "./ui/button";

const InterviewCard = ({ type, role, createdAt, techstack }: Interview) => {
  const feedback = null as Feedback | null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formatedDate = dayjs(createdAt || Date.now()).format("MMM DD, YYYY");
  return (
    <div className="card-border max-sm:w-full w-[360px]">
      <div className="card-interview">
        <div className="absolute top-0 right-0 py-1 px-4 text-xs bg-blue-200/20 rounded-bl-sm ">
          <p className="badge-text">{normalizedType}</p>
        </div>
        <Image
          src={`/covers${getSrcRandomCover()}`}
          alt="company logo"
          width={90}
          height={90}
          className="object-fit size-[90] rounded-full"
        />
        <h3 className="capitalize mt-2">{role} Interview</h3>
        <div className="flex gap-5 text-sm">
          <div className="flex items-center gap-2">
            <Image src="/calendar.svg" alt="calendar" width={20} height={20} />
            <p>{formatedDate}</p>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/star.svg" alt="calendar" width={20} height={20} />
            <p>{feedback?.totalScore || "___/100"}</p>
          </div>
        </div>
        <p className="line-clamp-2 text-sm">
          {feedback?.finalAssessment ||
            "You haven't done any interview prep yet. Make sure to try it for free here"}
        </p>

        <div className="flex items-center justify-between mt-5">
          <div className="flex gap-1 ">
            {getTechLogos(techstack).then((teckStacks) => {
              return teckStacks.slice(0, 3).map((tech, i) => (
                <div className={cn("rounded-full p-2 bg-dark-200/60 group relative", i>0 && "-ml-3")} key={i}>
                 <span className="tech-tooltip">{tech.tech}</span>
                  <Image
                    src={tech.url}
                    alt={tech.tech}
                    width={100}
                    height={100}
                    className="size-5"
                  />
                </div>
              ));
            })}
          </div>
          <Button className="btn-primary ">
            <Link href="/interview">
              {feedback ? "View Interview" : "Take Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
