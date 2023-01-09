import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductContainer from "../components/Product/ProductContainer";
import { fetchFiltered } from "../slices/product.slice";
import { fetchAll as fetchAllCategories } from "../slices/category.slice";
import { fetchAll as fetchAllVendors } from "../slices/vendor.slice";

//products?category=category1.category2.category3....?vendor=vendor1.vendor2.vendor3....&price=MINtoMAX

export default function () {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category");
  const categoryRef = useRef();

  const vendor = searchParams.get("vendor");
  const vendorRef = useRef();

  const price = searchParams.get("price");
  const priceRef = useRef();

  const filter = { index: 1, total: 5 };

  if (price) {
    const priceArray = price.split("to").map(parseFloat);
    if (priceArray[0] && priceArray[1]) filter.price = priceArray;
  }

  if (category) {
    filter.category = category.split(".");
  }

  if (vendor) {
    filter.vendor = vendor.split(".");
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFiltered(filter));
  }, [searchParams]);

  const filterFunction = () => {
    const categoryData = new FormData(categoryRef.current);
    const vendorData = new FormData(vendorRef.current);
    const priceData = new FormData(priceRef.current);

    const category = Array.from(categoryData.keys()).join(".");
    const vendor = Array.from(vendorData.keys()).join(".");

    setSearchParams({
      category,
      vendor,
      price: `${priceData.get("priceMin")}to${priceData.get("priceMax")}`,
    });
  };

  return (
    <div className="flex flex-col p-2 gap-2 md:flex-row w-full">
      <FilterMenu
        {...{ categoryRef, vendorRef, priceRef, filterFunction, filter }}
      />
      <div className="flex flex-col gap-2 items-center">
        <ProductContainer />
      </div>
    </div>
  );
}

const FilterMenu = function ({
  categoryRef,
  vendorRef,
  priceRef,
  filterFunction,
  filter,
}) {
  const categories = useSelector((state) => state.category.value);
  const vendors = useSelector((state) => state.vendor.value);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchAllVendors());
  }, []);

  const handleFilterClick = () => {
    setShow((_) => false);
    filterFunction();
  };

  return (
    <div
      className={
        show ? "md:w-1/3 p-4 flex flex-col bg-white rounded-md" : "p-4"
      }
    >
      <div className="flex gap-2 items-center justify-center my-2">
        <button
          className="icon bg-primary text-light w-max h-max"
          onClick={() => setShow((prev) => !prev)}
        >
          {show ? "close" : "menu"}
        </button>
        {show ? (
          <button
            className="btn btn-primary w-full"
            onClick={handleFilterClick}
          >
            Filter
          </button>
        ) : (
          <></>
        )}
      </div>

      {show && (
        <>
          <div className="border-y border-tertiary p-4">
            <div>Categories</div>
            <form
              className="max-h-48 overflow-auto text-sm p-2"
              ref={categoryRef}
            >
              <CategoryOptions
                categories={categories}
                checked={filter.category || []}
              />
            </form>
          </div>
          <div className="border-b border-tertiary p-4">
            <div>Vendors</div>
            <form
              className="max-h-48 overflow-auto text-sm p-2"
              ref={vendorRef}
            >
              <VendorOptions vendors={vendors} checked={filter.vendor || []} />
            </form>
          </div>
          <div className="border-b border-tertiary p-4">
            <div>Price</div>
            <form
              className="max-h-48 overflow-auto text-sm p-2 flex items-center"
              ref={priceRef}
            >
              <span className="px-2">NPR</span>
              <input
                type="number"
                min="0"
                id="priceMin"
                name="priceMin"
                step="500"
                defaultValue={(filter.price && filter.price[0]) || ""}
              />
              <span className="px-2">to</span>
              <input
                type="number"
                min="0"
                id="priceMax"
                name="priceMax"
                step="500"
                defaultValue={(filter.price && filter.price[1]) || ""}
              />
            </form>
          </div>
        </>
      )}
    </div>
  );
};

const CategoryOptions = ({ categories, checked }) => {
  return (
    <>
      {Object.keys(categories).map((item, index) => (
        <div key={index} className="pl-4 py-1">
          <div className="flex items-center gap-1 border border-tertiary px-2 py-1 rounded-md bg-white">
            <input
              type="checkbox"
              name={item}
              id={item}
              className="w-4 h-4 cursor-pointer"
              defaultChecked={checked.includes(item)}
            />
            <label
              className="flex-grow cursor-pointer text-left"
              htmlFor={item}
            >
              {item}
            </label>
          </div>
          <CategoryOptions categories={categories[item]} checked={checked} />
        </div>
      ))}
    </>
  );
};

const VendorOptions = ({ vendors, checked }) => (
  <>
    {vendors.map((item, index) => (
      <div
        key={index}
        className="my-1 py-1 flex items-center gap-1 border border-tertiary px-2 rounded-md bg-white"
      >
        <input
          type="checkbox"
          name={item.name}
          id={item.name}
          className="w-4 h-4 cursor-pointer"
          defaultChecked={checked.includes(item.name)}
        />
        <label
          className="flex-grow cursor-pointer text-left"
          htmlFor={item.name}
        >
          {item.name}
        </label>
      </div>
    ))}
  </>
);
