import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className='bg-white dark:bg-gray-900 w-full border-b border-gray-400 dark:border-gray-800 h-[10vh] flex items-center justify-between'>
          <h1 className="font-semibold ml-[5%] from-neutral-600 text-lg">Logo</h1>
          <Link href='/login' className='mr-[5%] text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800'>Login</Link>
      </div>
      <div className='w-full h-screen bg-gray-200 flex justify-center items-center'>
        <h1 className='font-semibold text-3xl'>Welcome to E-Commerce.</h1>
      </div>
    </main>
  );
}
