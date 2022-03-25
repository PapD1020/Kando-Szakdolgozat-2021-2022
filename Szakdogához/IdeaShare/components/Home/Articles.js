import React, { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { View, ScrollView, Text, Image, Dimensions, StyleSheet, TouchableOpacity, Pressable, FlatList, ImageBackground } from "react-native";
import { SwipeablePanel } from 'rn-swipeable-panel';
import { PanelHandlerContext } from "../Context";
import { requestCameraPermission, requestStoragePermission } from "../PermRequests";
import * as ImagePicker from 'react-native-image-picker';
import Animated, { useSharedValue, useAnimatedStyle, Easing, withSpring, withTiming } from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//import 'react-native-gesture-handler';
import { createGlobalState } from 'react-hooks-global-state';

const initialState = { scrollUnlock: true };
const { useGlobalState } = createGlobalState(initialState);

var flatListHeight = 0;
var globalRef = null;
var lastFetchedArticleItemId = 1;
var articleData = [];

const Articles = () => {

    const panelHandlerContext = useMemo(() => ({
        openPanel: () => {
            setIsPanelActive(true);
        },
         closePanel: () => {
            setIsPanelActive(false);
        },
    }));

    //swipepanel
    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: true,
        showCloseButton: true,
        zIndex : 100,
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
        style: styles.comments,
        // ...or any prop you want
    });

    const [isPanelActive, setIsPanelActive] = useState(false);
    
    const openPanel = () => {
        setIsPanelActive(true);
    };

    const closePanel = () => {
        setIsPanelActive(false);
    };

    //ImagePicker RN

    const [pickerResponse, setPickerResponse] = useState(null);

    const onImageLibraryPress = useCallback(() => {
        requestStoragePermission();
        const options = {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
        };
        ImagePicker.launchImageLibrary(options, setPickerResponse);
    }, []);

    const onCameraPress = useCallback(() => {
        requestCameraPermission();
        const options = {
        saveToPhotos: true,
        mediaType: 'photo',
        includeBase64: false,
        };
        ImagePicker.launchCamera(options, setPickerResponse);
    }, []);

    const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

    
    //imagePicker
    const [pickedImagePath, setPickedImagePath] = useState('');

    //infiniteScroll
    const [data, setData] = useState ([]);
    const [getArticleData, setArticleData] = useState([]);
    const [getLastFetchedArticleItemId, setLastFetchedArticleItemId] = useState(1);
    useEffect(() => {
        lastFetchedArticleItemId = 1;
        //setArticleData([]); ////state-es articledata-hoz
        articleData = [];
        setData([]);
        fetchMore();
    }, []);
    const fetchMore = (refreshing) => {
        if (refreshing == true) {
            lastFetchedArticleItemId = 1;
            //setArticleData([]);////state-es articledata-hoz
            setData([]); 
            articleData = [];
        }

        fetch(`${global.NodeJS_URL}/api/get/article`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'item' : lastFetchedArticleItemId,
            },
        })
        .then(async res => { 
            try {
                if (res.status !== 200) {
                   // console.log('not200');
                    found=false;
                } else {
                    const jsonRes = await res.json();

                    found=true;
                    var articleResultId = 0;
                    //let adata = [...getArticleData]; //state-es articledata-hoz
                    for (articleResultId = 0; articleResultId < jsonRes.length; articleResultId++){
                        //adata.push(jsonRes[articleResultId]); //state-es articledata-hoz
                        articleData.push(jsonRes[articleResultId]);
                    };
                        //setArticleData(adata);//,()=> 		console.log("setState completed", this.state)); //state-es articledata
                    setData(prevState =>[
                        ...prevState,
                        ...Array.from({length:articleResultId}).map((_,articleResultId)=>articleResultId+1 + prevState.length),
                    ]);
                    setLastFetchedArticleItemId(getLastFetchedArticleItemId+jsonRes.length)
                    lastFetchedArticleItemId = lastFetchedArticleItemId +jsonRes.length;
                    //console.log(data);
                    //console.log(articleData);
                }
            } catch (err) {
               // console.log(err);
            };
        })
        .catch(err => {
           // console.log(err);
        });        

    };

    const [getScrollUnlock, setScrollUnlock] = useGlobalState('scrollUnlock');

    const renderItem = useCallback(
        ({item}) => (
            <View>
                { articleData[item-1] != [] ?
                    <Article item={item} /*data={getArticleData}*//>
                : null} 
            </View>


        ),
    []);

    //const keyExtractor = useCallback((item) => item.toString(),[])
    const keyExtractor = useCallback(e => e,[]);

    const find_dimesions = (layout) => {
        const {x, y, width, height} = layout;
        flatListHeight = height;
      }
    return(
        <PanelHandlerContext.Provider value={panelHandlerContext}>
        <View style={styles.container} onLayout={(event) => { find_dimesions(event.nativeEvent.layout) }}>
            <SwipeablePanel {...panelProps} isActive={isPanelActive}>
                <Pressable
                    onPress={onCameraPress}
                    style={styles.pressable}
                    >
                    <Text
                        style={styles.button_text}
                    >
                        Upload Photo
                    </Text>
                </Pressable>

                <Pressable
                    onPress={onImageLibraryPress}
                    style={styles.pressable}
                    >
                    <Text
                        style={styles.button_text}
                    >
                        Upload Image
                    </Text>
                </Pressable>
                
{/*                 {
                pickedImagePath !== '' && <Image 
                    source={{uri: pickedImagePath}} 
                    style={styles.photoshot}
                />
                } */}
                {
                uri !== '' && <Image 
                    source={{uri: uri}} 
                    style={styles.photoshot}
                />
                }
            </SwipeablePanel>
            <FlatList
                scrollEnabled = {getScrollUnlock}
                data={data}
                ref={(ref) => {
                    globalRef = ref;
                  }}
                onEndReachedThreshold={2}
                onEndReached={() => fetchMore(false)}
                style={{flex: 1}}
                //removeClippedSubviews = {false}
                //updateCellsBatchingPeriod = {10}
                initialNumToRender = {0}
                maxToRenderPerBatch={3}
                windowSize={5}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                onRefresh={() => fetchMore(true)}
                refreshing={false}
                /*ListHeaderComponent={this.renderHeader}*/
                />
        </View>
        </PanelHandlerContext.Provider>
    )
}

