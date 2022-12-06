import { useRef } from "react";

export default function Search() {
  const queryRef = useRef();
  return (
    <form
      className="flex justify-end gap-2 items-center md:w-1/3"
      onSubmit={(evt) => {
        evt.preventDefault();
        console.log(queryRef.current.value);
      }}
    >
      <div className="relative flex items-center md:flex-grow">
        <input
          type="text"
          placeholder="Search everything..."
          name="query"
          id="query"
          className="rounded-full pr-12 py-2.5 flex-grow"
          ref={queryRef}
        />
        <button
          type="submit"
          className="absolute right-1 text-primary_dark icon"
        >
          search
        </button>
      </div>
    </form>
  );
}
