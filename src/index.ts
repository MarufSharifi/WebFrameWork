import { UserForm } from "./views/UserForm";
import { User } from "./modals/User";

const user = User.buildUser({ name: "NAME", age: 21 });

const userForm = new UserForm(document.getElementById("root"), user);

userForm.render();
