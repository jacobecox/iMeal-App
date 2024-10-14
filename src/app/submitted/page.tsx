"use client";

import { useRouter } from "next/navigation";

export default function Submitted() {
  const router = useRouter();
  const handleSubmit = () => {
    router.push("/");
  };
  return (
    <div className="text-center p-8">
      <h1 className="text-white font-bold text-5xl">Thank you!</h1>
      <h1 className="text-white text-lg p-3">
        Your form has been submitted. We will get back to you as soon as we can!
      </h1>
      <div className="pt-6">
        <button
          className="text-white bg-transparent border-2 border-white p-1 shadow-lg"
          type="button"
          onClick={handleSubmit}
        >
          Home
        </button>
      </div>
    </div>
  );
}
