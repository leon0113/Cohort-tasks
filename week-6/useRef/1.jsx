/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { useEffect } from "react";

// Create a component with a text input field and a button. When the component mounts or the button is clicked, automatically focus the text input field using useRef.

export default function App() {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus()
    }, []);

    const handleButtonClick = () => {
        inputRef.current.focus()
    };

    return (
        <div>
            <input ref={inputRef} type="text" placeholder="Enter text here" />
            <button type="button" onClick={handleButtonClick}>Focus Input</button>
        </div>
    );
}