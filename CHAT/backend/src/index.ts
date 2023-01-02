import server from "./config/websocket";
import ENVIRONMENT from "./config/vars";

server.listen(ENVIRONMENT.PORT, () => {
  console.log("SERVER STARTED AT PORT => ", ENVIRONMENT.PORT);
});
