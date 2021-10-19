import { Model } from "./Model";
import { ApiSync } from "./ApiSync";
import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Collection } from "./Collection";
export interface PropType {
  name?: string;
  age?: number;
  id?: number;
}

const rootUrl = "http://localhost:3000/users";
export class User extends Model<PropType> {
  static buildUser(attr: PropType) {
    return new User(
      new Attributes<PropType>(attr),
      new ApiSync<PropType>(rootUrl),
      new Eventing()
    );
  }

  static buildUserCollection() {
    return new Collection<User, PropType>(rootUrl, User.buildUser);
  }
}
