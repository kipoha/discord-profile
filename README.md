# React + Vite

edit `src/config/js`
```js
export const userId = '914930212297392129' // ur userID in discord!
```

and edit `src/components/Profile/Profile.jsx` as profile description, user status, pronoun and integration are static
```jsx
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
                <div className="user-status">kipoha doesn't exist</div> // is static
                <a className="user-button" href="https://menero.kipoha.fun/">Menero</a> // is static
            </div>
            <div className="profile-info">
                <h1>{userData.global_name ? userData.global_name : userData.username}</h1>
                <div className="profile-meta">
                    <span className="username-pronouns">
                        {userData.username}
                        <span className="pronouns">- void, core, null, not exist, kip</span> // is static
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
                <div className="profile-description"> // is static
                    <p style={{ fontSize: 10, marginBottom: 5, fontWeight: "bold", color: '#' }}>About me</p> // is static
                    <div><a href="https://menero.kipoha.fun/">https://menero.kipoha.fun/</a></div> // is static
                    <a href="https://core.kipoha.fun/">https://core.kipoha.fun/</a> // is static
                    <p>does this make sense?</p> // is static
                    <p>love is killing me and meeting me in a robot body in 1000 years</p> // is static
                    <p>Why am I still alive?...</p> // is static
                </div>
                <div className="profile-links">
                    <p style={{ fontSize: 10, marginTop: 30, marginBottom: -10, fontWeight: "bold", color: '#' }}>Member Since</p>
                    <div className="created_at">
                        <img src={discord} alt="idk"/>
                        <p>
                            {new Date(userData.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </p>
                    </div>

                    <p style={{ fontSize: 10, marginTop: 30, fontWeight: "bold", color: '#' }}>Connections</p>
                    <div className="links"> // is static
                        <div className="links-b"> // is static
                            <img src={site} alt="Site" /> // is static
                            <a href="https://kipoha.fun/">kipoha.fun</a> // is static
                        </div>
                        <div className="links-b"> // is static
                            <img src={github} alt="Github" /> // is static
                            <a href="https://github.com/kipoha/">kipoha</a> // is static
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
```


## Preview
![Image alt](./preview.png)