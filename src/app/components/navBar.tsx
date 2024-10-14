import Link from "next/link";

export default function NavBar(): JSX.Element {
  return (
    <nav className="p-10 border-solid border-b-2 border-white">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-white text-4xl font-bold">iMeal</h1>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="text-white font-bold hover:text-black">
              Home
            </a>
          </li>
          <li>
            <Link
              href="/about"
              className="text-white font-bold hover:text-black"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-white font-bold hover:text-black"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
