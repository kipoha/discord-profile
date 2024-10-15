import "./Profile.css"
import { useState, useEffect } from 'react'
import { getData, getBannerAvatarBadgesCTDec } from '../../func/getData'
import discord from '../../assets/links/discord.png'
import Loader from "../Loader/Loader"
import { buttonLink, buttonName, promouns, links, badgeIcons, onlineStatus } from "../../config"
import { splitTextIntoLines, formatDuration } from "../../func/renderText"

const Profile = () => {
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showProfile, setShowProfile] = useState(false)
    const [banner, setBanner] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [badges, setBadges] = useState([])
    const [created_at, setCreatedAt] = useState(null)
    const [avatar_decoration, setAvatar_decoration] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData()
            setUserData(data.data)

            const mediaData = await getBannerAvatarBadgesCTDec()
            setBanner(mediaData.banner)
            setAvatar(mediaData.avatar)
            setBadges(mediaData.badges)
            setCreatedAt(mediaData.created_at)
            setAvatar_decoration(mediaData.avatar_decoration)

            setLoading(false)
            
            setTimeout(() => {
                setShowProfile(true)
            }, 500)
        }

        fetchData()
    }, [])

    if (loading) {
        return <Loader loading={loading}/>
    }

    const avatarUrl = avatar
    const bannerUrl = banner ? banner : 'default_banner.png'
    const avatarDecorationUrl = avatar_decoration
        ? `https://cdn.discordapp.com/avatar-decoration-presets/${avatar_decoration}.png`
        : null

    return (
        <div className="profile">
            <div className={`profile-block fade-in ${!showProfile ? 'hidden' : ''}`}>
                <div className="banner" style={{ backgroundImage: `url(${bannerUrl})` }}>
                    <div className="avatar-container">
                        <img className="avatar" src={avatarUrl} alt={`${userData.discord_user.username}'s avatar`} />
                        {avatarDecorationUrl && (
                            <img className="avatar-decoration" src={avatarDecorationUrl} alt="Avatar Decoration" />
                        )}
                        <div className="online-status">
                            <img src={onlineStatus[userData.discord_status]} alt="" />
                        </div>
                    </div>
                </div>
                <div className="profile-status">
                    {userData?.activities?.length > 0 ? (
                        <div className="user-status">{splitTextIntoLines(userData.activities[0]?.state)}</div>
                    ) : null}
                    <a className="user-button" href={buttonLink}>{buttonName}</a>
                </div>
                <div className="profile-info">
                    <h1>{userData.discord_user.global_name ? userData.discord_user.global_name : userData.discord_user.username}</h1>
                    <div className="profile-meta">
                        <span className="username-pronouns">
                            {userData.discord_user.username}
                            <span className="pronouns">{promouns}</span>
                        </span>
                        <div className="profile-badges">
                            {badges.map((badge, index) => (
                                <div key={index} className="badge">
                                    {badgeIcons[badge] && <img src={badgeIcons[badge]} alt={badge} />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="profile-info-d">
                    <div className="profile-activities">
                        {userData.activities && userData.activities.length > 1 ? (
                            userData.activities.slice(1).map((activities, index) => (
                                <div key={index} className="activity">
                                    <div className="activity-img-block">
                                        <div className="profile-activities-img" style={{
                                            backgroundImage: activities.assets?.large_image?.startsWith('mp:external') 
                                                ? `url(https://media.discordapp.net/external/${activities.assets.large_image.split('mp:external/')[1]})`
                                                : `url(https://cdn.discordapp.com/app-assets/${activities.application_id}/${activities.assets.large_image}.png)`
                                        }}>
                                            {activities.assets?.small_image && (
                                                activities.assets.small_image.startsWith('mp:external') ? (
                                                    <div className="profile-activities-small-img">
                                                        <img
                                                            src={`https://media.discordapp.net/external/${activities.assets.small_image.split('mp:external/')[1]}`}
                                                            alt={activities.small_text || 'Activity Small'}
                                                            onError={(e) => e.target.style.display = 'none'}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="profile-activities-small-img">
                                                        <img
                                                            src={`https://cdn.discordapp.com/app-assets/${activities.application_id}/${activities.assets.small_image}.png`}
                                                            alt={activities.small_text || 'Activity Small'}
                                                            onError={(e) => e.target.style.display = 'none'}
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                    <div className="activity-info">
                                        <h2>{activities.name}</h2>
                                        <p>{activities.state}</p>
                                        <p>{activities.details || ''}</p>
                                        
                                        {activities.timestamps ? (
                                            <>
                                                {activities.timestamps.end && (
                                                    <p>
                                                        End: {new Date(activities.timestamps.end).toLocaleTimeString('en-US')}
                                                    </p>
                                                )}
                                                <p>
                                                    Duration: {formatDuration(activities.timestamps.start, activities.timestamps.end)}
                                                </p>
                                            </>
                                        ) : (
                                            null
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No activities found.</p>
                        )}
                    </div>
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
                                    <img src={linkItem.src} alt={linkItem.name} />
                                    <a href={linkItem.link}>{linkItem.name}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile