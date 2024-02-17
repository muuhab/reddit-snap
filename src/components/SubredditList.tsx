import { useRef, Fragment, FC, useEffect } from 'react';
import { useIntersection } from '@mantine/hooks';
import { Loader2 } from 'lucide-react';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../lib/config';
import { saveToFirebase } from '../lib/firebase.config';
import { SubredditType } from '../lib/types';
import Subreddit from './Subreddit';


interface SubredditProps {
    type: "hot" | "new" | "rising";
}

const SubredditList: FC<SubredditProps> = ({ type }) => {
    const lastPostRef = useRef(null);
    const { ref, entry } = useIntersection({
        root: lastPostRef.current,
        threshold: 1,
    });

    const {
        data: subreddits,
        isFetched,
        isPending,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['subredditData', type],
        queryFn: async ({ pageParam = '' }) => {
            const data = await axios(`${API_URL}/r/FlutterDev/${type}.json`, {
                params: {
                    after: pageParam,
                },
            });

            data?.data?.data.children.map(({ data: subreddit }: { data: SubredditType }) => {
                saveToFirebase(subreddit);
            });

            return data;
        },
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage) => {
            if (lastPage?.data?.data?.after) {
                return lastPage.data.data.after;
            }
            return undefined;
        },
        initialPageParam: '',
    });

    useEffect(() => {
        if (entry?.isIntersecting) {
            fetchNextPage();
        }
    }, [entry, fetchNextPage]);

    return (
        <div>
            {isPending ? (
                <div data-testid="loading-spinner" className="flex justify-center items-center flex-grow h-[70vh]">
                    <Loader2 className='w-6 h-6 text-zinc-500 animate-spin' />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-6 gap-x-8 pt-4 px-8 cursor-pointer pb-8">
                    {isFetched &&
                        subreddits?.pages?.map((page, pageIndex) => (
                            <Fragment key={pageIndex}>
                                {page?.data?.data?.children?.map(({ data: subreddit }: { data: SubredditType }, index: number) => {
                                    if (index === page?.data?.data?.children.length - 1) {
                                        return (
                                            <div id={`subreddit#${subreddit.id}`} key={subreddit.id} ref={ref}>
                                                <Subreddit subreddit={subreddit} key={subreddit.id} />
                                            </div>
                                        );
                                    }
                                    return <Subreddit subreddit={subreddit} key={subreddit.id} />;
                                })}
                            </Fragment>
                        ))}
                    {isFetchingNextPage && (
                        <div data-testid="loading-spinner-2" className='flex justify-center items-center'>
                            <Loader2 className='w-6 h-6 text-zinc-500 animate-spin' />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SubredditList;
