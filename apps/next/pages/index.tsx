import { HomeScreen } from 'app/features/home/myscreen'
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <HomeScreen />
    </>
  )
}
