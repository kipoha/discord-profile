export const renderAboutMeWithLinks = (text) => {
    const urlPattern = /https?:\/\/[^\s]+/g
    const parts = text.split(urlPattern)
    const links = text.match(urlPattern)

    if (!links) return text

    return parts.reduce((acc, part, i) => {
        acc.push(<span key={i}>{part}</span>)
        if (links[i]) {
            acc.push(
                <a key={`link-${i}`} href={links[i]} target="_blank" rel="noopener noreferrer">
                    {links[i]}
                </a>
            )
        }
        return acc
    }, [])
}   

export const splitTextIntoLines = (text) => {
    const lines = text.split("\n");
    return lines.map((line, index) => <p key={index}>{line}</p>);
}

export const formatDuration = (startTime, endTime) => {
    if (!startTime) return 'Duration not available'
    const start = new Date(startTime)
    const end = endTime ? new Date(endTime) : new Date()
    
    const durationInSeconds = Math.floor((end - start) / 1000);
    const hours = String(Math.floor(durationInSeconds / 3600)).padStart(2, '0')
    const minutes = String(Math.floor((durationInSeconds % 3600) / 60)).padStart(2, '0')
    const seconds = String(durationInSeconds % 60).padStart(2, '0')
    
    return `${hours}:${minutes}:${seconds}`
}