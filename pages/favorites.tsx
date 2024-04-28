import Header from '@/app/components/header'
import '../app/globals.css'
import ReturnBtn from '@/app/components/buttons/returnBtn'
import { useEffect, useState } from 'react';
import { getLibraryLayout } from '@/app/components/methods/methods';
import { LibraryLayout } from '@/app/components/librarylayout';
import { Providers } from '@/app/providers';
import { AuthProvider } from '@/app/authprovider';

export default function Favorites(){
    const [data,setData] = useState<Array<LibraryLayoutData>>([]);
    const [idList,setIdList] = useState<Array<number>>([]);
    
    useEffect(()=>{
        //Get data from api
        fetch("https://m1000.me/diary/api/favorite.php",{
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${process.env.API_KEY}`,
            }
        }
        )
        .then((res)=>res.json())
        .then((data)=>{
            setData(getLibraryLayout(data));
            //Get the list of ids
            let dataFetched : Array<RecordType> = data;
            let list: Array<number> = [];
            dataFetched.map((record)=>list.push(record.id));
            setIdList(list);
        });
    },[]);

    
    return(
        <Providers>
            <AuthProvider>
                <main>
                    <Header>
                        <ReturnBtn/>
                    </Header>
                    <h1 className="title">Favorites</h1>
                    {
                        data.map((recordsData:LibraryLayoutData,index)=><LibraryLayout key={index + 1} data={recordsData} type='favorite' />)
                    }                
                </main>
            </AuthProvider>
        </Providers>
    )    
    
}