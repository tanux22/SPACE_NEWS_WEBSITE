import { useEffect, useState } from "react"


export default function ArticleCards() {
    const [articles, setArticles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [summary, setSummary] = useState([]);
    const getNewsArticles = async () => {
        const response = await fetch("http://localhost:8000/articles");
        const data = await response.json();
        setArticles(data);
    }

    useEffect(() => {
        try {
            getNewsArticles();
        } catch (error) {
            console.log(error);
            alert("Something went wrong!!!")
        }
    }, [])



    const truncateSummary = (summary) => {
        const words = summary.split(" ");
        if (words.length > 100) {
            return words.slice(0, 100).join(" ") + "...";
        }
        return summary;
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const generateSummary = async (url) => {
        try {
            const response = await fetch("http://localhost:8000/ask", {
                method: "POST",
                body: JSON.stringify({ prompt: `Provide summary for ${url}` }),
                headers: { 'Content-Type': "application/json" },
            });
            const result = await response.json();
            setSummary(result.message);
        } catch (error) {
            console.log(error);
            alert("Error generating summary");
        } 
    };

    return (<>
        <div className="row justify-content-around" style={{ backgroundColor: "white" }}>
            {articles.map((article) => (
                <div className="col-3 border p-3 m-4" style={{ background: "linear-gradient(to right, #f4a261, #fceabb)", color: "orange", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px" }}>
                    <img src={article.image_url} className="img-fluid" style={{ marginBottom: "10px" }} />
                    <div style={{ backgroundColor: "black", padding: "10px", borderRadius: 10, margin: "10px 0px", textAlign: "center" }}>
                        <div style={styles.title}>Title:</div><span style={styles.text}>{article.title}</span>
                        <div style={styles.title}>Summary:</div><span style={styles.text}>{truncateSummary(article.summary)}</span>
                        <div style={styles.title}>News Site:</div><span style={styles.text}>{article.news_site}</span>
                        <div style={styles.title}>Published:</div><span style={styles.text}>{new Date(article.published_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                        <button style={{ padding: "5px 10px", borderRadius: "10px" }} onClick={() => { setIsModalOpen(true); generateSummary(article.url) }}>Generate Summary</button>
                        <a href={article.url}>Read Article</a>
                    </div>
                </div>
            ))}
        </div>
        {isModalOpen && (
            <div className="overlay" style={{ display: "block", position: "fixed", zIndex: "1", left: "0", top: "0", width: "100%", height: "100%", overflow: "auto", backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
                <div className="model" style={{ background: "linear-gradient(to right, #caf0f8, #90e0ef, #48cae4)", margin: "50px auto", padding: "20px", border: "1px solid grey", width: "50%", boxShadow: "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px", border: "5px solid black" }}>
                    <span className="close-btn" style={{ float: "right", fontSize: "28px", fontWeight: "bolder", cursor: "pointer" }} onClick={closeModal}>&times;</span>
                    <h1>GENERATED SUMMARY</h1>
                    <div className="text" style={{ marginTop: "20px" }}>{summary}</div>
                    <button className="close" style={{ marginTop: "20px" }} onClick={closeModal}>Close</button>
                </div>
            </div>
        )}

    </>);
};




const styles = {
    title: {
        fontWeight: 'bold',
    },
    text: {
        color: "white",
    }
}