'use client'
import { Card,AreaChart, Title } from "@tremor/react"

type Props={
    results: Root;
}

function rainchart({results}:Props) {

    const hourly = results?.hourly.time.map((time) => new Date(time).toLocaleString('en-US', {
        hour:'numeric',
        hour12: false,
    })
    ).slice(0,24);

    const data = hourly.map((hour,index)=>({
        time: Number(hour),
        "Rain (%)": results.hourly.precipitation_probability[index],
    }))

    const dataFormatter = (number: number) =>`${number}%`

  return (
    <Card>
        <Title>Chances of Rain</Title>
        <AreaChart
        className="mt-6"
        data= {data}
        showLegend
        index="time"
        categories={["Rain (%)"]}
        colors={["blue"]}
        minValue={0}
        maxValue={100}
        valueFormatter={dataFormatter}
        yAxisWidth={100}
        />
    </Card>
  )
}

export default rainchart