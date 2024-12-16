import { axiosInstance } from "../axiosInstance/axiosInstance";
import { endPoints } from "../endPoints/endPoints";

export const productUpdate = async (updateProduct) => {

  try {
    const { data } = await axiosInstance.post(
      `${endPoints.product.update}`,
      updateProduct
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
