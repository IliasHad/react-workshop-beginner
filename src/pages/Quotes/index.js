import { useEffect, useState } from "react";
export function QuotesPage() {
  const [quote, setQuote] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    console.log("QuotesPage mounted");
    const fetchData = async () => {
      try {
        const data = await fetch("https://api.quotable.io/quotes/random");
        const json = await data.json();
        console.log(json[0]);
        if (json[0]) {
          setQuote(json[0]);
        } else {
            throw new Error("No quote found");
        }
      } catch (err) {
        console.log(err);
        setErrorMessage(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    return () => {
      console.log("QuotesPage unmounted");
      setQuote({});
    };
  }, []);
  return (
    <div>
      <h1>Quotes Page</h1>
      {isLoading && <p>Loading...</p>}
      {errorMessage && <p>{errorMessage}</p>}
      {quote && (
        <blockquote>
          <p>{quote.content}</p>
          <footer>- {quote.author}</footer>
        </blockquote>
      )}
    </div>
  );
}
