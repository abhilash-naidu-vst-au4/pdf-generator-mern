import React, { Component } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { FaDownload } from "react-icons/fa";
import "./App.css";

class App extends Component {
  state = {
    name: "",
    receiptId: 0,
    price1: 0,
    price2: 0,
  };

  handleChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });

  createDownloadPDF = () => {
    axios
      .post("/create-pdf", this.state)
      .then(() => axios.get("fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.body], { type: "application/pdf" });

        saveAs(pdfBlob, "newFile.pdf");
      });
  };

  render() {
    return (
      <div className="container">
        <div className="App">
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="text-input"
            onChange={this.handleChange}
          />
          <input
            type="number"
            placeholder="Receipt ID"
            name="receiptId"
            className="number-receipt"
            onChange={this.handleChange}
          />
          <input
            type="number"
            placeholder="Price 1"
            name="price1"
            className="number-price1"
            onChange={this.handleChange}
          />
          <input
            type="number"
            placeholder="Price 2"
            name="price2"
            className="number-price2"
            onChange={this.handleChange}
          />
          <button className="btn" onClick={this.createDownloadPDF}>
            <FaDownload /> PDF
          </button>
        </div>
      </div>
    );
  }
}

export default App;
