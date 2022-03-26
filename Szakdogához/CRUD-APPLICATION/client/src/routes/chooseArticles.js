import React, {useState, useEffect, useRef} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import '../App.css';
import Axios from 'axios';

var articleData = [];
var found = false;
var lastFetchedArticleItemId = 1;

export default function Article(){

    const [LoginStatus, setLoginStatus] = useState('');

    const GotUserId = useRef(null);

    //const choosenArticleId = useRef(null);

    //const GotArticleId = useRef(null);

    Axios.defaults.withCredentials = true;

    const [getData, setData] = useState([]);

        //check every time we refresh the page if a user is logged in
        useEffect(() => {
            Axios.get('http://localhost:3001/api/login/user').then((response) => {
            //ellenőrzésre
            //console.log("Are we logged in: " + JSON.stringify(response));
                if(response.data.loggedIn === true){
                    setLoginStatus(response.data.user[0].UserUn);
                    //GotArticleId.current = response.data.article[0].ArticleId;
                    GotUserId.current = response.data.user[0].UserId;
                }
            });
        }, []);

    useEffect(() => {
      lastFetchedArticleItemId = 1;
    }, []);

    const fetchMoreData = () => {
      setTimeout(() => {
        
         Axios.get('http://localhost:3001/api/get/article/byId', {
          headers: {
            'content-type': "application/json",
            'item': lastFetchedArticleItemId,
            'userId': GotUserId.current
          },
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

    return(
      <div className="cardContainer">
          <h1>{LoginStatus}</h1>
        <hr />
        <InfiniteScroll
          dataLength={getData.length}
          next={fetchMoreData()}
          hasMore={found}
          loader={<h4>Loading...</h4>}
        >
           { found === true ?
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
          <button>Edit</button>
        </div>
      )
  }
}
