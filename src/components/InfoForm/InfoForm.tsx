import { useQuery } from '@tanstack/react-query'
import { Auth } from '@/types/authType'
import AuthServices from '@/services/authServices'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { alertErrorAxios } from '@/utils/alert'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import UserGenderEnum from '@/constants/users/UserGenderEnum'
import { toast } from 'react-toastify'

const formSchema = z.object({
  fullName: z.string(),
  gender: z.number(),
})

const InfoForm = () => {
  const { data: infoResponse, isSuccess } = useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: AuthServices.getInfo,
    refetchOnMount: true,
  })

  const info: Auth = infoResponse?.data

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
    },
  })

  useEffect(() => {
    if (isSuccess) {
      form.setValue('fullName', info.fullName)
      form.setValue('gender', info.gender)
    }
  }, [isSuccess])

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values)

      const res = await AuthServices.updateInfo(values)
      const data: { message: string } = res.data
      toast.success(data.message)
    } catch (error) {
      alertErrorAxios(error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(val) => {
                  form.setValue('gender', +val)
                }}
                value={`${field.value}`}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(UserGenderEnum.allName()).map((key) => {
                    return (
                      <SelectItem key={key} value={key}>
                        {UserGenderEnum.allName()[Number(key)]}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Đổi thông tin
        </Button>
      </form>
    </Form>
  )
}

export default InfoForm
