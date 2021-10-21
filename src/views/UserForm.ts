import { User, PropType } from "../modals/User";
import { View } from "./View";
export class UserForm extends View<User, PropType> {
  eventMaps(): { [key: string]: () => void } {
    return {
      "click:.set-age": this.setRandomAge,
      "click:.set-name": this.setName,
      "click:.save-model": this.saveModel,
    };
  }

  saveModel = (): void => {
    this.user.save();
  };

  setName = (): void => {
    const input = this.parent.querySelector("input");
    if (input) {
      const name = input.value;
      this.user.set({ name });
    }
  };

  setRandomAge = (): void => {
    this.user.setRandomAge();
  };

  template(): string {
    return `
            <div>
                <input placeholder="${this.user.get("name")}"/>
                <button class="set-name">Change Name</button>
                <button class="set-age">Set Random Age</button>
                <button class="save-model">Save UserData</button>
            </div>
        `;
  }
}
