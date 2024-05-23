import { useEffect, useState } from "react";

export function ExerciseInput({
  name,
  type,
  label,
  maxWidth = "400px",
  value = "",
  onChange,
}) {
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
        value={value}
        onChange={onChange}
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
  value = "",
  onChange,
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
        value={value}
        onChange={onChange}
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
  value = "",
  onChange,
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
        value={value}
        onChange={onChange}
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

export function ExerciseDuration({
  label,
  nameMin,
  nameSec,
  value,
  setExercise,
}) {
  const [min, setMin] = useState("");
  const [sec, setSec] = useState("");
  useEffect(() => {
    setMin(Math.floor(value / 60));
    setSec(Number(value % 60));
  });
  function onMinChange(e) {
    setMin(Number(e.target.value));
    setExercise((prevExercise) => ({
      ...prevExercise,
      duration: Number(e.target.value) * 60 + sec,
    }));
  }
  function onSecChange(e) {
    setSec(Number(e.target.value));
    setExercise((prevExercise) => ({
      ...prevExercise,
      duration: min * 60 + Number(e.target.value),
    }));
  }
  return (
    <div className="flex py-2 ">
      <label className="w-36 text-xl pr-5">{label}</label>
      <input
        type="number"
        name={nameMin}
        className="flex-1 bg-light max-w-[100px]  border-b-2"
        placeholder="  min"
        value={min || ""}
        onChange={onMinChange}
        min={0}
      />
      :
      <input
        type="number"
        name={nameSec}
        className="flex-1 bg-light max-w-[100px]  border-b-2"
        placeholder="  sec"
        value={sec || ""}
        onChange={onSecChange}
        min={0}
        max={59}
      />
    </div>
  );
}
