import "./Profile.css"
import { useState, useEffect } from 'react'
import { getData, badgeIcons } from '../../func/getData'
import github from '../../assets/links/github.png'
import site from '../../assets/links/site.png'
import Loader from "../Loader/Loader"

const Profile = () => {
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showProfile, setShowProfile] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData();
            setUserData(data)
            setLoading(false)
            
            setTimeout(() => {
                setShowProfile(true)
            }, 500);
        }

        fetchData()
    }, [])

    if (loading) {
        return <Loader loading={loading}/>
    }

    const avatarUrl = userData.avatar.link
    const bannerUrl = userData.banner ? userData.banner.link : 'default_banner.png'
    const avatarDecorationUrl = userData.avatar_decoration
        ? `https://cdn.discordapp.com/avatar-decoration-presets/${userData.avatar_decoration.asset}.png`
        : null

    return (
        <div className="profile">
            <div className={`profile-block fade-in ${!showProfile ? 'hidden' : ''}`}>
                <div className="banner" style={{ backgroundImage: `url(${bannerUrl})` }}>
                    <div className="avatar-container">
                        <img className="avatar" src={avatarUrl} alt={`${userData.username}'s avatar`} />
                        {avatarDecorationUrl && (
                            <img className="avatar-decoration" src={avatarDecorationUrl} alt="Avatar Decoration" />
                        )}
                    </div>
                </div>
                <div className="profile-status">
                    <div className="user-status">kipoha doesn't exist</div>
                    <a className="user-button" href="https://menero.kipoha.fun/">Menero</a>
                </div>
                <div className="profile-info">
                    <h1>{userData.global_name ? userData.global_name : userData.username}</h1>
                    <div className="profile-meta">
                        <span className="username-pronouns">
                            {userData.username}
                            <span className="pronouns">- void, core, null, not exist, kip</span>
                        </span>
                        <div className="profile-badges">
                            {userData.badges.map((badge, index) => (
                                <div key={index} className="badge">
                                    {badgeIcons[badge] && <img src={badgeIcons[badge]} alt={badge} />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="profile-info-d">
                    <div className="profile-description">
                        <p style={{ fontSize: 10, marginBottom: 5, fontWeight: "bold", color: '#' }}>About me</p>
                        <div><a href="https://menero.kipoha.fun/">https://menero.kipoha.fun/</a></div>
                        <a href="https://core.kipoha.fun/">https://core.kipoha.fun/</a>
                        <p>does this make sense?</p>
                        <p>love is killing me and meeting me in a robot body in 1000 years</p>
                        <p>Why am I still alive?...</p>
                    </div>
                    <div className="profile-links">
                        <p style={{ fontSize: 10, marginTop: 30, marginBottom: -10, fontWeight: "bold", color: '#' }}>Member Since</p>
                        <p>
                            {new Date(userData.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </p>

                        <p style={{ fontSize: 10, marginTop: 30, fontWeight: "bold", color: '#' }}>Connections</p>
                        <div className="links">
                            <div className="links-b">
                                <img src={site} alt="Site" />
                                <a href="https://kipoha.fun/">kipoha.fun</a>
                            </div>
                            <div className="links-b">
                                <img src={github} alt="Github" />
                                <a href="https://github.com/kipoha/">kipoha</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile