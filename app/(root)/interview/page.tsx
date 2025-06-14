import { getCurrentUser } from "@/actions/auth.actions";
import Agent from "@/components/Agent";

const Page = async () => {
  const user = await getCurrentUser();
  return (
    <div>
      <h3 className="">Your Interview</h3>
      <Agent userName={user?.name || "USER1"} type="generate" />
    </div>
  );
};

export default Page;
