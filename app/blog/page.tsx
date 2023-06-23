import React from 'react'
import {Metadata} from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog | Next App'
}

async function getData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: {
      revalidate: 60,
    }
  })

  if (!response.ok) throw new Error('Unable to fetch posts!')

  return response.json()
}

const Page = async () => {
  const posts: any = await getData()
  console.log(posts)

  return (
    <>
      <h1>Blog page</h1>
      <ul>
        {posts?.map((post: any) => {
          return (
            <li key={post.id}>
              <Link href={`/blog/${post.id}`}>{post.title}</Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Page
