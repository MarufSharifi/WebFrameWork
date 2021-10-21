import { UserEdit } from "./views/userEdit";
import { User } from "./modals/User";

const user = User.buildUser({ name: "NAME", age: 21 });

const root = document.getElementById("root");

if (root) {
  const userEdit = new UserEdit(root, user);
  userEdit.render();

  console.log(userEdit);
} else {
  throw new Error("you must have root element");
}
