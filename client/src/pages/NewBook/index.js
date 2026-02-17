import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./styles.css";
import logoImage from "../../assets/logo.svg";
import api from "../../services/api";

export default function NewBook() {
  const navigate = useNavigate();

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [launchDate, setLaunchDate] = useState("");
  const [price, setPrice] = useState("");
  const { bookId } = useParams();

  async function createNewBook(e) {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");
    const data = {
      title,
      author,
      launchDate,
      price,
    };
    try {
      await api.post("/api/Book/v1", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (err) {
      alert("Error while recording Book! Try again");
    }

    navigate("/books");
  }

  return (
    <div className="new-book-container">
      <div className="content">
        <section className="form">
          <img src={logoImage} alt="Erudio" />
          <h1>Add New Book</h1>
          <p>Enter the book information and click on 'Add'!</p>
          <Link className="back-link" to="/books">
            <FiArrowLeft size={16} color="#251FC5" />
            Home
          </Link>
        </section>
        <form onSubmit={createNewBook}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="date"
            value={launchDate}
            onChange={(e) => setLaunchDate(e.target.value)}
          />
          <input
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button className="button" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
