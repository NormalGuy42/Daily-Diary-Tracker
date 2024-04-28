

//Fetch all records
export async function fetchAll() {
    
}

//Fetch single record
export async function fetchRecord(){

}
//Fetch favorites
export async function fetchLikes(){
    
}
//Updating likes
export async function updateLike(recordID:number,like:boolean){

    const res = await fetch("https://m1000.me/diary/api/favorite.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${process.env.API_KEY}`,
        },
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
//Create record with form
export async function postData(formData: FormData){
  
};