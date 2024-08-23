"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import cvStore from "@/hooks/cvStore"
import NovelEditor from "../markdownEditor/mdEditor"

const formSchema = z.object({
  wantedJobTitle: z.string().min(7).max(50),
  firstName: z.string().min(7).max(50),
  lastName: z.string().min(7).max(50),
  email: z.string().min(7).max(50),
  phone: z.number().min(7).max(50),
  country: z.string().min(7).max(50),
  city: z.string().min(7).max(50),
})

const CVForm = () => {
  const { editcv } = cvStore((state) => state)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  const handleChange = (
    fieldName: keyof z.infer<typeof formSchema>,
    value: any
  ) => {
    console.log(`${fieldName} changed to:`, value)
    // Perform any other onChange logic here, e.g., validation, updating state, etc.
    editcv({ [fieldName]: value })
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
          <FormField
            control={form.control}
            name='wantedJobTitle'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wanted Job Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Wanted Job Title'
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      handleChange("wantedJobTitle", e.target.value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='First Name'
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      handleChange("firstName", e.target.value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Last Name'
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      handleChange("lastName", e.target.value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Email'
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      handleChange("email", e.target.value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder='070000001111'
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      handleChange("phone", e.target.value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='country'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Kenya'
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      handleChange("country", e.target.value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='city'
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Nairobi'
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      handleChange("city", e.target.value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <NovelEditor
          content=''
          title='Professional Summary'
          setContent={(content: string | undefined) =>
            editcv({ professionalSummary: content as string })
          }
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}

export default CVForm
