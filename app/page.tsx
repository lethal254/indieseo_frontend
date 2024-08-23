"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CheckIcon, SearchIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Component() {
  const [selectedPlan, setSelectedPlan] = useState("starter")

  return (
    <div className='flex flex-col min-h-[100dvh]'>
      <header className='px-4 lg:px-6 h-14 flex items-center sticky top-0 bg-gray-950 z-50 '>
        <Link className='flex items-center justify-center' href='#'>
          <Image src='/icon.svg' alt='logo' width={50} height={50} />
          <span className='ml-2 text-xl font-bold text-gray-200'>IndieSEO</span>
        </Link>
        <nav className='ml-auto flex items-center gap-4 sm:gap-6'>
          <Link
            className='text-sm font-medium text-gray-300 hover:text-white transition-colors'
            href='#pricing'>
            Pricing
          </Link>
          <Link href='/dashboard'>
            <Button
              className='bg-white text-gray-950 hover:bg-gray-200'
              size='sm'>
              Get Started
            </Button>
          </Link>
        </nav>
      </header>
      <main className='flex-1'>
        <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-950 text-gray-50'>
          <div className='container px-4 md:px-6'>
            <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
              <div className='flex flex-col justify-center space-y-4'>
                <div className='space-y-2'>
                  <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
                    Boost Your Website SEO Performance
                  </h1>
                  <p className='max-w-[600px] text-gray-400 md:text-xl'>
                    Comprehensive tools to improve your search rankings and
                    drive organic traffic.
                  </p>
                </div>
                <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                  <Button
                    className='bg-white text-gray-950 hover:bg-gray-200'
                    size='lg'>
                    Start Free Trial
                  </Button>
                  <Button
                    variant='outline'
                    size='lg'
                    className='border-gray-700 text-gray-300 hover:bg-gray-800'>
                    Learn More
                  </Button>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                {/* <Image
                  alt='SEO Mastery Dashboard'
                  className='aspect-video rounded-xl object-cover object-center'
                  height='300'
                  src='/dashboard.png'
                  width='600'
                /> */}
              </div>
            </div>
          </div>
        </section>
        <section id='pricing' className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 '>
              Choose Your Plan
            </h2>
            <div className='grid gap-6 lg:grid-cols-3 lg:gap-8'>
              <Card
                className={`flex flex-col ${
                  selectedPlan === "starter"
                    ? "border-gray-900"
                    : "border-gray-200"
                }`}>
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <CardDescription>
                    For individuals and small websites
                  </CardDescription>
                </CardHeader>
                <CardContent className='flex-grow'>
                  <p className='text-3xl font-bold'>
                    $29
                    <span className='text-lg font-normal text-gray-500'>
                      /month
                    </span>
                  </p>
                  <ul className='mt-4 space-y-2 flex-grow'>
                    <li className='flex items-center'>
                      <CheckIcon className='mr-2 h-4 w-4 text-green-500' />
                      Basic keyword research
                    </li>
                    <li className='flex items-center'>
                      <CheckIcon className='mr-2 h-4 w-4 text-green-500' />
                      Site audit
                    </li>
                    <li className='flex items-center'>
                      <CheckIcon className='mr-2 h-4 w-4 text-green-500' />
                      Weekly reports
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className='w-full'
                    onClick={() => setSelectedPlan("starter")}>
                    Choose Starter
                  </Button>
                </CardFooter>
              </Card>
              <Card
                className={`flex flex-col ${
                  selectedPlan === "pro" ? "border-gray-900" : "border-gray-200"
                }`}>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For growing businesses</CardDescription>
                </CardHeader>
                <CardContent className='flex-grow'>
                  <p className='text-3xl font-bold'>
                    $79
                    <span className='text-lg font-normal text-gray-500'>
                      /month
                    </span>
                  </p>
                  <ul className='mt-4 space-y-2 flex-grow'>
                    <li className='flex items-center'>
                      <CheckIcon className='mr-2 h-4 w-4 text-green-500' />
                      Advanced keyword research
                    </li>
                    <li className='flex items-center'>
                      <CheckIcon className='mr-2 h-4 w-4 text-green-500' />
                      Competitor analysis
                    </li>
                    <li className='flex items-center'>
                      <CheckIcon className='mr-2 h-4 w-4 text-green-500' />
                      Daily reports
                    </li>
                    <li className='flex items-center'>
                      <CheckIcon className='mr-2 h-4 w-4 text-green-500' />
                      Content optimization
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className='w-full'
                    onClick={() => setSelectedPlan("pro")}>
                    Choose Pro
                  </Button>
                </CardFooter>
              </Card>
              <Card
                className={`flex flex-col ${
                  selectedPlan === "enterprise"
                    ? "border-gray-900"
                    : "border-gray-200"
                }`}>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>For large-scale operations</CardDescription>
                </CardHeader>
                <CardContent className='flex-grow'>
                  <p className='text-3xl font-bold'>
                    $199
                    <span className='text-lg font-normal text-gray-500'>
                      /month
                    </span>
                  </p>
                  <ul className='mt-4 space-y-2 flex-grow'>
                    <li className='flex items-center'>
                      <CheckIcon className='mr-2 h-4 w-4 text-green-500' />
                      All Pro features
                    </li>
                    <li className='flex items-center'>
                      <CheckIcon className='mr-2 h-4 w-4 text-green-500' />
                      API access
                    </li>
                    <li className='flex items-center'>
                      <CheckIcon className='mr-2 h-4 w-4 text-green-500' />
                      Dedicated account manager
                    </li>
                    <li className='flex items-center'>
                      <CheckIcon className='mr-2 h-4 w-4 text-green-500' />
                      Custom reporting
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className='w-full'
                    onClick={() => setSelectedPlan("enterprise")}>
                    Choose Enterprise
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t'>
        <p className='text-xs text-gray-500'>
          © 2024 SEO Mastery. All rights reserved.
        </p>
        <nav className='sm:ml-auto flex gap-4 sm:gap-6'>
          <Link
            className='text-xs hover:underline underline-offset-4 text-gray-500'
            href='#'>
            Terms of Service
          </Link>
          <Link
            className='text-xs hover:underline underline-offset-4 text-gray-500'
            href='#'>
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
