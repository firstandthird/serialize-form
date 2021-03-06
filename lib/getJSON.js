import getInputs from './getInputs';
import { toArray } from 'domassist';

export default function getJSON(form, selector) {
  const inputs = getInputs(form, selector);
  const output = {};

  inputs.forEach(input => {
    const name = input.getAttribute('name');
    let value;

    if (input.type === 'checkbox') {
      if (input.getAttribute('value')) {
        if (input.checked) {
          value = input.value;
        } else {
          return;
        }
      } else {
        value = input.checked;
      }
    } else if (input.type === 'radio') {
      if (input.checked) {
        value = input.value;
      } else {
        return;
      }
    } else if (input.tagName === 'SELECT' && input.multiple) {
      value = toArray(input.options)
        .filter(option => option.selected)
        .map(option => option.value);
    } else {
      value = input.value;
    }

    // Radio will have multiple matching `name` attributes and we don't want them all.
    if (typeof output[name] !== 'undefined' && input.type !== 'radio') {
      if (Array.isArray(output[name])) {
        output[name].push(value);
      } else {
        output[name] = [output[name], value];
      }
    } else {
      output[name] = value;
    }
  });

  return output;
}
