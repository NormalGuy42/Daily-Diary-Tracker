import Header from '@/app/components/header';
import '../../app/globals.css'
import ReturnBtn from '@/app/components/buttons/returnBtn';
import { GetServerSideProps } from 'next';
import EmojiBtn from '@/app/components/buttons/emojiBtn';
import ColorBtn from '@/app/components/buttons/colorBtn';
import LikeBtn from '@/app/components/buttons/likeBtn';
import { formatDate} from '@/app/components/methods/date';
import { useEffect } from 'react';
import { Providers } from '@/app/providers';
import { AuthProvider } from '@/app/authprovider';

interface RecordProps{
    record: [RecordType];
    idList: Array<string>;
}

export const getServerSideProps:GetServerSideProps = async (context)=>{
    const id = context.params!.recordID;

    const res = await fetch("https://m1000.me/diary/api/diary-data.php?id=" + id,{
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${process.env.API_KEY}`,
        }
    });
    const data = await res.json();
    //Remove all the id keys 
    let list : Array<number> = []
    data.idList.map((i:any)=>list.push(i.id.toString()))

    return{
        props: {
            record: data.recordData,
            idList: list
        }
    }
}

const RecordPage = (record: RecordProps)=>{
    useEffect(()=>{
        document.addEventListener("keydown",handleKeyDown,true)
    },[])
    const data = record.record[0];
    const recordDate = formatDate(data.created_at); 
    const text = data.text.replace(/\\/g, '');
    const title = data.title.replace(/\\/g, '');
    
    //Get ID list
    const idList: Array<string> = record.idList;
    const currentIndex = idList.indexOf(data.id.toString())!;

    let prevIndex = currentIndex > 0? currentIndex-1 : idList.length-1;
    let nextIndex = currentIndex < idList.length? currentIndex+1 : 0;
    // Get the IDs for the previous page and the next page
    const previousID = idList[prevIndex]; 
    const nextID = idList[nextIndex];

    const handleKeyDown = (e:KeyboardEvent)=>{
        if(e.key == "ArrowLeft"){
            window.location.replace(`${previousID}`);
        }else if(e.key == "ArrowRight"){
            window.location.replace(`${nextID}`);
        }
    }

    return(
        <Providers>
            <AuthProvider>
                <div className="w-full min-h-screen record-page">
                    <Header>
                        <ColorBtn index={data.color}/>
                        <EmojiBtn icon={data.emoji}/>
                        <LikeBtn recordID={data.id} likeStatus={data.favorite}/>
                        <ReturnBtn/>
                    </Header>
                    <h1 className="p-8 text-center text-4xl font-bold">{title}</h1>
                    <div className='recordDate'>
                        <span className='font-bold pb-2'>{recordDate}</span>
                    </div>
                    <p className='recordText'>{text}</p>
                </div>
            </AuthProvider>
        </Providers>
    )
}

export default RecordPage;