import { axiosInstance } from "../axiosInstance/axiosInstance";
import { endPoints } from "../endPoints/endPoints";


export const getProductDetails = async (id) => {
  try {
    const { data } = await axiosInstance.get(
      `${endPoints?.product?.productDetails}/${id}`
    );
    return data
  } catch (error) {
    console.log(error);
  }
};
