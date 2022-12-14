export default function ForgotPassword() {
  return (
    <div className="whitespace-pre-wrap bg-gray-700 text-white flex flex-col gap-2 items-center justify-center min-h-screen">
      {`
Oh dear, what a pickle we're in,
The password's been forgotten again.
No reset link to be found,
Our access to the account is now bound.

We try every trick in the book,
But the password just won't look.
We search high and low,
But the solution just won't show.

We're stuck in this digital rut,
Our access to the account is now shut.
But fear not, for all is not lost,
We'll find a way, no matter the cost.

We'll try a different approach,
Perhaps a password manager can encroach.
Or maybe we'll just have to start anew,
Either way, we'll make it through.

So don't despair, don't lose hope,
We'll find a way to cope.
We'll reset the password and move on,
And our access to the account will be won.`}
      <p className="italic mt-4 text-gray-300">
        poem generated by
        <a href="https://chat.openai.com" className="pl-1 text-yellow-500">
          ChatGPT
        </a>
      </p>
    </div>
  );
}
