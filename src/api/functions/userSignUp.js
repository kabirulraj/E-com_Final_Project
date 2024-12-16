import { axiosInstance } from '../axiosInstance/axiosInstance'
import { endPoints } from '../endPoints/endPoints'

export const userSignUp = async (newUser) => {

  try {
    const { data } = await axiosInstance.post(
      `${endPoints.user.signup}`,
      newUser
    )
    return data
  } catch (error) {
    console.log(error)
  }
}
