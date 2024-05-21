//consider reorganizing components

import Link from "next/link";

export function TextInput({ name, type, label, placeholder = "" }) {
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
export function ExerciseInput({ name, type, label, maxWidth = "400px" }) {
  return (
    <div className="flex py-2 ">
      <label htmlFor={name} className="w-36 text-xl pr-5">
        {label}
      </label>

      <input
        type={type}
        name={name}
        id={name}
        className="flex-1 bg-light  border-b-2"
        style={{ maxWidth: maxWidth }}
      />
    </div>
  );
}
export function ExerciseSelect({
  name,
  label,
  options,
  placeholder = "",
  maxWidth = "400px",
}) {
  return (
    <div className="flex py-2 ">
      <label htmlFor={name} className="w-36 text-xl pr-5">
        {label}
      </label>

      <select
        name={name}
        id={name}
        className="flex-1 max-w-[400px] bg-light  border-b-2"
        style={{ maxWidth: maxWidth }}
      >
        {placeholder && (
          <option disabled value="">
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
export function ExerciseTextArea({
  name,
  label,
  placeholder = "",
  maxWidth = "400px",
}) {
  return (
    <div className="flex py-2">
      <label htmlFor={name} className="w-36 text-xl pr-5">
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        placeholder={placeholder}
        className="flex-1 bg-light border-b-2 p-2 resize-none"
        style={{ maxWidth: maxWidth }}
      ></textarea>
    </div>
  );
}
export function ExerciseSubmitButton({ value }) {
  return (
    <>
      <button
        type="submit"
        className="w-fit my-4 px-5 text-xl py-1 bg-tertiary"
      >
        {value}
      </button>
    </>
  );
}
export function ExerciseDuration({ label, nameMin, nameSec }) {
  return (
    <div className="flex py-2 ">
      <label className="w-36 text-xl pr-5">{label}</label>
      <input
        type="number"
        name={nameMin}
        className="flex-1 bg-light max-w-[100px]  border-b-2"
        placeholder="  min"
      />
      :
      <input
        type="number"
        name={nameSec}
        className="flex-1 bg-light max-w-[100px]  border-b-2"
        placeholder="  sec"
      />
    </div>
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
