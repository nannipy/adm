import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
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
      metadata={{
        role: 'user' // Imposta il ruolo predefinito come 'user'
      }}
    />
  );
}