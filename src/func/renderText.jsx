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
