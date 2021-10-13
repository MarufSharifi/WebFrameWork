import axios from "axios";
import { User } from "./modals/User";

axios.get("http://localhost:3000/users");

const users = new User();

users.events.on("change", () => {
  console.log("change");
});

users.events.trigger("change");
