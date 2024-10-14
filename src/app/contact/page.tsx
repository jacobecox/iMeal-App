"use client";
import { useRouter } from "next/navigation";

export default function Contact(): JSX.Element {
  //contact form does not actually submit any information, just a placeholder for a potential contact form in the future
  const router = useRouter();
  const handleSubmit = () => {
    router.push("/submitted");
  };
  return (
    <div className="text-center">
      <h1 className="text-white font-bold p-8 text-5xl">Contact Us</h1>
      <form>
        <h1 className="text-white pt-6 text-lg">Name</h1>
        <input type="text" className="shadow-lg rounded-md" />
        <h1 className="text-white pt-6 text-lg">Email</h1>
        <input type="text" className="shadow-lg rounded-md" />
        <h1 className="text-white pt-6 text-lg">Comments</h1>
        <textarea className="shadow-lg rounded-md p-4 w-80 h-auto " />
        <div className="pt-6">
          <button
            className="text-white bg-transparent border-2 border-white shadow-lg p-1 rounded-md"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
