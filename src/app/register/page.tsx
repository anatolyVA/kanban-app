import React from "react";
import RegisterForm from "@/components/RegisterForm";

async function RegisterPage() {
  return (
    <main className="grid grid-cols-2 h-screen">
      <section
        aria-label="form-section"
        className="flex flex-col justify-center items-center"
      >
        <RegisterForm />
      </section>
      <section aria-label="image-section" className="bg-[#CBD5E166]"></section>
    </main>
  );
}

export default RegisterPage;
