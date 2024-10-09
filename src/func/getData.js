import { userId } from "../config";
import hype from '../assets/badges/house_brilliance_icon.png'
import dev from '../assets/badges/active_developer_icon.png'

export const getData = async () => {
  try {
    const response = await fetch(`https://discordlookup.mesalytic.moe/v1/user/${userId}`, {
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


export const badgeIcons = {
    'HOUSE_BRILLIANCE': hype, 
    'ACTIVE_DEVELOPER': dev, 
};
