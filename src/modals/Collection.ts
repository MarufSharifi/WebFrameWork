import Axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";

export class Collection<T, K> {
  model: T[] = [];
  events: Eventing = new Eventing();
  constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch() {
    Axios.get(this.rootUrl).then((response: AxiosResponse<K[]>) => {
      response.data.forEach((value) => {
        this.model.push(this.deserialize(value));
      });

      this.events.trigger("change");
    });
  }
}
