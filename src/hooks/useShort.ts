import api from '@/utils/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

export type ShortLink = {
  id: number
  title: string
}

export function useShort() {
  return useQuery<ShortLink[]>({
    queryKey: ['shortLinks'],
    queryFn: async () => {
      const res = await api.get('/')
      console.log('test api', res.data)

      return res.data
    },
  })
}

export function useCreateShortLink() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (short: string) => {
      const { data } = await api.post('/', { original_url: short })
      console.log('data', data)

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shortLinks'] })
    },
  })
}
