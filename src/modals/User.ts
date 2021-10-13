import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

export interface PropType {
  name?: string;
  age?: number;
  id?: number;
}

const rootUrl = "http://localhost:300/users";
export class User {
  events: Eventing = new Eventing();
  syn: Sync<PropType> = new Sync<PropType>(rootUrl);
}
