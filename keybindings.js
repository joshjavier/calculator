const mappings = {
  // KeyboardEvent.key: Element.class
  '1': '.one',
  '2': '.two',
  '3': '.three',
  '4': '.four',
  '5': '.five',
  '6': '.six',
  '7': '.seven',
  '8': '.eight',
  '9': '.nine',
  '0': '.zero',
  '.': '.decimal',
  '/': '.divide',
  '*': '.times',
  '-': '.minus',
  '+': '.plus',
  '=': '.equals',
  'Enter': '.equals',
  'Backspace': '.cancelEntry',
  'Delete': '.clear',
  'g': '.github-link'
};


document.addEventListener('keydown', (e) => {
  if (!mappings[e.key]) return;
  e.preventDefault(); // e.g. to override Firefox's Quick Find hotkey
  document.querySelector(mappings[e.key]).classList.add('active');
  // debugging
  console.log(e.key, mappings[e.key]);
});

document.addEventListener('keyup', (e) => {
  if (!mappings[e.key]) return;
  document.querySelector(mappings[e.key]).classList.remove('active');
  document.querySelector(mappings[e.key]).click();
});
