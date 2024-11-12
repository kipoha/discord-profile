import { buttonLink, buttonName } from "../../config"
import { splitTextIntoLines } from "../../func/renderText"
import './ProfileStatus.css'

const ProfileStatus = ({ activities, emoji }) => {
    return (
        <div className="profile-status">
            {activities?.length > 0 && (
                <div className="user-status">
                    {emoji && (
                        <img src={emoji} alt="Activity Emoji" />
                    )}
                    {activities[0]?.state && (
                        <div>{splitTextIntoLines(activities[0]?.state)}</div>
                    )}
                </div>
            )}
            <a className="user-button" href={buttonLink}>{buttonName}</a>
        </div>
    )
}

export default ProfileStatus