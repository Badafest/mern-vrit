import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../../components/Image/UserAvatar";
import Toast from "../../components/Toast";

import { UserContext } from "../../context/user.context";
import UserController from "../../controllers/UserController";

export default function () {
  const { user, changeUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [toast, setToast] = useState({ message: "", type: "" });
  const [userData, setUserData] = useState({});

  const avatarRef = useRef();

  useEffect(() => {
    UserController.getUserData()
      .then((data) => setUserData(data))
      .catch((err) =>
        setToast({
          message: err.message,
          type: "error",
        })
      );
  }, []);

  const handleLogout = () => {
    changeUser({ username: "", _id: "" });
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleDelete = () => {
    setToast({
      message:
        "You will be notified at " +
        userData.email +
        " when your account is deleted. If you want to keep this account, write to us at accounts@redbag.com within 2 business days.",
    });
  };

  const handleDeleteAvatar = async () => {
    try {
      const response = await UserController.delAvatar();
      changeUser({ ...user, avatar: "" });
      setToast({ type: "success", message: response.message });
    } catch (error) {
      setToast({ type: "error", message: error.message });
    }
  };

  const handleSetAvatar = async () => {
    try {
      const image = avatarRef.current.files[0];
      avatarRef.current.value = "";
      if (
        !image ||
        ["image/jpeg", "image/jpg", "image/png"].includes(image.type) === -1 ||
        image.size >= 500000
      ) {
        throw new Error(
          "Image should be jpg or png and less than 500kb in size"
        );
      }
      const response = await UserController.setAvatar(image);
      changeUser({ ...user, avatar: response.image });
      setToast({ type: "success", message: response.message });
    } catch (error) {
      setToast({ type: "error", message: error.message });
    }
  };

  const handleToastClose = () => {
    setToast({ message: "", type: "" });
  };

  return (
    <div className="bg-white shadow-md rounded-lg w-11/12 mx-auto p-4 md:w-1/2 flex flex-col justify-center">
      <div className="flex flex-col items-center mb-4">
        {toast.message.length ? (
          <Toast {...toast} onClose={handleToastClose} />
        ) : (
          <></>
        )}
        <UserAvatar user={user} size={128} />
        <div className="flex gap-1 justify-center mt-2">
          <input
            type="file"
            accept="image/*"
            ref={avatarRef}
            hidden
            onChange={handleSetAvatar}
          />
          <button
            onClick={() => avatarRef.current.click()}
            className="icon_text text-2xl rounded-full p-1 border border-current text-primary hover:bg-primary hover:text-light"
          >
            edit
          </button>
          <button
            onClick={handleDeleteAvatar}
            className="icon_text text-2xl rounded-full p-1 border border-current text-primary hover:bg-primary hover:text-light"
          >
            delete
          </button>
        </div>
        <div className="text-contrast m-2 text-center">
          <div>{user.username}</div>
          <div>{userData.email}</div>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="btn btn-primary flex-grow" onClick={handleLogout}>
          Log Out
        </button>
        <button className="btn btn-contrast" onClick={handleDelete}>
          Delete Account
        </button>
      </div>
    </div>
  );
}
