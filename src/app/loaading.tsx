// app/loading.tsx

export default function Loading() {
  return (
    <div className='container mx-auto pt-24 px-6 md:px-0'>
      <div className='animate-pulse space-y-8'>
        {/* Header Skeleton */}
        <div className='space-y-3 text-center'>
          <div className='h-10 bg-blue-900/30 rounded-full w-64 mx-auto' />
          <div className='h-5 bg-blue-900/20 rounded-full w-48 mx-auto' />
        </div>

        {/* Grid Skeleton */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {[...Array(8)].map((_, i) => (
            <div key={i} className='rounded-2xl bg-blue-950 overflow-hidden'>
              <div className='aspect-square bg-blue-900/50' />
              <div className='p-4 space-y-3'>
                <div className='h-4 bg-blue-900/50 rounded-full w-3/4' />
                <div className='flex justify-between'>
                  <div className='h-3 bg-blue-900/50 rounded-full w-1/3' />
                  <div className='h-3 bg-blue-900/50 rounded-full w-1/4' />
                </div>
                <div className='h-6 bg-blue-900/50 rounded-full w-1/3' />
              </div>
              <div className='px-4 pb-4'>
                <div className='h-10 bg-blue-900/50 rounded-xl' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}