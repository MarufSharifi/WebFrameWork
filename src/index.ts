import { UserList } from "./views/UserList";
import { Collection } from "./modals/Collection";
import { User, PropType } from "./modals/User";

const users = new Collection(
  "http://localhost:3000/users",
  (json: PropType) => {
    return User.buildUser(json);
  }
);

users.on("change", () => {
  const root = document.getElementById("root");

  if (root) {
    new UserList(root, users).render();
  }
});

users.fetch();
