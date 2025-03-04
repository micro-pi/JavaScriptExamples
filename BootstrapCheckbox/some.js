const anObject = JSON.parse('{\
  "data": [\
    {\
      "id": 1,\
      "type": "IProject",\
      "name": "Project 1",\
      "brief": "Short description 1",\
      "details": "Long description 1"\
    },\
    {\
      "id": 2,\
      "type": "IProject",\
      "name": "Project 2",\
      "brief": "Short description 2",\
      "details": "Long description 2"\
    },\
    {\
      "id": 3,\
      "type": "IProject",\
      "name": "Project 3",\
      "brief": "Short description 3",\
      "details": "Long description 3"\
    }\
  ]\
}');

/**
 * Create an new HTML element named 'name' and append it to 'parent'
 *
 * @param {Element} parent Parent node to append
 * @param {string} name Element name
 * @param {Array} classes List of classes
 * @returns Created element
 */
function createElement(parent, name, classes = null) {
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
function createForm(parent, classes = null) {
  return createElement(parent, "form", classes);
}

/**
 * Create an new DIV element and append it to 'parent'
 * 
 * @param {Element} parent Parent node to append
 * @param {Array} classes List of classes
 * @returns Created element
 */
function createDiv(parent, classes = null) {
  return createElement(parent, "div", classes);
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
function createInput(parent, type, id = null, name = null, value = "", classes = null) {
  const inputElement = createElement(parent, "input", classes);
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
function createLabel(parent, id, text, classes = null) {
  const labelElement = createElement(parent, "label", classes);
  if (id) {
    labelElement.htmlFor = id;
  }
  if (text) {
    labelElement.appendChild(document.createTextNode(text));
  }
  return labelElement;
}

function createId(object) {
  return object.type + "-" + object.id;
}

/**
 * Toggle all checkboxes
 * 
 * @param {Element} parent Parent node that contains checkboxes
 * @param {Element} thisSelect "Select All" checkbox
 * @param {string} name The name of checkboxes
 */
function checkAll(parent, thisSelect, name) {
  var checkboxes = parent.querySelectorAll('input[type="checkbox"][name="' + name + '"]');
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i] != thisSelect)
      checkboxes[i].checked = thisSelect.checked;
  }
}

function printForm(object) {
  if (object && object.data) {
    const theFormDiv = document.getElementById("the-form");
    if (theFormDiv) {
      const formElement = createForm(theFormDiv);

      {
        const divElement = createDiv(formElement, ["form-check"]);
        const inputElement = createInput(divElement, "checkbox", "selectAll", null, null, ["form-check-input"]);
        inputElement.onclick = function () {
          checkAll(formElement, this, "selected");
        };
        createLabel(divElement, "selectAll", "All", ["form-check-label"]);
      }

      if (Array.isArray(object.data) === true) {
        for (const [key, value] of Object.entries(object.data)) {
          const id = createId(value);
          const divElement = createDiv(formElement, ["form-check"]);
          createInput(divElement, "checkbox", id, "selected", value.id, ["form-check-input"]);
          createLabel(divElement, id, value.name, ["form-check-label"]);
        }
      } else {
        /* Print the form for an object only */
      }
    }
  }
}

printForm(anObject);
