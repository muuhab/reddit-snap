import { FC } from 'react'
import { SubredditType } from '../lib/types'
import Tilt from "react-parallax-tilt"

interface SubredditProps {
    subreddit: SubredditType
}

const Subreddit: FC<SubredditProps> = ({ subreddit }) => {
    return <Tilt
        tiltMaxAngleX={45}
        scale={1}
        transitionSpeed={450}
    ><div className=" flex flex-col p-4 gap-4 2xl:w-[440px] 2xl:h-[300px] xl:w-[330px] xl:h-[290px] lg:w-[300px] md:h-[270px] md:w-[330px]  h-[230px] w-full overflow-hidden border rounded-[15px] shadow-lg bg-white text-black  hover:bg-gray-300 group hover:text-black transition" key={subreddit.id} onClick={() => {
        window.open(subreddit.url, "_blank")
    }}>
            <h2 className="2xl:text-2xl xl:text-xl text-[18px] font-semibold font-sans group-hover:text-black ">{subreddit.title}</h2>
            <div className="flex flex-col gap-2">
                <p className="2xl:line-clamp-5 line-clamp-4  2xl:text-[18px] xl:text-[16px] text-[14px] text-gray-600 font-sans group-hover:text-black">{subreddit.selftext}</p>
            </div>
        </div>
    </Tilt>
}

export default Subreddit