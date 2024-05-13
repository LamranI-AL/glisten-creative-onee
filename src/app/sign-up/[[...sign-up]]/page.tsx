import Bounded from "@/components/Bounded";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <Bounded>
      <SignUp path="/sign-up" />;
    </Bounded>
  );
}
