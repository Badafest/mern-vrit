export default function SecondNav() {
  return (
    <div className="bg-light flex flex-col gap-4 p-2 justify-center items-center border border-tertiary md:flex-row md:gap-12">
      <div className="btn-primary btn rounded-lg w-8/12">
        Only a few hours left before flash sale ends!
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col items-center">
          <div className="icon bg-primary text-light">shopping_cart</div>
          <div className="text-xs">My Cart</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="icon bg-primary text-light">favorite</div>
          <div className="text-xs">Wishlist</div>
        </div>
      </div>
    </div>
  );
}
