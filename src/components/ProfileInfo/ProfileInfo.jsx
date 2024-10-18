import { promouns, badgeIcons } from "../../config"
import './ProfileInfo.css'

const ProfileInfo = ({ globalName, username, badges }) => {
    return (
        <div className="profile-info">
            <h1>{globalName ? globalName : username}</h1>
            <div className="profile-meta">
                <span className="username-pronouns">
                    {username}
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
    )
}

export default ProfileInfo