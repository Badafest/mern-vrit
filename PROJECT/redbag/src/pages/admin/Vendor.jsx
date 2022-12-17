import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VendorController from "../../controllers/VendorController";
import Toast from "../../components/Toast";
import EditDeleteButtons from "../../components/EditDeleteButtons";
import UserAvatar from "../../components/Image/UserAvatar";
import { fetchAll } from "../../slices/vendor.slice";

export default function Vendor() {
  const vendors = useSelector((state) => state.vendor.value);
  const dispatch = useDispatch();

  const addVendorAvatarRef = useRef();
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
    const avatar = addVendorAvatarRef.current.files[0];

    try {
      addVendorAvatarRef.current.value = "";
      console.log(!avatar);
      if (avatar) {
        if (
          ["image/jpeg", "image/jpg", "image/png"].includes(avatar.type) ===
            -1 ||
          avatar.size >= 500000
        ) {
          throw new Error(
            "Image should be jpg or png and less than 500kb in size"
          );
        }
      }
      const data = await VendorController.add(
        name,
        location,
        email,
        phone,
        avatar
      );
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
    const avatar = addVendorAvatarRef.current.files[0];

    try {
      addVendorAvatarRef.current.value = "";
      const data = await VendorController.edit(
        selected,
        name,
        location,
        email,
        phone,
        avatar
      );
      setToast({ message: data.message, type: "success" });
    } catch (error) {
      setToast({ message: error.message, type: "error" });
    }
  };

  const handleDeleteVendor = async () => {
    try {
      const data = await VendorController.delete(selected);
      setToast({ message: data.message, type: "success" });
    } catch (error) {
      setToast({ message: error.message, type: "error" });
    }
  };

  const handleSelectVendor = (vendor) => {
    setSelected((prev) => (prev === vendor ? "" : vendor));
  };

  const handleToastClose = () => setToast({ message: "", type: "" });

  return (
    <>
      <div className="px-4">
        {toast.message.length ? (
          <Toast {...toast} onClose={handleToastClose} />
        ) : (
          <></>
        )}
      </div>
      <div className="flex justify-around bg-white border border-primary mx-2 my-1 text-center rounded-md p-2">
        <span className="w-1/6">Name</span>
        <span className="w-2/6">Location</span>
        <span className="w-2/6">Email</span>
        <span className="w-2/6">Phone</span>
      </div>
      <div className="m-1 p-2 rounded-md overflow-auto border border-secondary h-2/3 ">
        {vendors && (
          <VendorList
            vendors={vendors}
            selected={selected}
            handleDeleteVendor={handleDeleteVendor}
            handleEditVendor={handleEditVendor}
            handleSelectVendor={handleSelectVendor}
          />
        )}
      </div>
      <div className="flex p-4 gap-2 flex-wrap h-1/4 overflow-auto items-center">
        <div className="flex flex-col flex-grow w-80">
          <label htmlFor="avatar" className="text-tertiary_dark pl-2">
            Avatar
          </label>
          <input
            type="file"
            ref={addVendorAvatarRef}
            className="w-80 flex-grow"
            id="avatar"
            name="avatar"
          />
        </div>
        <div className="flex flex-col flex-grow w-80">
          <label htmlFor="name" className="text-tertiary_dark pl-2">
            Name
          </label>
          <input
            type="text"
            placeholder="Name of vendor..."
            ref={addVendorNameRef}
            className="w-80 flex-grow"
            id="name"
            name="name"
          />
        </div>
        <div className="flex flex-col flex-grow w-80">
          <label htmlFor="email" className="text-tertiary_dark pl-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Email address of vendor..."
            ref={addVendorEmailRef}
            className="w-80 flex-grow"
            id="email"
            name="email"
          />
        </div>
        <div className="flex flex-col flex-grow w-80">
          <label htmlFor="phone" className="text-tertiary_dark pl-2">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="Phone number of vendor..."
            ref={addVendorPhoneRef}
            className="w-80 flex-grow"
            id="phone"
            name="phone"
          />
        </div>
        <div className="flex flex-col flex-grow w-80">
          <label htmlFor="location" className="text-tertiary_dark pl-2">
            Locaion
          </label>
          <input
            type="address"
            placeholder="Street address of vendor..."
            ref={addVendorLocationRef}
            className="w-80 flex-grow"
            id="location"
            name="location"
          />
        </div>
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
    <div className="flex flex-wrap w-full">
      <div className="min-w-sm flex gap-2 border p-2 justify-center items-center flex-grow w-1/6">
        <UserAvatar
          user={{ username: item.name, avatar: item.avatar }}
          size={36}
        />
        <div>{item.name}</div>
      </div>
      <div className="min-w-sm border p-2 justify-center flex items-center flex-grow w-2/6">
        {item.location}
      </div>
      <div className="min-w-sm border p-2 justify-center flex items-center flex-grow w-2/6">
        {item.email}
      </div>
      <div className="min-w-sm border p-2 justify-center flex items-center flex-grow w-1/6">
        {item.phone}
      </div>
    </div>
    <div className="m-2 flex gap-2 items-center">
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
