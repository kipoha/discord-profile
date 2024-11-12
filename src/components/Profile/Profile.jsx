import "./Profile.css"
import { useState, useEffect } from 'react'
import { getData, getBannerAvatarBadgesCTDec } from '../../func/getData'
import Loader from "../Loader/Loader"
import ColorThief from 'colorthief'
import { rgbToHex, darkenColor } from "../../func/color"
import BannerAvatar from "../BannerAvatar/BannerAvatar"
import ProfileStatus from "../ProfileStatus/ProfileStatus"
import ProfileInfo from "../ProfileInfo/ProfileInfo"
import ProfileActivities from "../ProfileActivities/ProfileActivities"
import ProfileLinks from "../ProfileLinks/ProfileLinks"

const Profile = () => {
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showProfile, setShowProfile] = useState(false)
    const [banner, setBanner] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [badges, setBadges] = useState([])
    const [created_at, setCreatedAt] = useState(null)
    const [avatar_decoration, setAvatar_decoration] = useState(null)
    const [success, setSuccess] = useState(false)
    const [gradient, setGradient] = useState(null)
    const [color1, setColor1] = useState(null)
    const [color2, setColor2] = useState(null)

    const fetchData = async () => {
        try {
            const data = await getData()
            setUserData(data.data)
            setSuccess(data.success)

            const mediaData = await getBannerAvatarBadgesCTDec()
            setBanner(mediaData.banner)
            setAvatar(mediaData.avatar)
            setBadges(mediaData.badges)
            setCreatedAt(mediaData.created_at)
            setAvatar_decoration(mediaData.avatar_decoration)
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
            setTimeout(() => {
                setShowProfile(true)
            }, 500)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (avatar) {
            const img = new Image()
            img.crossOrigin = "Anonymous"
            img.src = avatar

            img.onload = () => {
                const colorThief = new ColorThief()
                const colors = colorThief.getPalette(img, 20)
                
                if (colors && colors.length >= 2) {                    
                    const color1Hex = rgbToHex(colors[0][0], colors[0][1], colors[0][2])
                    const color2Hex = rgbToHex(colors[1][0], colors[1][1], colors[1][2])
                    
                    // const darkenedColor1 = darkenColor(color1Hex, 10)
                    const darkenedColor2 = darkenColor(color2Hex, 20)
                    setGradient(`linear-gradient(180deg, rgb(${colors[0].join(',')}), rgb(${colors[1].join(',')}))`)
                    setColor1(color1Hex)
                    setColor2(color2Hex)
                }
            }

            img.onerror = () => console.error('Error loading the avatar image.')
        }
    }, [avatar])

    if (loading) return <Loader loading={loading}/>

    if (!success) return <h1>No data</h1>

    const avatarUrl = avatar
    const bannerUrl = banner ? banner : 'default_banner.png'
    const avatarDecorationUrl = avatar_decoration
        ? `https://cdn.discordapp.com/avatar-decoration-presets/${avatar_decoration}.png`
        : null
    const emoji = userData?.activities?.length > 0 && userData.activities[0]?.emoji ? (
    userData.activities[0].emoji.animated
        ? `https://cdn.discordapp.com/emojis/${userData.activities[0].emoji.id}.gif`
        : `https://cdn.discordapp.com/emojis/${userData.activities[0].emoji.id}.png`
    ) : null

    return (
        <div className="profile" style={{ background: gradient }}>
            <div className={`profile-block fade-in ${!showProfile ? 'hidden' : ''}`}>
                <BannerAvatar 
                    bannerUrl={bannerUrl}
                    avatarUrl={avatarUrl}
                    avatarDecorationUrl={avatarDecorationUrl}
                    username={userData.discord_user.username}
                    discordStatus={userData.discord_status}
                    color={color1}
                />
                <ProfileStatus activities={userData.activities} emoji={emoji} />
                <ProfileInfo globalName={userData.discord_user.global_name} username={userData.discord_user.username} badges={badges}/>
                <div className="profile-info-d">
                    <ProfileActivities activity={userData.activities} color={color2} />
                    <ProfileLinks created_at={created_at} />
                </div>
            </div>
        </div>
    )
}

export default Profile