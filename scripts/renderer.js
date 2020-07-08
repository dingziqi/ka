const COMPONENT_EUNM = {
  heading: 'Typography.Title',
};

module.exports = {
  heading(text, level) {
    const ComponentName = COMPONENT_EUNM.heading;
    return `<${ComponentName} level={${level}}>${text} </${ComponentName}>`;
  },
};
