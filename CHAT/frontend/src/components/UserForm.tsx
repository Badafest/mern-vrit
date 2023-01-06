import { FormEvent, PropsWithChildren, forwardRef, ForwardedRef } from "react";

interface IUserFormProps extends PropsWithChildren {
  handleFormSubmit: (event: FormEvent) => Promise<void>;
  submitText?: string;
}

export default forwardRef(
  (
    { handleFormSubmit, submitText, ...rest }: IUserFormProps,
    ref: ForwardedRef<HTMLFormElement>
  ) => {
    return (
      <form
        className="flex flex-col gap-2 bg-gray-700 p-4 rounded"
        onSubmit={handleFormSubmit}
        ref={ref}
      >
        <div className="flex flex-col text-white">
          <label htmlFor="username">Username</label>
          <input
            className="px-4 py-2 outline-none rounded text-gray-700"
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div className="flex flex-col text-white">
          <label htmlFor="password">Password</label>
          <input
            className="px-4 py-2 outline-none rounded text-gray-700"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <button className="mt-4 bg-gray-300 hover:bg-white active:bg-gray-400 rounded py-2 shadow-md">
          {submitText}
        </button>
        {rest.children}
      </form>
    );
  }
);
