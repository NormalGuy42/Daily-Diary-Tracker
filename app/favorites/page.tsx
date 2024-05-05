'use client';

import Header from '../components/header'
import '../globals.css'
import ReturnBtn from '../components/buttons/returnBtn'
import { useCallback, useEffect, useState } from 'react';
import { getLibraryLayout } from '../components/methods/methods';
import { LibraryLayout } from '../components/librarylayout';
import { Providers } from '../providers';
import { AuthProvider } from '../authprovider';
import { fetchAll, fetchFavorites } from '../api/actions';

export default function Favorites(){
    const [data,setData] = useState<Array<LibraryLayoutData>>([]);
    const [idList,setIdList] = useState<Array<number>>([]);
    const [favLength, setFavLength] = useState(0)

    const getData = async ()=>{
        const { data, isError, error } = await fetchFavorites();
    
        if(!isError){
          setData(getLibraryLayout(data));
          setFavLength(data.length)
            //Get the list of ids
            let list: Array<number> = [];
            data.map((record:RecordType)=>list.push(record.id));
            setIdList(list);
        }
        else{
          console.log(error)
        }
    }
    
    useEffect(()=>{
        //Get data from api
        getData()
    },[]);

    
    return(
        <AuthProvider>
            <main>
                <Header>
                    <ReturnBtn/>
                </Header>
                <h1 className="title">Favorites - ({favLength})</h1>
                {
                    data.map((recordsData:LibraryLayoutData,index)=><LibraryLayout key={index + 1} data={recordsData} type='favorite' />)
                }                
            </main>
        </AuthProvider>
    )    
    
}