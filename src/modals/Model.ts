import { Attributes } from "./Attributes";
import { ApiSync } from "./ApiSync";
import { Eventing } from "./Eventing";
import { AxiosResponse } from "axios";

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: Attributes<T>,
    private sync: ApiSync<T>,
    private events: Eventing
  ) {}

  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  fetch(): void {
    const id = this.get("id");

    if (typeof id !== "number") {
      throw new Error("you provide id to get the data");
    } else {
      this.sync.fetch(id).then((response: AxiosResponse) => {
        this.set(response.data);
      });
    }
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then(() => {
        this.events.trigger("save");
      })
      .catch(() => {
        this.events.trigger("error");
      });
  }
}
