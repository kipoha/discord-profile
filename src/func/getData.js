import { userId } from "../config";

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