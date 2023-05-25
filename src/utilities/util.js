const util = {};

util.saveToLocalStorage = (notes) => {
  localStorage.setItem('notes', JSON.stringify(notes));
};

util.loadFromLocalStorage = () => {
  const storedNotes = localStorage.getItem('notes');
  if (storedNotes) {
    return JSON.parse(storedNotes);
  }
  return [];
};

export default util;
