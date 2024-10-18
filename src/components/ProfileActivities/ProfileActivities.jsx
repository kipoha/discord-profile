import { formatDuration } from "../../func/renderText"
import './ProfileActivities.css'

const ProfileActivities = ({ activity, color }) => {
    return (
        <div className="profile-activities">
            {activity && activity.length > 1 ? (
                activity.slice(1).map((activities, index) => (
                    <div key={index} className="activity" style={{ backgroundColor: color }}>
                        <div className="activity-img-block">
                            {activities.assets?.large_image && (
                            <div className="profile-activities-img" 
                                style={{
                                    backgroundImage: activities.assets.large_image.startsWith('mp:external')
                                        ? `url(https://media.discordapp.net/external/${activities.assets.large_image.split('mp:external/')[1]})`
                                        : `url(https://cdn.discordapp.com/app-assets/${activities.application_id}/${activities.assets.large_image}.png)`
                                }}
                            >
                                {activities.assets?.small_image && (
                                    activities.assets.small_image.startsWith('mp:external') ? (
                                        <div className="profile-activities-small-img" style={{ backgroundColor: color }}>
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
                        )}
                        </div>
                        <div className="activity-info">
                            <h2>{activities.name || ''}</h2>
                            <p>{activities.state || ''}</p>
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
    )
}

export default ProfileActivities