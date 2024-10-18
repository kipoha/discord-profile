import { buttonLink, buttonName } from "../../config"
import { splitTextIntoLines } from "../../func/renderText"
import './ProfileStatus.css'

const ProfileStatus = ({ activities, emoji, color }) => {
    return (
        <div className="profile-status">
            {activities?.length > 0 && (
                <div className="user-status">
                    {emoji && (
                        <img src={emoji} alt="Activity Emoji" />
                    )}
                    {activities[0]?.state && (
                        <p>{splitTextIntoLines(activities[0]?.state)}</p>
                    )}
                </div>
            )}
            <a className="user-button" style={{ backgroundColor: color }} href={buttonLink}>{buttonName}</a>
        </div>
    )
}

export default ProfileStatus