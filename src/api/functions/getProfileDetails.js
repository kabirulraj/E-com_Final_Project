import { axiosInstance } from "../axiosInstance/axiosInstance";
import { endPoints } from "../endPoints/endPoints";



export const getProfileDetails = async () => {
  try {
    const { data } = await axiosInstance.get(
      `${endPoints?.user?.profileDetails}`
    );
    return data
  } catch (error) {
    console.log(error);
  }
};
