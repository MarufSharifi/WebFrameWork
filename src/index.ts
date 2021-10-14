import axios from "axios";
import { User } from "./modals/User";

axios.get("http://localhost:3000/users");

const users = new User({ id: 1, name: "Maruf", age: 21 });

users.on("save", () => {
  console.log("new data was saved to db");
});

users.save();
