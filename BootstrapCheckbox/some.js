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

/**
 * 
 * @param {ElementBuilder} elementBuilder 
 * @param {JSON} object 
 */
function printForm(elementBuilder, object) {
  if (elementBuilder && object && object.data) {
    const theFormDiv = document.getElementById("the-form");
    if (theFormDiv) {
      const formElement = elementBuilder.createForm(theFormDiv);

      {
        const divElement = elementBuilder.createDiv(formElement, ["form-check"]);
        const inputElement = elementBuilder.createInput(divElement, "checkbox", "selectAll", null, null, ["form-check-input"]);
        inputElement.onclick = function () {
          checkAll(formElement, this, "selected");
        };
        elementBuilder.createLabel(divElement, "selectAll", "All", ["form-check-label"]);
      }

      if (Array.isArray(object.data) === true) {
        for (const [key, value] of Object.entries(object.data)) {
          const id = createId(value);
          const divElement = elementBuilder.createDiv(formElement, ["form-check"]);
          elementBuilder.createInput(divElement, "checkbox", id, "selected", value.id, ["form-check-input"]);
          elementBuilder.createLabel(divElement, id, value.name, ["form-check-label"]);
        }
      } else {
        /* Print the form for an object only */
      }
    }
  }
}

const elementBuilder = new ElementBuilder();

printForm(elementBuilder, anObject);
