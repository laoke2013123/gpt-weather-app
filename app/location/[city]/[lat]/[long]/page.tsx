import React from 'react'
import { getClient } from '@/apollo-client'
import fetchWeatherQuery from '@/graphql/queries/fetchWeatherQueries';
import CalloutCard from '@/components/CalloutCard';
import StatCard from '@/components/StatCard';
import DividerLine from '@/components/DividerLine'; 
import InformationPanel from '@/components/InformationPanel';
import TempChart from '@/components/TempChart';
import RainChart from '@/components/RainChart';
import HumidityChart from '@/components/HumidityChart';
import cleanData from '@/lib/cleanData';
import getBasePath from '@/lib/getBasePath';


export const revalidate = 60;

type Props={
    params:{
        city:string;
        lat:string;
        long:string;
    }
}

async function WeatherPage({params:{city,lat,long}}:Props) {
  
  const client = getClient();

  const {data}  = await client.query(
    {
      query: fetchWeatherQuery,
      variables:{
        current_weather:"true",
        longitude: long,
        latitude: lat,
        timezone: 'GMT'
      }
    }
  )

  const results: Root = data.myQuery;

  const dataToSend = cleanData(results,city);

  const res = await fetch(`${getBasePath()}/api/getWeatherSummary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      weatherData: dataToSend,
    }),
  });
  const GPTData = await res.json();

  const { content } = GPTData;

    console.log(results);
  return (

    <div className=' flex flex-col min-h-screen md:flex-row'>
      
      <InformationPanel city={city} lat={lat} long={long} results={results}/>


      <div className='flex-1 p-5 lg:p-10'>
        <div className='p-5'>
          <div className='pb-5'>
            <h2 className='text-xl font-bold'>Today's Overview</h2>
            <p className='text-s, text-gray-400'>
              Last Updated at:{" "}
              {new Date(results.current_weather.time).toLocaleString('en-US',{
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour:'numeric',
                            minute:'numeric',
                            hour12:true,
                })}({results.timezone})
            </p>
          </div>


          <div className='m-2 mb-10'>
            <CalloutCard
              message = {content}
            />
          </div>

          <div className='grid grid-cols-1 xl:grid-cols-2 gap-5 m-2'>
            <StatCard title='Highest Temperature'
                      metric={`${results.daily.temperature_2m_max[0].toFixed(1)}°`}   
                      color='orange'             
            />
            <StatCard title='Lowest Temperature'
                      metric={`${results.daily.temperature_2m_min[0].toFixed(1)}°`}   
                      color='blue'             
            />

            <div>
              <StatCard title='UV Index'
                        metric={results.daily.uv_index_max[0].toFixed(1)}   
                        color='rose'             
            />
              {Number(results.daily.uv_index_max[0].toFixed(1))> 5 && (
              <CalloutCard
                message='The UV is high today, be ready to wear SPF!'
                warning
              />
            )}
            </div>
            
            <div className='flex space-x-3'>
              <StatCard
                title= "Wind Speed"
                metric={`${results.current_weather.windspeed.toFixed(1)} m/s`}
                color='cyan'
              />

              <StatCard
                title= "Wind Direction"
                metric={`${results.current_weather.winddirection.toFixed(1)}°`}
                color='emerald'
              />

            </div>
          </div>
        </div>

        <DividerLine/>
        
        <div className='space-y-3'>
                <TempChart results={results}/>
                <RainChart results={results}/>
                <HumidityChart
                  results={results}
                />
        </div>
      </div>
    </div>
  )
}

export default WeatherPage