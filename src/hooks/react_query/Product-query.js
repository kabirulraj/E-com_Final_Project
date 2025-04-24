import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../api/functions/createProduct";
import { getAllProduct } from "../../api/functions/getAllproducts";
import { PRODUCT } from "../query_keys/query-keys";
import { toast } from "sonner";
import { productDelete } from "../../api/functions/productDelete";
import { getProductDetails } from "../../api/functions/getProductDetails";
import { productUpdate } from "../../api/functions/productUpdate";

export const useProductCreateQuery = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
      mutationFn: createProduct,
      onSuccess: (data) => {
        if (data?.status === 200) {
          console.log(data)
          toast.success(data.message)
          queryClient.invalidateQueries({ queryKey: [PRODUCT] });
          navigate("/product");
        }
      },
    });
  };

  export const useProductListQuery = () => {
    return useQuery({
      queryKey: [PRODUCT],
      queryFn: getAllProduct,
    });
  };  

  export const useProductDeleteQuery = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
      mutationFn: ({ id }) => productDelete(id),
      onSuccess: (data) => {
        if (data?.status === 200) {
          toast.error(data.message)
          queryClient.invalidateQueries({ queryKey: [PRODUCT] });
          navigate("/product");
        }
      },
    });
  };

  export const useProductDetailsQuery = (id) => {
    return useQuery({
      queryKey: [PRODUCT, id],
      queryFn: () => getProductDetails(id),
    });
  };
  
  export const useProductUpdateQuery = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
      mutationFn: productUpdate,
      onSuccess: (data) => {
        if (data?.status === 200) {
          toast.success(data.message)
          queryClient.invalidateQueries({ queryKey: [PRODUCT] });
          navigate("/product");
        }
      },
    });
  };