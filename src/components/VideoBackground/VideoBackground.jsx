import React, { useEffect, useRef, useState } from 'react'
import pause from '../../assets/player/pause.png'
import play from '../../assets/player/play.png'
import './VideoBackground.css'

const BackgroundVideoWithControls = ({ videoUrl }) => {
    const playerRef = useRef(null)
    const [volume, setVolume] = useState(30)
    const [isPlaying, setIsPlaying] = useState(true)
    const [isControlsVisible, setControlsVisible] = useState(false)
    const [isVideoVisible, setVideoVisible] = useState(true)
    const [isVideoAnimating, setVideoAnimating] = useState(false)

    useEffect(() => {
        const loadYouTubeAPI = () => {
            if (window.YT) {
                initPlayer()
            } else {
                const tag = document.createElement('script')
                tag.src = 'https://www.youtube.com/iframe_api'
                const firstScriptTag = document.getElementsByTagName('script')[0]
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
                window.onYouTubeIframeAPIReady = initPlayer
            }
        }

        const initPlayer = () => {
            playerRef.current = new window.YT.Player('youtube-player', {
                videoId: getVideoId(videoUrl),
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    showinfo: 0,
                    modestbranding: 1,
                    loop: 1,
                    playlist: getVideoId(videoUrl),
                    playsinline: 1,
                },
                events: {
                    onReady: (event) => {
                        event.target.setVolume(volume)
                        if (isPlaying) {
                            event.target.playVideo()
                        }
                    },
                    onStateChange: (event) => {
                        if (event.data === window.YT.PlayerState.PAUSED) {
                            setIsPlaying(false)
                        } else if (event.data === window.YT.PlayerState.PLAYING) {
                            setIsPlaying(true)
                        }
                    },
                },
            })
        }

        loadYouTubeAPI()

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy()
            }
        }
    }, [videoUrl])

    const getVideoId = (url) => {
        const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        const match = url.match(regex)
        return match ? match[1] : null
    }

    const handleVolumeChange = (event) => {
        const newVolume = Number(event.target.value);
        setVolume(newVolume)
        if (playerRef.current) {
            if (typeof playerRef.current.setVolume === 'function') {
                playerRef.current.setVolume(newVolume)
            }
        }
    }

    const handlePlayPause = () => {
        if (playerRef.current) {
            if (isPlaying) {
                playerRef.current.pauseVideo()
            } else {
                playerRef.current.playVideo()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const toggleVideoVisibility = () => {
        setVideoAnimating(true)
        setTimeout(() => {
            setVideoVisible((prev) => {
                const newVisibility = !prev
                if (playerRef.current) {
                    if (newVisibility) {
                        playerRef.current.setVolume(volume)
                    } else {
                        playerRef.current.setVolume(0)
                    }
                }
                return newVisibility
            })
            setVideoAnimating(false)
        }, 300)
    }

    return (
        <div
            className="video-background"
            onMouseEnter={() => setControlsVisible(true)}
            onMouseLeave={() => setControlsVisible(false)}
        >
            <div
                id="youtube-player"
                className={`video ${isVideoAnimating ? 'fade' : ''}`}
                style={{ opacity: isVideoVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}
            ></div>
            <div className={`controls ${isControlsVisible ? 'visible' : 'hidden'}`}>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="volume-slider"
                />
                <button className="play-pause-button" onClick={handlePlayPause}>
                    <img src={isPlaying ? pause : play} alt="pl" style={{ width: 20, height: 20 }} />
                </button>
                <button className="toggle-video-button" onClick={toggleVideoVisibility}>
                    {isVideoVisible ? 'Скрыть видео' : 'Показать видео'}
                </button>
            </div>
        </div>
    )
}

export default BackgroundVideoWithControls