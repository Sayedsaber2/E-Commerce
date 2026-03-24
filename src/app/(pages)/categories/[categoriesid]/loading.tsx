export default function DetailsLoading() {
    return (
        <div className='container mx-auto pt-24 px-4'>
            <div className='animate-pulse space-y-8'>
                {/* Back button */}
                <div className='h-6 w-40 bg-blue-900/30 rounded-full' />

                {/* Hero skeleton */}
                <div className='bg-blue-950 rounded-3xl p-8 md:p-12'>
                    <div className='flex flex-col md:flex-row items-center gap-8'>
                        <div className='w-48 h-48 md:w-64 md:h-64 bg-blue-900/50 rounded-3xl' />
                        <div className='flex-1 space-y-6 w-full'>
                            <div className='h-12 bg-blue-900/50 rounded-full w-2/3' />
                            <div className='h-6 bg-blue-900/50 rounded-full w-1/2' />
                            <div className='grid grid-cols-3 gap-4'>
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className='bg-blue-900/30 rounded-2xl p-4 space-y-2'>
                                        <div className='w-6 h-6 bg-blue-900/50 rounded-full mx-auto' />
                                        <div className='h-8 bg-blue-900/50 rounded-full' />
                                        <div className='h-3 bg-blue-900/50 rounded-full w-2/3 mx-auto' />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products grid skeleton */}
                <div className='space-y-4'>
                    <div className='h-8 bg-blue-900/30 rounded-full w-56' />
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className='rounded-2xl bg-blue-950 overflow-hidden'>
                                <div className='aspect-square bg-blue-900/50' />
                                <div className='p-4 space-y-3'>
                                    <div className='h-4 bg-blue-900/50 rounded-full w-3/4' />
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
        </div>
    )
}