import { Model } from "../modals/Model";

export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};
  constructor(public parent: Element, public user: T) {
    this.bindModal();
  }

  abstract template(): string;

  regionsMaps(): { [key: string]: string } {
    return {};
  }

  eventMaps(): { [key: string]: () => void } {
    return {};
  }

  bindModal(): void {
    this.user.on("change", () => {
      this.render();
    });
  }

  bindEvents(DocumentFragment: DocumentFragment) {
    const eventMaps = this.eventMaps();

    for (let key in eventMaps) {
      const [eventName, selector] = key.split(":");

      DocumentFragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventMaps[key]);
      });
    }
  }

  bindRegions(fragment: DocumentFragment): void {
    const regionsMaps = this.regionsMaps();

    for (const key in regionsMaps) {
      const selector = regionsMaps[key];
      const element = fragment.querySelector(selector);
      if (element) {
        this.regions[key] = element;
      }
    }
  }

  onRender(): void {}

  render(): void {
    this.parent.innerHTML = "";
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);
    this.bindRegions(templateElement.content);

    this.onRender();

    this.parent.append(templateElement.content);
  }
}
