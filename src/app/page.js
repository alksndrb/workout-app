import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[800px] bg-tertiary m-auto mt-[100px] flex flex-col items-center border-2 border-secondary">
      <p className="text-3xl py-5 font-semibold">
        Welcome to simple workout tracker
      </p>
      <p className="text-xl py-5">
        New?{" "}
        <Link href="/register" className="font-semibold text-primary">
          Register Here
        </Link>
      </p>
      <p className="text-xl py-5">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary">
          Login Here
        </Link>
      </p>
    </div>
  );
}
