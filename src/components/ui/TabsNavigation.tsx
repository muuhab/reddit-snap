import { Fragment, useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import Subreddit from '../Subreddit'



const TabsNavigation = () => {

    const [tabIndex, setTabIndex] = useState(0);


    return <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} selectedTabClassName='border-b-4 border-[#4E4CEC] transition  text-black focus:outline-none ' className={'bg-[#F6F6F6] flex-grow '} >
        <TabList className={'bg-white text-gray-500 flex justify-between text-3xl text-center  '}>
            <Tab className={'py-8 px-6 cursor-pointer w-full'}>Hot</Tab>
            <Tab className={'py-8 px-6 cursor-pointer w-full'}>New</Tab>
            <Tab className={'py-8 px-6 cursor-pointer w-full'}>Rising</Tab>
        </TabList>

        <TabPanel  >

            <div className="grid grid-cols-4 gap-y-6 gap-x-8 pt-4 px-8 cursor-pointer pb-8">

                <Fragment >
                    <Subreddit subreddit={{
                        id: '1',
                        title: 'Subreddit 1',
                        selftext: "This is a subreddit post",
                        url: "string",
                        name: "string"
                    }} />
                </Fragment>


            </div>
        </TabPanel>
        <TabPanel  >

            <div className="grid grid-cols-4 gap-y-6 gap-x-8 pt-4 px-8 cursor-pointer pb-8">

                <Fragment >
                    <Subreddit subreddit={{
                        id: '1',
                        title: 'Subreddit 1',
                        selftext: "This is a subreddit post",
                        url: "string",
                        name: "string"
                    }} />
                </Fragment>


            </div>
        </TabPanel>
        <TabPanel  >

            <div className="grid grid-cols-4 gap-y-6 gap-x-8 pt-4 px-8 cursor-pointer pb-8">

                <Fragment >
                    <Subreddit subreddit={{
                        id: '1',
                        title: 'Subreddit 1',
                        selftext: "This is a subreddit post",
                        url: "string",
                        name: "string"
                    }} />
                </Fragment>


            </div>
        </TabPanel>
    </Tabs>
}

export default TabsNavigation