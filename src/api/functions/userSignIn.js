import { axiosInstance } from '../axiosInstance/axiosInstance'
import { endPoints } from '../endPoints/endPoints'

export const userSignIn = async (user) => {
  try {
    const { data } = await axiosInstance.post(`${endPoints.user.signin}`, user)
    return data
  } catch (error) {
    console.log(error)
  }
}
