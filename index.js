import React, {useEffect, useState} from "react";
import "./index.css";

export default function Home() {
    const [query,setQuery] = useState("man");
    //const [PageUrl,setPageUrl] = useState("man");

    const[loading, setLoading] = useState(true);
    const[data,setdata] = useState([]);
    const[photos,setPhotos] = useState([]);

    const getPhotos = async(type) => {
        let url =`https://api.pexels.com/v1/search?query=${query}`;
        if(data && data.next_page && type === "next"){
            url = data.next_page;
        }
        if(data && data.prev_page && type === "back"){
            url = data.prev_page;
        }
        
        setLoading(true);
        await fetch(url, {
        
            headers: {
                Authorization:"DGMNnrI6drHv2dhs8yPv2PLMlbXIHAhskXCCFRJvp8xpVJ6tKAmq0uWs",},

        })
        .then((resp)=> {
            return resp.json();
        })
        .then((res) => {
            setLoading(false);
            //setdata(res);
            setdata({
                ...res,
                page: type === "next" ? res.page + 1 : type === "back" ? res.page - 1 : 1,
              });
            setPhotos([...photos, ...res.photos]);
        });
    };
        useEffect(() => {
            getPhotos();
},[]);

const onkeyDownHandler = (e) => {
    if(e.keyCode === 13){
        getPhotos();
    }

};

return(

    <div>
        <input 
        className = "inputSearch"
        onKeyDown = {onkeyDownHandler}
        placeholder="Search for free photos"
        onChange={(e) => setQuery(e.target.value)}
        value={query}/>
        
        {loading && <h1>Fetching...</h1>}
        <div className = "containber">
            {photos?.map((item,index) => {
                return (
                    <div className="box" key={item.id}>
                        <img src={item.src.medium} alt ={item.id} />
                    </div>
                );
            })}
        </div>
        <div>
           <button  disabled ={data?.page === 1 } onClick = {() => getPhotos("back")}>Prev</button>
           <button onClick = {() => getPhotos("next")}>Next</button>

        </div>
    </div>
)
}