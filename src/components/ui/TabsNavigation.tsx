import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { API_URL } from '../../lib/config'
import { saveToFirebase } from '../../lib/firebase.config'
import { SubredditType } from '../../lib/types'
import Subreddit from '../Subreddit'



const TabsNavigation = () => {

    const lastPostRef = useRef<HTMLDivElement>(null)
    const { ref, entry } = useIntersection({
        root: lastPostRef.current,
        threshold: 1,
    })
    const [tabIndex, setTabIndex] = useState(0);

    const type = tabIndex === 0 ? 'hot' : tabIndex === 1 ? 'new' : 'rising'

    const {
        data: subreddits,
        isFetched,
        isPending,
        fetchNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ['subredditData', type],
        queryFn: async ({ pageParam = '' }) => {
            const data = await axios(`${API_URL}/r/FlutterDev/${type}.json`, {
                params: {
                    after: pageParam
                }

            })
            data?.data?.data.children.map(({ data: subreddit }: { data: SubredditType }) => {
                saveToFirebase(subreddit);
            }
            )
            return data
        },
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage) => {
            if (lastPage?.data?.data?.after) {
                return lastPage.data.data.after
            }
            return undefined
        },
        initialPageParam: ''
    })

    useEffect(() => {
        if (entry?.isIntersecting) {
            fetchNextPage()
        }
    }, [entry, fetchNextPage])


    return <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} selectedTabClassName='border-b-4 border-[#4E4CEC] transition  text-black focus:outline-none ' className={'bg-[#F6F6F6] flex-grow '} >
        <TabList className={'bg-white text-gray-500 flex justify-between text-3xl text-center  '}>
            <Tab className={'py-8 px-6 cursor-pointer w-full'}>Hot</Tab>
            <Tab className={'py-8 px-6 cursor-pointer w-full'}>New</Tab>
            <Tab className={'py-8 px-6 cursor-pointer w-full'}>Rising</Tab>
        </TabList>

        {Array.from({ length: 3 }).map((_, index) => (
            <TabPanel key={index} data-testid={`tabs-navigation${index}`} >
                {isPending ? <div data-testid="loading-spinner" className="flex justify-center items-center flex-grow h-[70vh]"><Loader2 className='w-6 h-6 text-zinc-500 animate-spin' /></div>
                    :
                    <div className="grid grid-cols-4 gap-y-6 gap-x-8 pt-4 px-8 cursor-pointer pb-8">
                        {isFetched && subreddits?.pages?.map((page, pageIndex) => (
                            <Fragment key={pageIndex}>
                                {page?.data?.data?.children?.map(({ data: subreddit }: { data: SubredditType }, index: number) => {
                                    if (index === page?.data?.data?.children.length - 1) {
                                        return <div id={`subreddit#${subreddit.id}`} key={subreddit.id} ref={ref}>
                                            <Subreddit subreddit={subreddit} key={subreddit.id} />
                                        </div>
                                    }
                                    return <Subreddit subreddit={subreddit} key={subreddit.id} />
                                }
                                )}
                            </Fragment>
                        ))}
                        {isFetchingNextPage && (
                            <div data-testid="loading-spinner-2" className='flex justify-center items-center'>
                                <Loader2 className='w-6 h-6 text-zinc-500 animate-spin' />
                            </div>
                        )}
                    </div>
                }
            </TabPanel>
        ))}
    </Tabs>
}

export default TabsNavigation