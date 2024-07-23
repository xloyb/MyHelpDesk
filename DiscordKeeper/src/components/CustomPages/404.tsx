import React from 'react'

const NotFoundPage = () => {
  return (
    <>
    <section className="bg-base-100 dark:bg-gray-900">
  <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
    <div>
      <p className="text-sm font-medium text-primary">404 error</p>
      <h1 className="mt-3 text-2xl font-semibold text-neutral-content md:text-3xl">
        We can’t find that page
      </h1>
      <p className="mt-4 text-neutral-content">
        Sorry, the page you are looking for doesn\t exist or has been moved.
      </p>

      <div className="flex items-center mt-6 gap-x-3">
        <button className="btn btn-outline w-1/2 gap-x-2 sm:w-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:rotate-180"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>

          <span>Go back</span>
        </button>

        <button className="btn btn-primary w-1/2 sm:w-auto">
          Take me home
        </button>
      </div>
    </div>
  </div>
</section>

    </>
  )
}

export default NotFoundPage