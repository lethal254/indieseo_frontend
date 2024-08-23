"use client"

import Image from "next/image"
import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import Link from "next/link"

interface CardProps {
  image: string
  name: string
  description: string
  id: string
}

export default function TemplateCard({
  image,
  name,
  description,
  id,
}: CardProps) {
  return (
    <Link href={`/dashboard/edit/${id}`}>
      <Card className='w-full hover:shadow-md transition-all duration-150 cursor-pointer'>
        <CardContent>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
          </CardHeader>
          <AspectRatio ratio={16 / 12} className='bg-muted'>
            <Image
              width={1000}
              height={50}
              src={image}
              alt='Template Image'
              className='w-full h-full overflow-hidden mr-4 object-contain'
            />
          </AspectRatio>
          <CardFooter>
            <CardDescription>
              {description.substring(0, 50) + "..."}
            </CardDescription>
          </CardFooter>
        </CardContent>
      </Card>
    </Link>
  )
}
