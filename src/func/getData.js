import { userId } from "../config";

export const getData = async () => {
  try {
    const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error(`Error fetching user: ${response.status} - ${response.statusText}`)
    }

    const data = await response.json()
    return data;     
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export const getBannerAvatarBadgesCTDec = async () => {
  try {
    const response = await fetch(`https://discordlookup.mesalytic.moe/v1/user/${userId}`, {
      method: 'GET',
    })
    
    if (!response.ok) {
      throw new Error(`Error fetching banner: ${response.status} - ${response.statusText}`)
    }
    
    const data = await response.json()
    return {
      banner: data.banner.link,
      avatar: data.avatar.link,
      badges: data.badges,
      created_at: data.created_at,
      avatar_decoration: data.avatar_decoration ? data.avatar_decoration.asset : null
  }
  
  } catch (error) {
    console.error('Error fetching banner:', error)
  }
}
