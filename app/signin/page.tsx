import { Suspense } from "react";
import SignInForm from "@/components/signin-form";

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="skeleton mx-auto my-12 h-96 max-w-md"></div>}>
      <SignInForm />
    </Suspense>
  );
}
