import TabsNavigation from './components/ui/TabsNavigation'

function App() {


  return (
    <>
      <div className="flex flex-col bg-white  h-screen">
        <div className="w-full  py-4 px-8   border-b">
          <h1 className="text-[32px] text-black font-bold">
            /r/FlutterDev
          </h1>
        </div>

        <TabsNavigation />
      </div>

    </>
  )
}

export default App
