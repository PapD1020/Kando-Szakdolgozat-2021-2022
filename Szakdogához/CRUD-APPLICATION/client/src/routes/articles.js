import React, {useState, useEffect} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import '../App.css';
import Axios from 'axios';

var articleData = [];
var found = false;

export default function Article(){

    const [ArticleNameList, setArticleNameList] = useState([]); //'' hibás, [] kell használni

    //***Infinite scroll***/
    /*
    state = {
      items: Array.from({ length: 20 })
    };
    */

    const [getData, setData] = useState([]);



    const [getLastFetchedArticleItemId, setLastFetchedArticleItemId] = useState(1);
    useEffect(() => {
        fetchMoreData();
    }, []);

    const fetchMoreData = () => {
      setTimeout(() => {
        //console.log(getLastFetchedArticleItemId);

        const API_URL = 'http://localhost:3001';

        fetch(`${API_URL}/api/get/article`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'item' : getLastFetchedArticleItemId,
            },
        })
        .then(async res => { 
            try {
                if (res.status !== 200) {
                    console.log('not200');
                    found=false;
                } else {
                    const jsonRes = await res.json();
                    console.log(articleData);
                    found=true;
                    console.log("Message: " + JSON.stringify(res.status));
                    var articleResultId = 0;
                    for (articleResultId = 0; articleResultId < jsonRes.length; articleResultId++){
                        articleData.push(jsonRes[articleResultId]);
                        //console.log(articleData[getLastFetchedArticleItemId+articleResultId].ArticleId);
                    };
                    setData(
                      getData.concat(Array.from({ length: articleResultId }))
                    );
                    setLastFetchedArticleItemId(getLastFetchedArticleItemId+jsonRes.length)
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });        
      }, 1)
    };

    /*const fetchMoreData = () => {
      
      // a fake async api call like which sends
      // 20 more records in 1.5 secs






      setTimeout(() => {
        setData(
          getData.concat(Array.from({ length: 20 }))
        );
      }, 1500);
    };
*/
    //On page load get articles
    useEffect(() => {

    Axios.get('http://localhost:3001/api/get/article', {
      headers: {
        'content-type': "application/json",
        'item': 1
      }
    }).then((response) => {
      
      setData(Array.from({length: 20}));
      setArticleNameList(response.data);
      console.log("Új articles get: " + JSON.stringify(response.data));
    });
    }, []);

    return(
      <div className="cardContainer">
        <hr />
        <InfiniteScroll
          dataLength={getData.length}
          next={fetchMoreData()}
          hasMore={found}
          loader={<h4>Loading...</h4>}
        >
          {getData.map((index) => (
            <Card className="card" key={index} item={index}/>
          ))}
        </InfiniteScroll>
      </div>
    );
}

const Card = ({item}) => {

  return (
    <div>
        { found == true ?
        <div>
          item
        </div> 
        : null}
    </div>
  )
}