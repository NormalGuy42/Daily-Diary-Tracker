import '../app/globals.css'
import Header from '@/app/components/header';
import ReturnBtn from '@/app/components/buttons/returnBtn';
import { useEffect, useState } from 'react';
import { formatDate } from '@/app/components/methods/date';
import Link from 'next/link';
import { getEmotionLayout } from '@/app/components/methods/methods';
import { Providers } from '@/app/providers';
import { AuthProvider } from '@/app/authprovider';

function TrackingSquare(props:{recordData:RecordType,index:number}){
    let data = props.recordData;
    let index = props.index
    const colors = ['red','orange','yellow','light-green','green'];

    return(
        <Link href={"library/"+data.id} key={index} className='block h-full'>
            <div className={"h-4 w-4 border border-black square cursor-pointer group "+colors[data.color]}>
                <div className='tooltip group-hover:scale-100'>
                    <span>{formatDate(data.created_at)}</span>
                    <span>{data.emoji}</span>
                </div>
            </div>
        </Link>
    )

}

function TrackingLayout(props:{data:EmotionLayoutData,key:number}){
    let data = props.data;
    return(
        <div className='pb-8'>
            <h2 className="text-2xl font-bold grid big-emotion-grid lg:px-10">{data.year}</h2>
            <div className='grid big-emotion-grid'>
                {
                    data.records.map((e:RecordType,index)=>(<TrackingSquare recordData={e} index={index} key={index}/>))
                }
            </div>
        </div>
    )
}
function EmptyTracking(){
    return(
        <div className='grid big-emotion-grid'>
            {
                [...Array(365)].map((e,index)=>(
                <div key={index} className='h-4 w-4 bg-slate-300 border border-black square cursor-pointer'>
                </div>
                ))
            }
        </div>
    )
}
export default function TrackingPage(){
    let [data,setData] = useState<Array<EmotionLayoutData>>([]);
    
    useEffect(()=>{
        //Get data from api
        fetch("https://m1000.me/diary/api/api-diary.php",{
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${process.env.API_KEY}`,
            }
        }
        
        )
        .then((res)=>res.json())
        .then((data)=>{
            let fetch: Array<RecordType> = data
            setData(getEmotionLayout(fetch))
        });
      },[]);

    return(
        <Providers>
            <AuthProvider>
                <div className="w-full min-h-screen">
                    <Header>
                        <ReturnBtn/>
                    </Header>
                    <h1 className="title">Emotion tracking</h1>
                        {
                            data.length == 0?
                            <EmptyTracking />
                            :
                            data.map((e,index)=><TrackingLayout data={e} key={index}/>)
                        }
                </div>
            </AuthProvider>
        </Providers>
    )
}