export default function Newsletter() {
  return (
    <form
      className="mx-auto max-w-xl text-center mb-6"
      onSubmit={(evt) => evt.preventDefault()}
    >
      <label htmlFor="email">
        <h3>Never miss another deal on RedBag!</h3>
        <p className="text-sm mb-2">
          Subscribe to our newsletter to revieve updates straight to your inbox.
        </p>
      </label>
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Your Email Address"
        />
        <button className="btn btn-contrast">Subscribe</button>
      </div>
      <p className="mt-2 text-xs">
        We'll never share your email address with anyone else
      </p>
    </form>
  );
}
