// TabsNavigation.jsx
import { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import SubredditList from '../SubredditList';

const TabsNavigation = () => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} selectedTabClassName='border-b-4 border-[#4E4CEC] transition  text-black focus:outline-none ' className={'bg-[#F6F6F6] flex-grow '}>
            <TabList className={'bg-white text-gray-500 flex justify-between 2xl:text-3xl xl:text-2xl lg:text-xl md:text-lg text-center  '}>
                <Tab className={'2xl:py-8 xl:py-6 md:py-4 py-2 px-6 cursor-pointer w-full'}>Hot</Tab>
                <Tab className={'2xl:py-8 xl:py-6 md:py-4 py-2 px-6 cursor-pointer w-full'}>New</Tab>
                <Tab className={'2xl:py-8 xl:py-6 md:py-4 py-2 px-6 cursor-pointer w-full'}>Rising</Tab>
            </TabList>

            <TabPanel>
                <SubredditList type="hot" />
            </TabPanel>
            <TabPanel>
                <SubredditList type="new" />
            </TabPanel>
            <TabPanel>
                <SubredditList type="rising" />
            </TabPanel>
        </Tabs>
    );
};

export default TabsNavigation;
