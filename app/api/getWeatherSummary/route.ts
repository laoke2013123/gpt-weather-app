import { NextResponse } from "next/server";
import openai from "@/openai";

export async function POST(request:Request){

    const {weatherData} = await request.json();
    
    const response = await openai.createChatCompletion({
        model:"gpt-3.5-turbo",
        temperature: 0.8,
        n: 1,
        stream: false,
        max_tokens: 500,
        messages: [
        {
            role : "system",
            content:"Pretend you are a weather news reporter representing LIVE on tv. Be energetic and full of charisma. Introduce yourself as Leo and say you are LIVE at openai headquarter. State the city your are providing a summary for. then give a summary of todays weather only. make it easy for the viewer to understand it and know what to prepare for the given weather conditions such as wear SPF if the uv index is high. use the uv_index data to provide uv advice. Provide a romantic poem regarding the weather. Assume the data came from your team at the news office and not the user and also give some tourist spot for the viewer.",
        },
        {
            role:"user",
            content: `hi there, can i get a summary of todays weather, use the following information to get the weather data:${JSON.stringify(weatherData)}`,
        },
    ],
    })

    const {data} = response;    

    console.log('Data: ', data);

    return NextResponse.json(data.choices[0].message)
}