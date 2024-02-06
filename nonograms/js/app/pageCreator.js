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
  ];

  static async init() {
    await this.jsonParse();
    // console.log(this.elementsToCreate);
    this.elementsToCreate.forEach((elementInfo) => {
      const elem = PageCreator.#createElement(elementInfo);
    });
    // console.log(this.pageComponent, this.elementsToCreate);
    PageCreator.#createPage();
  }

  static async jsonParse() {
    const jsonFiles = [
      "./data/nav.json",
      "./data/game.json",
      "./data/gamesList.json",
    ];

    for (const jsonFilePath of jsonFiles) {
      try {
        const response = await fetch(jsonFilePath);
        if (!response.ok) {
          throw new Error(`not ok for file: ${jsonFilePath}`);
        }
        const data = await response.json();
        this.elementsToCreate = [...this.elementsToCreate, ...data];
        // console.log(data);
        // console.log(this.elementsToCreate);
      } catch (error) {
        console.error(error);
      }
    }
  }

  static #appendElement(element) {
    const parentElement = element.customParentElement;
    if (parentElement) {
      parentElement.append(element);
    } else {
      console.error("Parent element is undefined:", element);
    }
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
    // console.log(elem, "new elem");
    this.pageComponent.set(key, elem);
    return elem;
  }
}
