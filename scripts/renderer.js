const { camelCase } = require('change-case');

const COMPONENT_EUNM = {
  heading: 'Typography.Title',
  paragraph: 'Typography.Paragraph',
  listitem: 'List.Item',
  checkbox: 'Checkbox',
};

function getComponentName(type = '') {
  const _type = camelCase(type).toLocaleLowerCase();

  return COMPONENT_EUNM[_type];
}

module.exports = {
  getComponentName,
  heading(text, level) {
    const ComponentName = getComponentName('heading');
    return `<${ComponentName} level={${level}}>${text}</${ComponentName}>`;
  },
  paragraph(text) {
    const ComponentName = getComponentName('paragraph');
    return `<${ComponentName}>${text}</${ComponentName}>`;
  },
  checkbox(text, task, checked) {
    let ComponentName = getComponentName('checkbox');
    return `<${ComponentName}>${text}</${ComponentName}>`;
  },
};
