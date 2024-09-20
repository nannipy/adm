import { SignUp } from "@clerk/nextjs";
import { ClerkProvider } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <ClerkProvider>
      <SignUp
        path="/signup"
        routing="path"
        signInUrl="/signin"
        afterSignUpUrl="/dashboard"
        appearance={{
          elements: {
            formButtonPrimary: {
              backgroundColor: '#000000',
              '&:hover': { backgroundColor: '#333333' },
            },
          },
        }}
      />
    </ClerkProvider>
  );
}