
import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await axios.get(`${API}/expenses`);
    setExpenses(res.data);
  };

  const addExpense = async () => {
    if (!title || !amount || !category) return;
    await axios.post(`${API}/expenses`, {
      title,
      amount: Number(amount),
      category,
    });
    setTitle("");
    setAmount("");
    setCategory("");
    fetchExpenses();
  };

  const deleteExpense = async (id) => {
    await axios.delete(`${API}/expenses/${id}`);
    fetchExpenses();
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        💰 Expense Tracker
      </h1>

      {/* Total */}
      <div style={{ background: "#4CAF50", color: "white", padding: "15px",
        borderRadius: "8px", textAlign: "center", marginBottom: "20px" }}>
        <h2>Total Spent: ₹{total}</h2>
      </div>

      {/* Add Expense Form */}
      <div style={{ background: "white", padding: "20px",
        borderRadius: "8px", marginBottom: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <h3 style={{ marginBottom: "15px" }}>Add Expense</h3>
        <input placeholder="Title" value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle} />
        <input placeholder="Amount" type="number" value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={inputStyle} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}
          style={inputStyle}>
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>
        <button onClick={addExpense}
          style={{ width: "100%", padding: "10px", background: "#4CAF50",
            color: "white", border: "none", borderRadius: "5px",
            cursor: "pointer", fontSize: "16px" }}>
          Add Expense
        </button>
      </div>

      {/* Expense List */}
      <div>
        {expenses.length === 0 && (
          <p style={{ textAlign: "center", color: "#888" }}>No expenses yet!</p>
        )}
        {expenses.map((e) => (
          <div key={e._id} style={{ background: "white", padding: "15px",
            borderRadius: "8px", marginBottom: "10px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h4>{e.title}</h4>
              <small style={{ color: "#888" }}>{e.category}</small>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontWeight: "bold", color: "#333" }}>₹{e.amount}</span>
              <button onClick={() => deleteExpense(e._id)}
                style={{ background: "#ff4444", color: "white",
                  border: "none", borderRadius: "5px",
                  padding: "5px 10px", cursor: "pointer" }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ddd",
  fontSize: "14px",
};