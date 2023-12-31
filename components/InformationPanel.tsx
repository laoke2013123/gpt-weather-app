import { MoonIcon, SunIcon } from "@heroicons/react/solid"
import Image from "next/image"
import CityPicker from "./CityPicker"
import weatherCodeToString from "@/lib/weatherCodeToString"

type Props={
    city:string;
    lat:string;
    long:string;
    results:Root;
}



function InformationPanel({city,lat,long,results}:Props) {

  return (
    <div className="bg-gradient-to-br from-[#394F68] to-[#086b72] text-white p-10">
        <div className="pb-5 space-y-2">
            <h1 className="text-6xl font-bold">{decodeURI(city)}</h1>
            <p className="text-xs text-gray-400">
                Lat/Long: {lat}/{long}
            </p>
        </div>

        <CityPicker/>
        <hr className="my-10"/>

        <div className="my-5 flex items-center justify-between space-x-10 ">
            <div>
                <p className="text-xl">
                    {new Date().toLocaleDateString('en-US',{
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                })}
                </p>

                <p className="mt-1 font-extralight">
                    Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
                </p>
            </div>
            <p className="text-xl font-bold uppercase">
                {new Date().toLocaleTimeString('en-US',{
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                })}
            </p>
        </div>

        <hr className="mt-10 mb-5"/>

        <div className="flex items-center justify-between">
            <div>
            <Image
                src={`https://www.weatherbit.io/static/img/icons/${weatherCodeToString[results.current_weather.weathercode].icon}.png`}                
                alt={weatherCodeToString[results.current_weather.weathercode].label}
                width={75}
                height={75}
            />
                <div className="flex items-center justify-between space-x-10">
                    <p className="text-6xl font-semibold">
                       {results.current_weather.temperature.toFixed(1)}°C
                    </p>
                    <p className="text-right font-extralight text-lg">
                        {weatherCodeToString[results.current_weather.weathercode].label}
                    </p>
                </div>
            </div>
        </div>

        <div className="space-y-2 py-5">
            <div className="flex items-center space-x-2 px-4 py-3 border border-white rounded-md bg-[#086b72]">
                <SunIcon className="h-10 w-10 text-gray-400"/>
                
                <div className="flex-1 flex items-center justify-between">
                    <p className="font-semibold">Sunrise</p>
                    <p className=" uppercase text-xl">{new Date(results.daily.sunrise[0]).toLocaleTimeString("en-US", {
                        hour:"numeric",
                        minute:"numeric",
                        hour12:true,
                    })}
                    </p>
                </div>
            </div>

            <div className="flex items-center space-x-2 px-4 py-3 border border-white rounded-md bg-[#086b72]">
                <MoonIcon className="h-10 w-10 text-gray-400"/>
                
                <div className="flex-1 flex items-center justify-between">
                    <p className="font-semibold">Sunset</p>
                    <p className=" uppercase text-xl">{new Date(results.daily.sunset[0]).toLocaleTimeString("en-US", {
                        hour:"numeric",
                        minute:"numeric",
                        hour12:true,
                    })}
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InformationPanel