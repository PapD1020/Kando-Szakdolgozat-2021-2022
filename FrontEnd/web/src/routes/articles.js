import React, {useState, useEffect} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import '../App.css';
import Axios from 'axios';
import { Card, Button, Spinner } from 'react-bootstrap';

var articleData = [];
var found = false;
var lastFetchedArticleItemId = 1;

export default function Article(){

    const [getData, setData] = useState([]);

    useEffect(() => {
      lastFetchedArticleItemId = 1;
    }, []);

    const fetchMoreData = () => {
      setTimeout(() => {
        
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
      <div className="infiniteScrollContainer">
        <InfiniteScroll
          dataLength={getData.length}
          next={fetchMoreData()}
          hasMore={found}
          loader={<div className="text-center mb-5">
            <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
              Loading...
            </Button>
          </div>}
        >
           { found === true ?
              getData.map((index, i) => (
                <CardContainer key={index} item={index} data={articleData[i]}/>
              ))
          : null}
        </InfiniteScroll>
      </div>
    );
}


//PureComponent - jobb optimalizáció, pl. nincsenek felesleges újra renderelések
class CardContainer extends React.PureComponent {    

  render() {
      const {data} = this.props;
      return(
          <Card style={{backgroundImage: `url(${data.ArticleImg})`, backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          color: 'white'
          }} className="text-center m-5 bg-dark">
            <Card.Header className="bg-dark bg-opacity-50">{data.ArticleName}</Card.Header>
            <Card.Body className="bg-dark bg-opacity-25">
              <Card.Title>{data.ArticleSmDescr}</Card.Title>
              <Card.Text>
                {data.ArticleMDescr}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="bg-dark bg-opacity-25">Created at: {data.ArticleCreatedAt}</Card.Footer>
          </Card>
      )
  }
}
