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
      key: "nav",
      tagName: "nav",
      className: "navbar bg-body-tertiary",
      parent: "wrapper",
    },
    {
      key: "button",
      tagName: "button",
      className: "navbar-toggler",
      parent: "nav",
      attributes: [
        { name: "type", value: "button" },
        { name: "data-bs-toggle", value: "collapse" },
        { name: "data-bs-target", value: "#navbarNavAltMarkup" },
        { name: "aria-controls", value: "navbarNavAltMarkup" },
      ],
      text: "dasddad",
    },
    {
      key: "grid-container",
      tagName: "div",
      className: "container game-container",
      parent: "wrapper",
    },
    {
      key: "select-difficulty",
      tagName: "select",
      className: "form-select",
      parent: "nav",
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
