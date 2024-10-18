import './MainLinks.css'

const MainLinks = ({ mainUrl, meneroUrl, sourceCodeUrl }) => {
    return (
        <div className="main-links">
            <a href={mainUrl} target="_blank" rel="noopener noreferrer">Site</a>
            <a href={meneroUrl} target="_blank" rel="noopener noreferrer">Menero</a>
            <a href={sourceCodeUrl} target="_blank" rel="noopener noreferrer">Source</a>
        </div>
    )
}
export default MainLinks