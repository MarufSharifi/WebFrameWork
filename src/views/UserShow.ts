import { View } from "./View";
import { User, PropType } from "../modals/User";

export class UserShow extends View<User, PropType> {
  template() {
    return `
        <h1>User Details</h1>
        <div>User Name: ${this.user.get("name")}</div>
        <div>User Age: ${this.user.get("age")}</div>
      `;
  }
}
