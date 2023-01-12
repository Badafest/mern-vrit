import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll } from "../slices/vendor.slice";
import UserAvatar from "../components/Image/UserAvatar";
import { Link } from "react-router-dom";
import ClippedImg from "../components/Image/ClippedImage";

export default function () {
  const vendors = useSelector((state) => state.vendor.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAll());
  }, []);

  return (
    <div className="flex flex-wrap max-w-3xl gap-2 justify-center">
      <div className="w-full">
        <ClippedImg
          src={"/src/imgs/vendor.webp"}
          width="100%"
          ratio="16 / 9"
          radius="12px"
        />
        {vendors ? <VendorList vendors={vendors} /> : <></>}
      </div>
    </div>
  );
}

function VendorList({ vendors }) {
  return (
    <>
      <div className="bg-primary text-white rounded mt-6 py-2 text-center">
        Our Vendors
      </div>
      <div className="flex flex-wrap gap-2 py-4">
        {vendors.map((vendor, index) => (
          <Link
            to={`/products?vendor=${vendor.name}`}
            className="bg-white shadow-md rounded-md p-4 flex gap-4 items-center flex-1"
            key={index}
          >
            <div className="flex-grow-1">
              <UserAvatar
                user={{ username: vendor.name, avatar: vendor.avatar }}
                size={80}
              />
            </div>
            <div className="text-primary">
              <p className="text-lg font-bold">{vendor.name}</p>
              <p className="flex items-center gap-1">
                <span className="icon_text text-tertiary_dark">email</span>{" "}
                {vendor.email}
              </p>
              <p className="flex items-center gap-1">
                <span className="icon_text text-tertiary_dark">phone</span>{" "}
                {vendor.phone}
              </p>
              <p className="flex items-center gap-1">
                <span className="icon_text text-tertiary_dark">
                  location_on
                </span>{" "}
                {vendor.location}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
