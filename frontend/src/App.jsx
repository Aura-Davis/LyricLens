import { useState, useEffect, useRef } from "react";
import SearchForm from "./components/SearchForm/SearchForm";
import Results from "./components/Results/Results";
import './App.css'

function App() {
    const [resultData, setResultData] = useState(null);
    const resultsRef = useRef(null);

    useEffect(() => {
        if (resultData && resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [resultData]);

    return (
        <div className="min-h-screen p-4 text-center">
            <h1 className="text-3xl font-bold mb-6 text-purple-700">LyricLens</h1>
            <SearchForm onResults={setResultData} />
            <div ref={resultsRef} className="mt-10">
                <Results data={resultData} />
            </div>
        </div>
    );
}

export default App
