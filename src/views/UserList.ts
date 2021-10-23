import { CollectionView } from "./CollectionView";
import { User, PropType } from "../modals/User";
import { UserShow } from "./UserShow";

export class UserList extends CollectionView<User, PropType> {
  renderItem(model: User, itemParent: Element): void {
    new UserShow(itemParent, model).render();
  }
}