class Article extends React.PureComponent {    

    render() {

        const {item} = this.props;
        //const {data} = this.props;
        return(
            <ArticleFunc item={item} /*data={data[item-1]}*//>
        )
    }
}
/*
const Article = ({item,data}) => {
    console.log("data: " + data);
    return(
        <ArticleFunc item={item}/>
)}*/
const ArticleFunc = ({item, data}) => {

item=item-1;
    
    
//    const PostProps = [{postId: getPostId}, {userId:getUserId}, {postTitle:getPostTitle}, {postDescription:getPostDescriprion}, {postImgUri: getPostImgUri}, {createdAt: getPostCreatedAt}];
//    const PostProps = [{postId: 1}, {userId:1}, {postTitle:'title'}, {postDescription:'Desc'}, {postImgUri: 'https://images.unsplash.com/photo-1544526226-d4568090ffb8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by'}, {createdAt: '2020.12.12.'}];

    const [getScrollUnlock, setScrollUnlock] = useGlobalState('scrollUnlock');

    //const [getArticleData, setArticleData] = useState([data.ArticleImg, data.ArticleName, data.ArticleSmDescr]);
    const [getArticleData, setArticleData] = useState([articleData[item].ArticleImg, articleData[item].ArticleName, articleData[item].ArticleSmDescr]);
    
    const [getIfZoomed, setIfZoomed] = useState(false);

    const [getArticleStylesForNextAnimation, setArticleStylesForNextAnimation] = useState({height:Dimensions.get('window').height*0.6, padding: 10, paddingTop:5, borderRadius: 10})

    const animation = useSharedValue(getArticleStylesForNextAnimation);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            height: withTiming(animation.value.height,{
                duration:500,
                easing: Easing.bezier(0.6, 0.30, 0, 1),
            }),
            padding: withTiming(animation.value.padding,{
                delay:100,
                duration:800,
                easing: Easing.bezier(0.6, 0.23, 0, 1),
            }),
            paddingTop: withTiming(animation.value.paddingTop,{
                delay:100,
                duration:1000,
                easing: Easing.bezier(0.6, 0.23, 0, 1),
            }),
            borderRadius: withTiming(animation.value.borderRadius,{
                delay:100,
                duration:500,
                easing: Easing.bezier(0.6, 0.23, 0, 1),
            }),
        };  
    });

    const ZoomIt = ({data}) => {
        if ( getIfZoomed == false) {
            [
                animation.value = {height: flatListHeight, padding:0, marginBottom: 0, paddingTop:0, borderRadius: 0},
                //setArticleData([data.ArticleImg, data.ArticleName, data.ArticleMDescr]),
                setArticleData([articleData[item].ArticleImg, articleData[item].ArticleName, articleData[item].ArticleMDescr]),
                setArticleStylesForNextAnimation({height: flatListHeight, padding:0, paddingTop:0, borderRadius:0}),
                setIfZoomed(true),
                setScrollUnlock(false),
            ]
        }else{
            [
                animation.value = {height:Dimensions.get('window').height*0.6, padding: 10, marginBottom: 15, paddingTop:5, borderRadius:10},
                //setArticleData([data.ArticleImg, data.ArticleName, data.ArticleSmDescr]),
                setArticleData([articleData[item].ArticleImg, articleData[item].ArticleName, articleData[item].ArticleSmDescr]),
                setArticleStylesForNextAnimation({height:Dimensions.get('window').height*0.6, padding: 10, paddingTop:5, borderRadius:10}),
                setIfZoomed(false),
                setScrollUnlock(true),
            ]
        }
    }
    return (
        
        <View>

            <Animated.View  style={[styles.articleContainer, animatedStyles]}>
                <ArticleHeader props={["Mark"]}/>
                <TouchableOpacity activeOpacity={0.9} style={styles.articleBodyContainer} onPress={() => ([ZoomIt({data}), globalRef.scrollToIndex({
            animated: true,
            index: item,
            viewPosition: 0
          })    ])}>    
                    <ArticleBody
                        onLayout={(event) => {this.find_dimension(event.nativeEvent.layout)}}
                        props={[getArticleData[0], getArticleData[1], getArticleData[2], getIfZoomed/*getPostImgUri,getPostTitle, getPostDescriprion*/]}
                        />
                </TouchableOpacity>
                <ArticleFooter/>
            </Animated.View>

        </View>           
        
    

    )
}

