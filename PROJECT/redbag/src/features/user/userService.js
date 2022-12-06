import { randomId } from "../helpers";
import { saveUser } from "./userSlice";

class UserService {
  user;
  dispatch;
  constructor(user, dispatch) {
    this.user = user;
    this.dispatch = dispatch;
  }

  register(username, password) {
    const _id = randomId();
    this.dispatch(saveUser({ _id, username }));
  }
}

export default UserService;
