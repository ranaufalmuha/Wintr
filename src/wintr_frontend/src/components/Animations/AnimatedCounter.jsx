import React, { useEffect, useState } from 'react';

function AnimatedCounter({ target }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 1000;
        const incrementTime = 50;
        const totalSteps = duration / incrementTime;
        const increment = Math.ceil(target / totalSteps);

        const interval = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount + increment >= target) {
                    clearInterval(interval);
                    return target;
                }
                return prevCount + increment;
            });
        }, incrementTime);

        return () => clearInterval(interval);
    }, [target]);

    return (
        <p>{count.toLocaleString()}</p>
    );
};

export default AnimatedCounter;