const ArticleHeader = ({props}) => {

    return (
        <View style={styles.articleHeaderContainer} >
            <View style={styles.articleHeaderImgContainer} >
            <Image source={require("../../public/images/profilepic_small.png")} style={styles.articleHeaderImg} />
            </View>
            <View style={styles.articleHeaderUNameContainer}>
            <Text style={styles.articleHeaderUName}>
                {props[0]}
            </Text>       
            </View>
        </View>
    );
}

const ArticleBody = ({props}) => {
    //const BASE_URI = 'https://source.unsplash.com/random?sig=';
    return(
            <ImageBackground 
            source={{uri: props[0] /*pickedImagePath/*/}} 
            style={styles.articleBodyContainer}
            imageStyle={{ borderRadius: 10}}
        >
            <Text style={styles.articleBodyHeader}>{props[1]}</Text>
            { props[3] === false ?
                <Text style={styles.articleBodyFooter}>{props[2]}</Text>   
            :
                <ScrollView style={styles.articleBodyFooter}>
                    <View onStartShouldSetResponder={() => true}>
                    <Text>{props[2]}</Text></View>
                </ScrollView>
            }
        </ImageBackground>
   
    );
}

const ArticleFooter = ({post}) => {
const { openPanel } = useContext(PanelHandlerContext);
    return(
    <View style={styles.articleFooter}>
        <TouchableOpacity activeOpacity={0.5} style={styles.articleFooterBtnContainer}/* underlayColor={'rgba(0,0,0,0.3)'} */onPress={() => {openPanel()}}>
            {/* <FastImage source={require("../../public/images/star.png")} style={styles.articleFooterBtnImg}/> */}
            <MaterialCommunityIcons name="bookmark" color="#4d4a42" size={34} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} style={styles.articleFooterBtnContainer} /*underlayColor={'rgba(0,0,0,0.3)'}*/ onPress={() => {openPanel()}}>
            <MaterialCommunityIcons name="comment" color="#4d4a42" size={30} />
            {/* <FastImage source={require("../../public/images/chat-bubble.png")} style={styles.articleFooterBtnImg}/> */}
        </TouchableOpacity>                    
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 13,
        backgroundColor: "#cec8b0", //'#8aacc8',
        //paddingTop: getStatusBarHeight(),
    },
    articleContainer: {
        height: Dimensions.get('window').height*0.6,
        backgroundColor: '#f2f1e1',
        borderRadius: 10,
        marginBottom: 15,
        paddingTop: 5,
        paddingBottom: 10,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 10,
    },
        articleHeaderContainer: {
            //flex:1,
            flexDirection:'row',
            height: 50,
            padding: 10,
        },
            articleHeaderImgContainer:{
                flex:1,
                //backgroundColor: 'red',
            },
            articleHeaderImg:{
                aspectRatio: 1,
                height:'100%',
                flex: 1,
            },
            articleHeaderUNameContainer: {
                flex:5,
               // backgroundColor: 'yellow',
                justifyContent: 'center',
            },
            articleHeaderUName: {
                justifyContent: 'center',
                color: 'black',
            },
        articleBodyContainer:{
            //aspectRatio : 1,
            width: '100%',
            borderRadius: 20,
            flex:10,
            marginBottom: 5,
        },
            articleBodyHeader: {
                //flex:1,
                marginBottom : 100,
                fontSize: 25,
                backgroundColor: 'rgba(0,0,0,0.4)',
                color: 'white',
                paddingLeft: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
            },
            articleBodyFooter: {
                flex:3,
                fontSize: 15,
                backgroundColor: 'rgba(0,0,0,0.4)',
                color: 'white',
                paddingLeft: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
            },
        articleFooter: {
            //flex:1,
            flexDirection: 'row',
            //height: 30,
            justifyContent: 'space-between',
        },
            articleFooterBtnContainer:{
                alignItems: 'center',
                justifyContent: 'center',
                flex:1,
             },
             articleFooterBtnImg:{
                 aspectRatio : 1,
                 height: 40,
                // backgroundColor: 'red'
             },
    pressable:{
        height: 50,
        backgroundColor: '#0077c2',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 30,
    },
    button_text:{
        color: '#ffffff',
        fontSize: 20,
    },
    photoshot:{
        aspectRatio : 1,
        width: '100%',
        borderRadius: 20,
        flex:1,
        marginBottom: 5,
    },
});
    

export default Articles