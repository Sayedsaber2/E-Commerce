// app/product/[productid]/loading.tsx

export default function DetailsLoading() {
  return (
    <div className='h-screen container mx-auto pt-16 px-4 py-10'>
      <div className='animate-pulse space-y-8'>
        {/* Back button skeleton */}
        <div className='h-6 w-36 bg-blue-900/30 rounded-full' />

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Slider skeleton */}
          <div className='rounded-2xl overflow-hidden bg-blue-950'>
            <div className='aspect-square bg-blue-900/50' />
          </div>

          {/* Info skeleton */}
          <div className='bg-blue-950 rounded-2xl p-6 lg:col-span-2 space-y-5'>
            <div className='h-8 bg-blue-900/50 rounded-full w-3/4' />
            <div className='flex gap-3'>
              <div className='h-6 bg-blue-900/50 rounded-full w-24' />
              <div className='h-6 bg-blue-900/50 rounded-full w-20' />
            </div>
            <div className='h-10 w-36 bg-blue-900/50 rounded-full' />
            <div className='space-y-2'>
              <div className='h-4 bg-blue-900/50 rounded-full w-full' />
              <div className='h-4 bg-blue-900/50 rounded-full w-full' />
              <div className='h-4 bg-blue-900/50 rounded-full w-3/4' />
            </div>
            <div className='flex gap-4'>
              <div className='h-11 bg-blue-900/50 rounded-xl flex-1' />
              <div className='h-11 w-11 bg-blue-900/50 rounded-xl' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}