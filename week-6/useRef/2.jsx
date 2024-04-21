import React, { useState, useCallback } from 'react';
import { useRef } from 'react';

// Create a component that tracks and displays the number of times it has been rendered. 

export default function App() {
    const [count, setCount] = useState(1);
    const numberOfTimesReRendered = useRef(0);

    const handleReRender = () => {
        // Update state to force re-render
        setCount(count + 1);
    };

    numberOfTimesReRendered.current = numberOfTimesReRendered.current + 1;
    return (
        <div>
            <p>This component has rendered {numberOfTimesReRendered.current} times. cout: {count}</p>
            <button onClick={handleReRender}>Force Re-render</button>
        </div>
    );
}
