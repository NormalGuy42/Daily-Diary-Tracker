'use client';

import Header from '../../components/header';
import '../../globals.css'
import ReturnBtn from '../../components/buttons/returnBtn';
import EmojiBtn from '../../components/buttons/emojiBtn';
import ColorBtn from '../../components/buttons/colorBtn';
import LikeBtn from '../../components/buttons/likeBtn';
import { formatDate} from '../../components/methods/date';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Providers } from '../../providers';
import { AuthProvider } from '../../authprovider';
import { fetchRecord } from '../../api/actions';
import { usePathname } from 'next/navigation';




const RecordPage = ()=>{
    const [isLoading,setIsLoading] = useState(true);
    const router = usePathname();
    const id  = router.split('/')[2];

    let emptyRecord : RecordType = {
        id: 0,
        title:'',
        emoji: '',
        created_at: '',
        color: 0,
        text: '',
        favorite: false,
    }
    const [data,setData] = useState<RecordType>(emptyRecord);
    

    const previousID = useRef<string | null>(null)
    const nextID = useRef<string | null>(null)

    const getData = async()=>{    
        const {data, isError, error} = await fetchRecord(`${id}`)
        
        if(!isError){
            //Remove all the id keys
            setData(data.recordData[0])
            setIsLoading(false)
            let list : Array<string> = []
            data.idList.map((i:any)=>list.push(i.id.toString()))

            const currentIndex = list.indexOf(id)!;

            let prevIndex = currentIndex > 0? currentIndex-1 : list.length-1;
            let nextIndex = currentIndex < list.length-1? currentIndex+1 : 0;
            // Get the IDs for the previous page and the next page
            // setPreviousID(list[prevIndex]); 
            // setNextDayID(list[nextIndex])
            previousID.current = `${list[prevIndex]}`;
            nextID.current = `${list[nextIndex]}`
            
        }else{
            console.log(error)
        }
    }
    const touchStart = useRef<number | null>(null);
    const touchEnd = useRef<number | null>(null);
    const minSwipeDistance = 50;

    //For mobile accessibility
    const onTouchStart = (e: React.TouchEvent)=>{
        touchEnd.current = null;
        touchStart.current = e.targetTouches[0].clientX;
    }
    const onTouchMove = (e: React.TouchEvent)=>{
        touchEnd.current = e.targetTouches[0].clientX;;
    }
    const onTouchEnd = ()=>{
        if(!touchStart.current || !touchEnd.current) return
        const distance = touchStart.current - touchEnd.current;
        const isLeftSwipe =  distance < -minSwipeDistance;
        const isRightSwipe = distance > minSwipeDistance;

        if(isLeftSwipe || isRightSwipe){
            window.location.replace(`${isLeftSwipe? previousID.current : nextID.current}`);
        }

    }

    useEffect(()=>{      
        getData()

        const handleKeyDown = (e:KeyboardEvent)=>{
            if(e.key == "ArrowLeft"){
                window.location.replace(`${previousID.current}`);
            }else if(e.key == "ArrowRight"){
                window.location.replace(`${nextID.current}`);
            }
        }
        document.addEventListener("keydown",handleKeyDown,true)

    },[])


    return(
        <AuthProvider>
            {
                isLoading? 
                    <div></div>
                :
                <div className="w-full min-h-screen record-page" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
                    <Header>
                        <ColorBtn index={data.color}/>
                        <EmojiBtn icon={data.emoji}/>
                        <LikeBtn recordID={data.id} likeStatus={data.favorite}/>
                        <ReturnBtn/>
                    </Header>
                    <h1 className="p-8 text-center text-4xl font-bold">{data.title.replace(/\\/g, '')}</h1>
                    <div className='recordDate'>
                        <span className='font-bold pb-2'>{formatDate(data.created_at)}</span>
                    </div>
                    <p className='recordText'>{data.text.replace(/\\/g, '')}</p>
                </div>
            }
        </AuthProvider>
    )
}


export default RecordPage;