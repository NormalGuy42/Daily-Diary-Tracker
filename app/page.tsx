"use client";

import Link from 'next/link';
import Header from './components/header';
import { useEffect, useState } from 'react';
import { SettingsBtn } from './components/buttons/settingsBtn';
import { Providers } from './providers';
import { parseCookies, destroyCookie } from 'nookies';
import { AuthProvider } from './authprovider';
import StatusMessage from '@/app/components/statusMessage';

function Box(props:{item: React.ReactElement,page: string,}){
  
  return(
      <Link href={"/"+props.page}>
          <div className='record-box max-h-300 max-w-280'>
            <div className='record-inner-box component-bg flex items-center justify-center rounded-md p-4 border border-black'>
              {props.item}
            </div>
          </div>
      </Link>
      
  );
}

function Home() {
  const [data,setData] = useState<Array<RecordType>>([]);
  const [greeting,setGreeting] = useState('');
  const [error,setError] = useState(false);
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  //Get the last recordID
  const [previousDayID,setPreviousDayID] = useState('');
  
  const greetings = [
    {'messages': ["Good morning boss!","Hello there", "Good morning", "Nice day ahead", "Looking good","Greetings!"],'interval':[0,12]},
      
    {'messages':["Hey there", "Good afternoon","Hope you having a nice day","Looking nice","Welcome", "You call your parents?"], 'interval':[13,18]},
      
    {'messages':["Nice night", "Have sweet dreams", "Great day", "Tomorrow will look great", "Goodnight", "Still looking good!"],'interval':[19,23]},
  ]

  useEffect(()=>{
    //Check if user logged in
    
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
      //Prepare information
      setData(data);
      setGreeting(getGreeting());

      //Get latest ID for previous record
      let recordList: Array<RecordType> = data;
      let index = recordList.length - 1;
      setPreviousDayID(recordList[index].id.toString())

      // Retrieve flash message cookie
      const { flashMessage: message } = parseCookies();
      if (message) {
        // Display flash message
        setFlashMessage(message);
        // Clear flash message after 3 seconds
        setTimeout(() => {
          destroyCookie(null, 'flashMessage');
          setFlashMessage(null);
        }, 2000);
      }
    });

    
  },[]);
  
  function getGreeting():string{
    // let yesterday = new Date().now()-1
    let today = new Date().getHours();
    let start_interval;
    let end_interval;
    let greeting;

    for(var i= 0;i<greetings.length;i++){
      start_interval = greetings[i]['interval'][0];
      end_interval = greetings[i]['interval'][1];
      
      //Get a random message depending on the time
      if(start_interval<= today && today <= end_interval){
        greeting = greetings[i]['messages'][Math.floor(Math.random()*greetings.length)];
        return greeting;
      }
    }
    return '';
  }
  

  const EmotionTrackingIcon = (props:{list:Array<RecordType>})=>{
    
    const colors = ['red','orange','yellow','light-green','green'];
    
    return(
      <div className='grid emotion-grid'>
        {
          props.list.length == 0?
          [...Array(365)].map((e,index)=>(
            <div key={index} className='h-2 w-2 bg-slate-300 border border-black'>
            </div>
          ))
          :
          props.list.map((e,index)=>(
            <div key={index} className={"h-2 w-2 border border-black "+colors[e.color]}>
            </div>
          ))
        }
      </div>
    );
  }
  
  const FavoriteIcon = ()=>{
    return(
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill='red' height={250} width={250}>
          <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
        </svg>
      </div>
    )
  }
  const LibraryIcon = ()=>{

    return(
      <div className='grid grid-cols-2'>
        {[...Array(4)].map((e,index)=>(

          <div key={index}>
            
            <svg className='svg-scheme' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 128 128">
                <path d="M 24 1 C 16.8 1 11 6.8 11 14 L 11 91 C 11 92.7 12.3 94 14 94 C 15.7 94 17 92.7 17 91 L 17 14 C 17 10.1 20.1 7 24 7 L 103 7 C 101.7 9 101 11.4 101 14 L 101 114 C 101 117.9 97.9 121 94 121 C 90.1 121 87 117.9 87 114 L 87 104 C 87 102.3 85.7 101 84 101 L 4 101 C 2.3 101 1 102.3 1 104 L 1 114 C 1 121.2 6.8 127 14 127 L 94 127 C 101.2 127 107 121.2 107 114 L 107 14 C 107 10.1 110.1 7 114 7 C 117.9 7 121 10.1 121 14 L 121 21 L 114 21 C 112.3 21 111 22.3 111 24 C 111 25.7 112.3 27 114 27 L 124 27 C 125.7 27 127 25.7 127 24 L 127 14 C 127 6.8 121.2 1 114 1 L 24 1 z M 47 21 C 45.3 21 44 22.3 44 24 C 44 25.7 45.3 27 47 27 L 71 27 C 72.7 27 74 25.7 74 24 C 74 22.3 72.7 21 71 21 L 47 21 z M 34 51 C 32.3 51 31 52.3 31 54 C 31 55.7 32.3 57 34 57 L 84 57 C 85.7 57 87 55.7 87 54 C 87 52.3 85.7 51 84 51 L 34 51 z M 34.199219 66 C 32.499219 66 31.199219 67.3 31.199219 69 C 31.199219 70.7 32.499219 72 34.199219 72 L 69.199219 72 C 70.899219 72 72.199219 70.7 72.199219 69 C 72.199219 67.3 70.899219 66 69.199219 66 L 34.199219 66 z M 84 66 A 3 3 0 0 0 81 69 A 3 3 0 0 0 84 72 A 3 3 0 0 0 87 69 A 3 3 0 0 0 84 66 z M 7 107 L 81 107 L 81 114 C 81 116.6 81.8 119 83 121 L 14 121 C 10.1 121 7 117.9 7 114 L 7 107 z"></path>
            </svg>
          </div>

        ))}    
      </div>
    )
  }
  
  const PreviousDayIcon = (props:{list:Array<RecordType>})=>{
    let index;
    let lastEmoji;
    let length = props.list.length;

    if(length >0){
      index = length-1;
      lastEmoji = props.list[index].emoji;
    }
    
    return(
      length > 0?
          <div>
            <span className='giantEmoji'>{lastEmoji}</span>
          </div>
      :
        <div>
        </div>
    )
  }
  
  return (
    <Providers>
      <AuthProvider>
      <div>
        <Header>
          <SettingsBtn/>
        </Header>
        
        {flashMessage && <StatusMessage status={true} message={flashMessage}/>}

        <h1 className="title">{greeting}</h1>
        <div className="grid justify-items-center p-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 ">
            <Box item={<EmotionTrackingIcon list={data} />} page="trackingPage" />
            <Box item={<FavoriteIcon/>} page="favorites"/>
            <Box item={<PreviousDayIcon list={data}/>} page={"library/"+previousDayID}/>
            <Box item={<LibraryIcon/>} page="library"/>
        </div>
      </div>
      </AuthProvider>
    </Providers>
  )
}
export default Home;

