import server from "./config/websocket";
import ENVIRONMENT from "./config/vars";
import DbConnection from "./config/database";

const dbConnection = new DbConnection();

(async () => {
  await dbConnection.connectToDb();
  server.listen(ENVIRONMENT.PORT, () => {
    console.log("SERVER STARTED AT PORT => ", ENVIRONMENT.PORT);
  });
})();
