import { User } from "../modals/User";

export class UserForm {
  constructor(public parent: Element, public user: User) {
    this.bindModal();
  }

  bindModal(): void {
    this.user.on("change", () => {
      this.render();
    });
  }

  eventMaps(): { [key: string]: () => void } {
    return {
      "click:.set-age": this.setRandomAge,
      "click:.set-name": this.setName,
    };
  }

  setName = (): void => {
    const input = this.parent.querySelector("input");
    const name = input.value;
    this.user.set({ name });
  };

  setRandomAge = (): void => {
    this.user.setRandomAge();
  };

  bindEvents(DocumentFragment: DocumentFragment) {
    const eventMaps = this.eventMaps();

    for (let key in eventMaps) {
      const [eventName, selector] = key.split(":");

      DocumentFragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventMaps[key]);
      });
    }
  }

  template(): string {
    return `
            <div>
                <h1>user Form</h1>
                <div>user Name: ${this.user.get("name")}</div>
                <div>user age: ${this.user.get("age")}</div>
                <input />
                <button class="set-name">Change Name</button>
                <button class="set-age">Set Random Age</button>
            </div>
        `;
  }

  render(): void {
    this.parent.innerHTML = "";
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);

    this.parent.append(templateElement.content);
  }
}
