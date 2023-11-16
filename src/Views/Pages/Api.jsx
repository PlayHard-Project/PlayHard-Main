import {useEffect, useState} from "react";
import {getElementByID} from "../../Components/ApiRestHandler/requestHandler";
import "../../css/Api.css"

const Contact = () => {
    const [textFieldValue, setTextFieldValue] = useState("");
    const [response, setResponse] = useState("");
    const [data, setData] = useState([])

    const handleTextFieldChange = (event) => {
        setTextFieldValue(event.target.value);
    }

    const getByID = () => {
        let nameResponse = "";
        data.map(item => {
            nameResponse = item.name
        });
        setResponse(nameResponse);
    }

    useEffect(() => {
        if (textFieldValue !== "") {
            getElementByID(textFieldValue, "/products").then(
                data => {
                    setData(data)
                }
            )
        }
    }, []);

    return (
        <section className="crud-op-container">
            <label>Get by ID:</label>
            <div>
                <button onClick={getByID} className="crud-button">Get</button>
                <input
                    className="textfield"
                    type="text"
                    value={textFieldValue}
                    onChange={handleTextFieldChange}
                    placeholder="Enter id product here"
                />
            </div>
            <p></p>
            <label>{response}</label>
        </section>
    )
}
export default Contact;