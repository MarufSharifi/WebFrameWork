import { View } from "./View";
import { User, PropType } from "../modals/User";
import { UserForm } from "../views/UserForm";
import { UserShow } from "../views/UserShow";

export class UserEdit extends View<User, PropType> {
  regionsMaps(): { [key: string]: string } {
    return {
      userShow: ".user-show",
      userForm: ".user-form",
    };
  }

  onRender(): void {
    new UserShow(this.regions.userShow, this.user).render();
    new UserForm(this.regions.userForm, this.user).render();
  }

  template() {
    return `
        <div class="user-show"></div>
        <div class="user-form"></div>
      `;
  }
}
