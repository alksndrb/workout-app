//consider reorganizing components
import Link from "next/link";

export function TextInput({
  name,
  type,
  label,
  placeholder = "",
  value,
  onChange,
}) {
  return (
    <>
      <label htmlFor={name} className="flex justify-center text-xl pb-3">
        {label}
      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="py-1 px-3 mb-3 bg-light border-accent border-2"
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export function FormButton({ type, value }) {
  return (
    <>
      <button
        type={type}
        className="w-fit px-5 text-xl py-1 bg-secondary border-accent border-2"
      >
        {value}
      </button>
    </>
  );
}

export function FormBox({ children }) {
  return (
    <>
      <div className="flex flex-col items-center w-[700px] bg-primary p-3 border-accent border-2">
        {children}
      </div>
    </>
  );
}
export function FormMessage({ children }) {
  return (
    <>
      <div className="flex w-full justify-center text-xl pt-2">{children}</div>
    </>
  );
}

export function ErrorMessage({ children }) {
  return (
    <>
      <div className="pt-2 text-lg text-red-500">{children}</div>
    </>
  );
}

export function NavLink({ src, value }) {
  return (
    <Link
      className="w-[200px] my-4 px-5 text-xl py-1 bg-tertiary border-2 border-tertiary"
      href={src}
    >
      {value}
    </Link>
  );
}
