import React from "react";
import LoginForm from "@/components/LoginForm";

async function LoginPage() {
  return (
    <main className="grid grid-cols-2 h-screen">
      <section
        aria-label="form-section"
        className="flex flex-col justify-center items-center"
      >
        <LoginForm />
      </section>
      <section aria-label="image-section" className="bg-[#CBD5E166]"></section>
    </main>
  );
}

export default LoginPage;
