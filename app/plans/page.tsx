"use client"

import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "axios"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import useUserStore from "@/hooks/userStore"
import { toast } from "sonner"
import { LoaderPinwheel } from "lucide-react"
import { APIurl } from "@/apiconfig"

// Fetch plans from server
const fetchPlans = async () => {
  const response = await axios.get(`${APIurl}/payment/fetch_plans`, {
    withCredentials: true,
  })
  return response.data.result.data
}

// Initialize payment with Paystack
const initiatePayment = async ({
  email,
  amount,
  plan,
}: {
  email: string
  amount: number | string
  plan: string
}) => {
  const response = await axios.post(
    `${APIurl}/payment/initiate_payment`,
    {
      email,
      amount,
      plan,
    },
    {
      withCredentials: true,
    }
  )
  return response.data.result.data.authorization_url
}

// Subscribe user with Paystack
const subscribeUser = async ({
  customerId,
  plan,
}: {
  customerId: string
  plan: string
}) => {
  const response = await axios.post(
    `${APIurl}/payment/subscribe`,
    {
      customerId,
      plan,
    },
    {
      withCredentials: true,
    }
  )
  return response.data.result.data.subscription_code
}

export default function Component() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const { user, fetchUser } = useUserStore()

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const {
    data: plans,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["plans"],
    queryFn: fetchPlans,
  })

  const { mutate: handlePayment, isPending: isProcessingPayment } = useMutation(
    {
      mutationFn: initiatePayment,
      onSuccess: (url) => {
        window.location.href = url // Redirect to Paystack payment page
      },
      onError: (error) => {
        console.error(error)
        console.log(error.cause)
        toast("Error initiating payment")
      },
    }
  )

  const { mutate: handleSubscription, isPending: isProcessingSubscription } =
    useMutation({
      mutationFn: subscribeUser,
      onSuccess: () => {
        toast("Success", {
          description: "You are now subscribed",
        })
        window.location.href = "/dashboard" // Redirect to dashboard
      },
      onError: (error) => {
        console.error(error)
        console.log(error.message)
        toast("Error processing subscription. Please try again.", {
          description: "Subscriptions might already exist",
        })
        window.location.href = "/dashboard"
      },
    })

  if (isLoading)
    return (
      <div className='h-[90vh] flex items-center justify-center'>
        <LoaderPinwheel className='animate-spin' />
      </div>
    )
  if (isError)
    return (
      <div className='h-[90vh] flex items-center justify-center'>
        <p>Error loading plans</p>
      </div>
    )

  const handleSelect = (plan: any) => {
    const amount = plan.amount / 100
    if (user?.customerid) {
      // If customerId exists, subscribe user to the plan
      handleSubscription({
        customerId: user.customerid,
        plan: plan.plan_code,
      })
    } else {
      // If customerId does not exist, initiate payment
      handlePayment({
        email: user?.email as string,
        amount,
        plan: plan.plan_code,
      })
    }
  }

  // Separate the plans into Basic and Premium
  const basicPlan = plans?.find((plan: any) => plan.name === "Basic")
  const premiumPlan = plans?.find((plan: any) => plan.name === "Premium")

  return (
    <div className='h-[90vh] flex flex-col items-center justify-center'>
      <div className=' flex flex-wrap gap-4'>
        {basicPlan && (
          <Card className='max-w-md text-center'>
            <CardHeader>
              <CardTitle className='text-2xl'>{basicPlan.name} Plan</CardTitle>
              <CardDescription>
                Access basic SEO tools to optimize your website.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col items-center space-y-2'>
                <Avatar>
                  <AvatarImage src='/placeholder-basic.jpg' />
                  <AvatarFallback>{basicPlan.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <Badge variant='secondary'>
                  {basicPlan.amount === 0
                    ? "FREE"
                    : `Ksh ${(basicPlan.amount / 100).toFixed(2)}/month`}
                </Badge>
                <p className='text-sm text-center'>
                  {basicPlan.description || "No description available"}
                </p>
                <Button
                  variant='outline'
                  className='w-full'
                  onClick={() => handleSelect(basicPlan)}
                  disabled={isProcessingPayment || isProcessingSubscription}>
                  {isProcessingPayment || isProcessingSubscription
                    ? "Processing..."
                    : "Select"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {premiumPlan && (
          <Card className='max-w-md text-center'>
            <CardHeader>
              <CardTitle className='text-2xl'>
                {premiumPlan.name} Plan
              </CardTitle>
              <CardDescription>
                Enjoy all basic features plus a dedicated SEO worker.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col items-center space-y-2'>
                <Avatar>
                  <AvatarImage src='/placeholder-premium.jpg' />
                  <AvatarFallback>
                    {premiumPlan.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <Badge variant='secondary'>
                  {premiumPlan.amount === 0
                    ? "FREE"
                    : `Ksh ${(premiumPlan.amount / 100).toFixed(2)}/month`}
                </Badge>
                <p className='text-sm text-center'>
                  {premiumPlan.description || "No description available"}
                </p>
                <Button
                  className='w-full bg-blue-900'
                  onClick={() => handleSelect(premiumPlan)}
                  disabled={isProcessingPayment || isProcessingSubscription}>
                  {isProcessingPayment || isProcessingSubscription
                    ? "Processing..."
                    : "Select"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <CardFooter className='text-center flex mt-4'>
        Go back to login?
        <Link href='/auth/login' className='underline ml-1' prefetch={false}>
          Log in
        </Link>
      </CardFooter>
    </div>
  )
}
