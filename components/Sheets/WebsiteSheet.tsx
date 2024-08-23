"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { z } from "zod"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import axios from "axios"
import { toast } from "sonner"

const formSchema = z.object({
  domain: z.string().min(3).max(50),
  url: z.string().min(3).max(200),
})

const WebsiteSheet = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) => {
  const Form = FormProvider
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const response = await axios.post(
        "https://indieseo.onrender.com/website/create",
        data,
        {
          withCredentials: true,
        }
      )
      return response.data
    },
    onSuccess: (data) => {
      // Handle success, e.g., close the sheet, show a notification, etc.

      form.reset()
      setOpen(false)
      toast("Website Created", {
        description: data.result.domain + " created",
        action: {
          label: "Check SEO",
          onClick: () => console.log("Checking SEO"),
        },
      })
      queryClient.invalidateQueries({ queryKey: ["websites_get"] })
    },
    onError: (error) => {
      // Handle error, e.g., show an error message
      console.error("Error creating website", error)
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    mutation.mutate(values)
  }
  return (
    <Sheet open={open} onOpenChange={() => setOpen(!open)}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your website here. Click save when done.
          </SheetDescription>
        </SheetHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <div className='grid gap-4 py-4'>
                <FormField
                  control={form.control}
                  name='domain'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter the domain alias</FormLabel>
                      <FormControl>
                        <Input placeholder='Domain Alias' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='url'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter the URL</FormLabel>
                      <FormControl>
                        <Input placeholder='https://...' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type='submit'>Save Changes</Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default WebsiteSheet
