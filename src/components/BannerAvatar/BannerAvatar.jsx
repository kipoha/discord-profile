import { onlineStatus } from "../../config"
import './BannerAvatar.css'

const BannerAvatar = ({ bannerUrl, avatarUrl, avatarDecorationUrl, color, username, discordStatus }) => {
    return(
        <div className="banner" style={{ backgroundImage: `url(${bannerUrl})` }}>
            <div className="avatar-container">
                <img className="avatar" src={avatarUrl} alt={`${username}'s avatar`} style={{ border: `4px solid ${color}` }} />
                {avatarDecorationUrl && (
                    <img className="avatar-decoration" src={avatarDecorationUrl} alt="Avatar Decoration" />
                )}
                <div className="online-status" style={{ backgroundColor: color }}>
                    <img src={onlineStatus[discordStatus]} alt="" />
                </div>
            </div>
        </div>
    )
}

export default BannerAvatar