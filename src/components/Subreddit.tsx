import { FC } from 'react'
import { SubredditType } from '../lib/types'

interface SubredditProps {
    subreddit: SubredditType
}

const Subreddit: FC<SubredditProps> = ({ subreddit }) => {
    return <div className=" flex flex-col p-4 gap-4 w-[440px] h-[300px] overflow-hidden border rounded-[15px] shadow-lg bg-white text-black hover:scale-105 hover:bg-gray-300 group hover:text-black transition" key={subreddit.id} onClick={() => {
        window.open(subreddit.url, "_blank")
    }}>
        <h2 className="text-2xl font-semibold font-sans group-hover:text-black ">{subreddit.title}</h2>
        <div className="flex flex-col gap-2">
            <p className="line-clamp-5 text-[18px] text-gray-600 font-sans group-hover:text-black">{subreddit.selftext}</p>
        </div>
    </div>
}

export default Subreddit