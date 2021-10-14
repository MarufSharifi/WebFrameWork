import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attributes } from "./Attributes";
import { AxiosResponse } from "axios";

export interface PropType {
  name?: string;
  age?: number;
  id?: number;
}

const rootUrl = "http://localhost:3000/users";
export class User {
  events: Eventing = new Eventing();
  syn: Sync<PropType> = new Sync<PropType>(rootUrl);
  attributes: Attributes<PropType>;

  constructor(attrs: PropType) {
    this.attributes = new Attributes<PropType>(attrs);
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: PropType): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  fetch(): void {
    const id = this.get("id");

    if (typeof id !== "number") {
      throw new Error("you provide id to get the data");
    } else {
      this.syn.fetch(id).then((response: AxiosResponse) => {
        this.set(response.data);
      });
    }
  }

  save(): void {
    this.syn
      .save(this.attributes.getAll())
      .then(() => {
        this.events.trigger("save");
      })
      .catch(() => {
        this.events.trigger("error");
      });
  }
}
