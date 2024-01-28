export class PageCreator {
  static body = document.querySelector("body");
  static pageComponent = new Map();
  static elementsToCreate = [
    {
      key: "wrapper",
      tagName: "div",
      className: "wrapper",
      parent: this.body,
    },
    {
      key: "navbar",
      tagName: "nav",
      className: "navbar bg-body-tertiary",
      parent: "wrapper",
    },

    {
      key: "button-game1",
      tagName: "button",
      className: "btn btn-primary btn-game1",
      parent: "navbar",
      attributes: [
        { name: "type", value: "button" },
        {
          name: "value",
          value: "game1",
        },
      ],
      text: "Game 1",
    },
    {
      key: "button-game2",
      tagName: "button",
      className: "btn btn-primary btn-game2",
      parent: "navbar",
      attributes: [
        { name: "type", value: "button" },
        {
          name: "value",
          value: "game2",
        },
      ],
      text: "Game 2",
    },
    {
      key: "game-container",
      tagName: "div",
      className: "container d-flex justify-content-center p-5",
      parent: "wrapper",
    },

    {
      key: "game-grid-field",
      tagName: "div",
      className: "game-container",
      parent: "game-container",
    },
  ];

  static init() {
    this.elementsToCreate.forEach((elementInfo) => {
      const elem = PageCreator.#createElement(elementInfo);
    });
    console.log(this.pageComponent, this.elementsToCreate);
    PageCreator.#createPage();
  }

  static #appendElement(element) {
    const parentElement = element.customParentElement;
    parentElement.append(element);
  }

  static #createPage() {
    this.pageComponent.forEach((element, key) => {
      this.#appendElement(element);
    });
  }

  static #createElement(elementInfo) {
    const { key, tagName, className, parent, attributes, text } = elementInfo;
    const elem = document.createElement(tagName || "");
    elem.className = className;
    if (attributes) {
      attributes.forEach(({ name, value }) => {
        elem.setAttribute(name, value);
      });
    }
    if (text) {
      elem.textContent = text;
    }
    elem.customParentElement =
      parent instanceof Element ? parent : this.pageComponent.get(parent);
    console.log(elem, "new elem");
    this.pageComponent.set(key, elem);
    return elem;
  }
}
