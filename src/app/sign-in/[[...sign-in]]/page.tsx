import Bounded from "@/components/Bounded";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <Bounded>
      <SignIn path="/sign-in" />;
    </Bounded>
  );
}
