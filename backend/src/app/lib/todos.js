if (!global.todos) {
  global.todos = [
    { id: "1", text: "Buy groceries" },
    { id: "2", text: "Finish project" },
    { id: "3", text: "Read a book" },
  ];
}

export const todos = global.todos;
