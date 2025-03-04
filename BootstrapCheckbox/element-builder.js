class ElementBuilder {
  constructor() {
  }

  /**
   * Create an new HTML element named 'name' and append it to 'parent'
   *
   * @param {Element} parent Parent node to append
   * @param {string} name Element name
   * @param {Array} classes List of classes
   * @returns Created element
   */
  createElement(parent, name, classes = null) {
    const element = document.createElement(name);

    if (classes) {
      if (Array.isArray(classes) === true) {
        for (let index = 0; index < classes.length; index++) {
          const className = classes[index];
          element.classList.add(className);
        }
      } else {
        element.classList.add(classes);
      }
    }

    if (parent) {
      parent.appendChild(element);
    }
    return element;
  }

  /**
   * Create an new FORM element and append it to 'parent'
   * 
   * @param {Element} parent Parent node to append
   * @param {Array} classes List of classes
   * @returns Created element
   */
  createForm(parent, classes = null) {
    const formElement = this.createElement(parent, "form", classes);
    return formElement;
  }

  /**
   * Create an new DIV element and append it to 'parent'
   * 
   * @param {Element} parent Parent node to append
   * @param {Array} classes List of classes
   * @returns Created element
   */
  createDiv(parent, classes = null) {
    const divElement = this.createElement(parent, "div", classes);
    return divElement;
  }

  /**
   * Create an new INPUT element and append it to 'parent'
   * 
   * @param {Element} parent Parent node to append
   * @param {string} type Input type: test, password, checkbox etc.
   * @param {string} id Element identifier
   * @param {string} name Element name
   * @param {string} [value=""] The initial value of the input
   * @param {Array} classes List of classes
   * @returns Created element
   */
  createInput(parent, type, id = null, name = null, value = "", classes = null) {
    const inputElement = this.createElement(parent, "input", classes);
    inputElement.type = type;
    if (name) {
      inputElement.name = name;
    }
    if (value) {
      inputElement.value = value;
    }
    if (id) {
      inputElement.id = id;
    }
    return inputElement;
  }

  /**
   * Create an new LABEL element and append it to 'parent'
   * 
   * @param {Element} parent Parent node to append
   * @param {string} id Input element identifier
   * @param {string} text The value of the input
   * @param {Array} classes List of classes
   * @returns Created element
   */
  createLabel(parent, id, text, classes = null) {
    const labelElement = this.createElement(parent, "label", classes);
    if (id) {
      labelElement.htmlFor = id;
    }
    if (text) {
      labelElement.appendChild(document.createTextNode(text));
    }
    return labelElement;
  }

}
