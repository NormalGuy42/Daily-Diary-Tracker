'use server';

//Fetch all records
export async function fetchAll() {

    let data : Array<RecordType> = [];
    let isError = false;
    let error = '';


    try{
        const res = await fetch("https://m1000.me/diary/api/api-diary.php",{
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${process.env.API_KEY}`,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            cache: 'no-store'
        })

        if(!res.ok){
            throw new Error('Failed to fetch data')
        }

        data = await res.json()
    }
    catch(error){
        isError = true;
        error = 'fetch error';
    }

    return {data, isError,error}
}

//Fetch single record
export async function fetchRecord(id:string){
    let emptyRecord : [RecordType] = [{
        id: 0,
        title:'',
        emoji: '',
        created_at: '',
        color: 0,
        text: '',
        favorite: false,
    }]
    let data : RecordPageData = {recordData: emptyRecord, idList:[]};

    let isError = false;
    let error = '';


    try{
        const res = await fetch("https://m1000.me/diary/api/diary-data.php?id=" + id,{
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${process.env.API_KEY}`,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            cache: 'no-store'
        })

        if(!res.ok){
            throw new Error('Failed to fetch data')
        }

        data = await res.json()
    }
    catch(error){
        isError = true;
        error = '';
    }

    return {data, isError,error}
}
//Fetch favorites
export async function fetchFavorites(){
    let data : Array<RecordType> = [];
    let isError = false;
    let error = '';


    try{
        const res = await fetch("https://m1000.me/diary/api/favorite.php",{
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${process.env.API_KEY}`,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            cache: 'no-store'
        })

        if(!res.ok){
            throw new Error('Failed to fetch data')
        }

        data = await res.json()
    }
    catch(error){
        isError = true;
        error = '';
    }

    return {data, isError,error}
}
//Updating likes
export async function updateLike(recordID:number,like:boolean){

    const res = await fetch("https://m1000.me/diary/api/favorite.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${process.env.API_KEY}`,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        },
        cache: 'no-store',
        body: JSON.stringify({
            id: recordID,
            likeStatus: !like,
        }),
    });

    const result = await res.json();

    if(result.code !== undefined){
        //If the api call works
        if(result.code == 200){
            return 200;
        }
    }
    
}
//Get date from formCode
export async function getFormDate(id:string){
    let data : [FormCode] = [{id:0,code:'',date:''}];
    let isError = false;
    let error = '';

    try{
        const res = await fetch("https://m1000.me/diary/api/getFormID.php?id=" + id,{
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${process.env.API_KEY}`,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            cache: 'no-store'
        });
        if(!res.ok){
            isError = true;
            error = 'Failed to fetch data';
            throw new Error(error)
        }

        data = await res.json();

    }catch(err){
        isError = true
        console.log(error)
    }
    return {data, isError,error}
}
//Create record with form
export async function postData(formData: FormType,formDate:string){
    let data = 0;
    let error = '';
    let isError = false;

    try{
        const res = await fetch("https://m1000.me/diary/api/api-diary.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${process.env.API_KEY}`,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
          cache: 'no-store',
          body: JSON.stringify({...formData,code:formDate}),
        });
    
        if(!res.ok){
            throw new Error('Failed to fetch data')
        }
        
        const result = await res.json();
        if(result.code !== undefined){
            data = result.code
        }
      }catch(error){
        console.error("Error submitting form",error)
        isError = true
      }
    return {data, isError,error}
};

export async function fetchLogin(userID:string, password:string){
    let data = 500;
    let error = '';
    let isError = false

    try{
        const res = await fetch("https://m1000.me/diary/api/auth.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${process.env.API_KEY}`,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
          cache: 'no-store',
          body: JSON.stringify({"userID":userID,"password":password}),
        });
    
        const result = await res.json();
      
        if(result.code !== undefined){
            data = result.code
        }
            
      }catch(error){
        console.error("Error submitting form",error)
        isError = true;
        error = error;
      }
    return {data, isError, error}
}