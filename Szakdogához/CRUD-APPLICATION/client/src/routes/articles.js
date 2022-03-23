import React, {useState, useEffect} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import '../App.css';
import Axios from 'axios';

var articleData = [];
var found = false;
var lastFetchedArticleItemId = 1;

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
   /* useEffect(() => {
        fetchMoreData();
    }, []);*/

    const fetchMoreData = () => {
      setTimeout(() => {
        //console.log(getLastFetchedArticleItemId);

        const API_URL = 'http://localhost:3001';
/*
        fetch(`${API_URL}/api/get/article`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'item' : lastFetchedArticleItemId,
            },
        })
        .then(async res => { */
        
        
         Axios.get('http://localhost:3001/api/get/article', {
          headers: {
            'content-type': "application/json",
            'item': lastFetchedArticleItemId
          }
        }).then((res) => { 
        
            try {
                if (res.status !== 200) {
                    console.log('not200');
                    found=false;
                } else {
                    const jsonRes = res.data;
                    console.log(articleData);
                    console.log(lastFetchedArticleItemId + " " + jsonRes.length);
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
                    lastFetchedArticleItemId= lastFetchedArticleItemId+jsonRes.length
                    console.log(lastFetchedArticleItemId);
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
  /*  useEffect(() => {

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
    }, []);*/

    return(
      <div className="cardContainer">
        <hr />
        <InfiniteScroll
          dataLength={getData.length}
          next={fetchMoreData()}
          hasMore={found}
          loader={<h4>Loading...</h4>}
        >
           { found == true ?
              getData.map((index, i) => (
                <Card key={index} item={index} data={articleData[i]}/>
              ))
          : null}
        </InfiniteScroll>
      </div>
    );
}


//PureComponent - jobb optimalizáció, pl. nincsenek felesleges újra renderelések
class Card extends React.PureComponent {    

  render() {
      const {data} = this.props;
      return(
        <div className="card">
          <div>
            {data.ArticleName}
            {data.ArticleSmDescr}
            {data.ArticleMDescr}
            {data.ArticleImg}
          </div> 
        </div>
      )
  }
}


//Functional component - ha valami nem működne a PureComponent-ben, próbáld ebben
/*const Card = ({data}) => {

  return (
    <div>
        <div className="card">
          {data.ArticleName}
          {data.ArticleSmDescr}
          {data.ArticleMDescr}
          {data.ArticleImg}
        </div> 
    </div>
  )
}*/