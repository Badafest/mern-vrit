import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VendorController from "../../controllers/VendorController";
import Toast from "../../components/Toast";
import EditDeleteButtons from "../../components/EditDeleteButtons";
import { fetchAll } from "../../slices/vendor.slice";

export default function Vendor() {
  const vendors = useSelector((state) => state.vendor.value);
  const dispatch = useDispatch();

  const addVendorNameRef = useRef();
  const addVendorLocationRef = useRef();
  const addVendorEmailRef = useRef();
  const addVendorPhoneRef = useRef();

  const [toast, setToast] = useState({ message: "", type: "" });

  const [selected, setSelected] = useState("");

  useEffect(() => {
    dispatch(fetchAll());
  }, [toast.message]);

  const handleAddVendor = async () => {
    const name = addVendorNameRef.current.value;
    const location = addVendorLocationRef.current.value;
    const email = addVendorEmailRef.current.value;
    const phone = addVendorPhoneRef.current.value;

    try {
      const data = await VendorController.add(name, location, email, phone);
      setToast({ message: data.message, type: "success" });
    } catch (error) {
      setToast({ message: error.message, type: "error" });
    }
  };

  const handleEditVendor = async () => {
    const name = addVendorNameRef.current.value;
    const location = addVendorLocationRef.current.value;
    const email = addVendorEmailRef.current.value;
    const phone = addVendorPhoneRef.current.value;

    try {
      const data = await VendorController.edit(
        selected,
        name,
        location,
        email,
        phone
      );
      setToast({ message: data.message, type: "success" });
    } catch (error) {
      setToast({ message: error.message, type: "error" });
    }
  };

  const handleDeleteVendor = async () => {
    try {
      console.log("*****");
      const data = await VendorController.delete(selected);
      setToast({ message: data.message, type: "success" });
    } catch (error) {
      setToast({ message: error.message, type: "error" });
    }
  };

  const handleSelectVendor = (vendor) => {
    setSelected((prev) => (prev === vendor ? "" : vendor));
  };

  return (
    <>
      <div className="px-4">
        {toast.message.length ? (
          <Toast
            {...toast}
            onClose={() => setToast({ message: "", type: "" })}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="m-2 p-2 rounded-md overflow-auto border border-secondary">
        <VendorList
          vendors={vendors}
          selected={selected}
          handleDeleteVendor={handleDeleteVendor}
          handleEditVendor={handleEditVendor}
          handleSelectVendor={handleSelectVendor}
        />
      </div>
      <div className="flex justify-end p-4 gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Name of vendor..."
          ref={addVendorNameRef}
          className="w-80 flex-grow"
        />
        <input
          type="email"
          placeholder="Email address of vendor..."
          ref={addVendorEmailRef}
          className="w-80 flex-grow"
        />
        <input
          type="tel"
          placeholder="Phone number of vendor..."
          ref={addVendorPhoneRef}
          className="w-80 flex-grow"
        />
        <input
          type="address"
          placeholder="Street address of vendor..."
          ref={addVendorLocationRef}
          className="w-80 flex-grow"
        />
        <button onClick={handleAddVendor} className="btn btn-primary icon">
          add
        </button>
      </div>
    </>
  );
}

const VendorHead = ({
  item,
  selected,
  handleEditVendor,
  handleSelectVendor,
  handleDeleteVendor,
}) => (
  <div className="flex justify-between">
    <span>
      {item.name} {item.location} {item.email} {item.phone}
    </span>
    <div className="flex gap-2">
      {item.name === selected ? (
        <EditDeleteButtons
          handleEdit={handleEditVendor}
          handleDelete={handleDeleteVendor}
        />
      ) : (
        <></>
      )}
      <button
        onClick={() => {
          handleSelectVendor(item.name);
        }}
        className={`cursor-pointer icon_text  p-1 rounded-full border border-secondary ${
          item.name === selected
            ? "bg-primary text-light"
            : "bg-light text-primary"
        }`}
      >
        check
      </button>
    </div>
  </div>
);

const VendorList = ({ vendors, ...rest }) => (
  <>
    {vendors.length === 0 ? (
      <></>
    ) : (
      vendors.map((item, index) => (
        <div
          key={index}
          className={`py-1 px-3  border ${
            item === rest.selected ? "border-primary" : "border-light"
          } ${index % 2 === 1 ? "bg-light " : "bg-white"} `}
        >
          <VendorHead item={item} {...rest} />
        </div>
      ))
    )}
  </>
);
