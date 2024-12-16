import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { userSignUp } from '../../api/functions/userSignUp'
import { userSignIn } from '../../api/functions/userSignIn'
import { USER } from '../query_keys/query-keys'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { getProfileDetails } from '../../api/functions/getProfileDetails'

export const useUserSignUpQuery = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: userSignUp,
    onSuccess: (data) => {
      if (data?.status === 200) {
        toast.success(data.message)
        queryClient.invalidateQueries({ queryKey: [USER] })
        navigate('/sign_in')
      }
    },
  })
}

export const useUserSignInQuery = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: userSignIn,
    onSuccess: (data) => {
      if (data?.status === 200) {
        localStorage.setItem('token', data?.token)
        localStorage.setItem('user', data?.data?.first_name)
        localStorage.setItem('profile', data?.data?.profile_pic)
        toast.success(data.message)
        queryClient.invalidateQueries({ queryKey: [USER] })
        navigate('/home')
      }
    },
  })
}

export const useProfileDetailsQuery = () => {
  return useQuery({
    queryKey: [USER],
    queryFn: () => getProfileDetails(),
  });
};


