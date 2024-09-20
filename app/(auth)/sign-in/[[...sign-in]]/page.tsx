import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return(
    <main className="flex h-screen auth-page">
      <SignIn />
    </main>
  );
}
