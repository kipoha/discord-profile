import discord from '../../assets/links/discord.png'
import { links } from '../../config'
import './ProfileLinks.css'

const ProfileLinks = ({ created_at }) => {
    return (
        <div className="profile-links">
            <p style={{ fontSize: 10, marginTop: 30, marginBottom: -10, fontWeight: "bold", color: '#' }}>Member Since</p>
            <div className="created_at">
                <img src={discord} alt="idk"/>
                <p>
                    {new Date(created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}
                </p>
            </div>

            <p style={{ fontSize: 10, marginTop: 30, fontWeight: "bold", color: '#' }}>Connections</p>
            <div className="links">
                {links.map((linkItem, index) => (
                    <div key={index} className="links-b">
                        <img src={linkItem.src} alt={linkItem.text} />
                        <a href={linkItem.link} target="_blank" rel="noopener noreferrer">{linkItem.name}</a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProfileLinks