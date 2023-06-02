import { createContext, useReducer } from "react";

// const DUMMY_EXPENSES = [
//   {
//     id: "e1",
//     description: "pizza",
//     amount: 15.57,
//     date: new Date("2023-04-23"),
//   },
//   {
//     id: "e2",
//     description: "coffe",
//     amount: 1.57,
//     date: new Date("2023-04-24"),
//   },
//   {
//     id: "e3",
//     description: "pants",
//     amount: 55.57,
//     date: new Date("2023-04-25"),
//   },
//   {
//     id: "e4",
//     description: "book",
//     amount: 15.57,
//     date: new Date("2023-04-26"),
//   },
//   {
//     id: "e5",
//     description: "snack",
//     amount: 1.57,
//     date: new Date("2023-04-27"),
//   },
//   {
//     id: "e6",
//     description: "snack",
//     amount: 1.57,
//     date: new Date("2023-04-27"),
//   },
//   {
//     id: "e7",
//     description: "snack",
//     amount: 1.57,
//     date: new Date("2023-04-27"),
//   },
//   {
//     id: "e8",
//     description: "snack",
//     amount: 1.57,
//     date: new Date("2023-04-27"),
//   },
// ];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex((expense) => {
        expense.id === action.payload.id;
      });
      const updatalbeExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatalbeExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

export default function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  const value = {
    expenses: expensesState,
    setExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
