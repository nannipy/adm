import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return(
    <main className="flex h-screen auth-page">
      <SignUp />
    </main>
  );
}
