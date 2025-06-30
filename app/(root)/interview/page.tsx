import { getCurrentUser } from "@/actions/auth.actions";
import Agent from "@/components/Agent";

const Page =  () => {
  const user = {name: "Static"}
  return (
    <div>
      <h3 className="">Your Interview</h3>
      <Agent userName={user?.name || "USER1"} type="generate" />
    </div>
  );
};

export default Page;
