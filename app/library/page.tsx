'use client';

import '../globals.css';
import '../types/customTypes';
import { useCallback, useEffect, useState } from "react"
import ReturnBtn from '../components/buttons/returnBtn';
import Header from '../components/header';
import { LibraryLayout } from '../components/librarylayout';
import { getLibraryLayout } from '../components/methods/methods';
import { Providers } from '../providers';
import { AuthProvider } from '../authprovider';
import { fetchAll } from '../api/actions';




export default function Library(){
    const [data,setData] = useState<Array<LibraryLayoutData>>([]);
    const [idList,setIdList] = useState<Array<number>>([]);
    const getData = async ()=>{
        const { data, isError, error } = await fetchAll();
    
        if(!isError){
            setData(getLibraryLayout(data));
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
            
                <h1 className="title">Hello there</h1>
                {
                    data.map((recordsData:LibraryLayoutData,index)=><LibraryLayout key={index + 1} data={recordsData} type='library'/>)
                }                
            </main>
        </AuthProvider>
    )
}