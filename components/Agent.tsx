import { cn } from "@/lib/utils";
import Image from "next/image";

enum CallStatus {
  inactive = "inactive",
  pending = "pending",
  active = "active",
  ended = "ended",
}

const Agent = ({ userName, type }: AgentProps) => {
  const isSpeak = false;
  const callStatus = CallStatus.active;
  const messages = [
    "Hello, my name is John Doe",
    "Ohaiyo, aurewa Mokey D. HUGO",
  ];
  return (
    <div className="flex flex-col gap-10 mt-4">
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
          <Image
              src="/ai-avatar.png"
              width={65}
              height={100}
              alt="AI avatar"
              className="object-cover"
            />
            {isSpeak && <span className="animate-speak"></span>}
          </div>
          <h3>Interviewer</h3>
        </div>
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/covers/amazon.png"
              alt="company logo"
              width={450}
              height={450}
              className="size-[120px] object-cover"
            />
            <h3 className="text-center text-white">{userName}</h3>
          </div>
        </div>
      </div>
      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {messages[messages.length - 1]}
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-center w-full">
        {callStatus !== "active" ? (
          <span>
            {callStatus === "inactive" || callStatus === "ended" ? (
              <button className="btn-call">Call</button>
            ) : (
              <button className="btn-disconnect">Hangup</button>
            )}
          </span>
        ) : (
          <div className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0s]"></span>
            <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Agent;
