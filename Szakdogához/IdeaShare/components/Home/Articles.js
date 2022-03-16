import React, { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { View, ScrollView, Text, Button, Image, Dimensions, StyleSheet, TouchableHighlight, TouchableOpacity, Pressable, FlatList, ImageBackground } from "react-native";
import { SwipeablePanel } from 'rn-swipeable-panel';
import { PanelHandlerContext } from "../Context";
import { requestCameraPermission, requestStoragePermission } from "../PermRequests";
import * as ImagePicker from 'react-native-image-picker';
import FastImage from 'react-native-fast-image'
import Animated, { useSharedValue, useAnimatedStyle, Easing, withSpring, withTiming } from 'react-native-reanimated';
//import 'react-native-gesture-handler';
import { createGlobalState } from 'react-hooks-global-state';


const initialState = { scrollUnlock: true };
const { useGlobalState } = createGlobalState(initialState);

var articleData = [];
var flatListHeight = 0;
var globalRef = null;

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
    const [getLastFetchedArticleItemId, setLastFetchedArticleItemId] = useState(1);
    useEffect(() => {
        fetchMore();
    }, []);
    const fetchMore = () => {
        console.log(getLastFetchedArticleItemId);

        const API_URL = Platform.OS === 'ios' ? 'http://localhost:3001' : 'http://192.168.0.107:3001';

        fetch(`${API_URL}/api/get/article`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'item' : getLastFetchedArticleItemId,
            },
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status !== 200) {
                    console.log('not200');
                    console.log(jsonRes.message);
                    found=false;
                } else {
                    found=true;
                    var articleResultId = 0;
                    for (articleResultId = 0; articleResultId < jsonRes.length; articleResultId++){
                        articleData.push(jsonRes[articleResultId]);
                        //console.log(articleData[getLastFetchedArticleItemId+articleResultId].ArticleId);
                    };
                    setData(prevState =>[
                    ...prevState,
                    ...Array.from({length:articleResultId}).map((_,articleResultId)=>articleResultId+1 + prevState.length),
                    ]);
                    setLastFetchedArticleItemId(getLastFetchedArticleItemId+jsonRes.length)
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });        

    };

    const [getScrollUnlock, setScrollUnlock] = useGlobalState('scrollUnlock');

    const renderItem = useCallback(
        ({item}) => (
            <Article item={item}/>),
        []
    );

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
                onEndReachedThreshold={1}
                onEndReached={fetchMore}
                style={{flex: 1}}
                //removeClippedSubviews = {false}
                //updateCellsBatchingPeriod = {10}
                initialNumToRender = {1}
                maxToRenderPerBatch={3}
                windowSize={5}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                /*ListHeaderComponent={this.renderHeader}*/
                />
        </View>
        </PanelHandlerContext.Provider>
    )
}

class Article extends React.PureComponent {    

    render() {
        const {item} = this.props;
        return(
            <ArticleFunc item={item}/>
        )
    }
}

const ArticleFunc = ({item}) => {

item=item-1;
    
    
//    const PostProps = [{postId: getPostId}, {userId:getUserId}, {postTitle:getPostTitle}, {postDescription:getPostDescriprion}, {postImgUri: getPostImgUri}, {createdAt: getPostCreatedAt}];
//    const PostProps = [{postId: 1}, {userId:1}, {postTitle:'title'}, {postDescription:'Desc'}, {postImgUri: 'https://images.unsplash.com/photo-1544526226-d4568090ffb8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by'}, {createdAt: '2020.12.12.'}];

    const [getScrollUnlock, setScrollUnlock] = useGlobalState('scrollUnlock');

    const [getArticleData, setArticleData] = useState([articleData[item].ArticleImg, articleData[item].ArticleName, articleData[item].ArticleSmDescr]);
    
    const [getIfZoomed, setIfZoomed] = useState(false);

    const [getArticleStylesForNextAnimation, setArticleStylesForNextAnimation] = useState({height:Dimensions.get('window').height*0.6, padding: 10, paddingTop:5})

    const animation = useSharedValue(getArticleStylesForNextAnimation);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            height: withTiming(animation.value.height,{
                duration:500,
                easing: Easing.bezier(0.6, 0.30, 0, 1),
            }),
            padding: withTiming(animation.value.padding,{
                delay:100,
                duration:1000,
                easing: Easing.bezier(0.6, 0.23, 0, 1),
            }),
            paddingTop: withTiming(animation.value.paddingTop,{
                delay:100,
                duration:1000,
                easing: Easing.bezier(0.6, 0.23, 0, 1),
            }),
        };  
    });

    const ZoomIt = () => {
        if ( getIfZoomed == false) {
            [
                animation.value = {height: flatListHeight, padding:0, marginBottom: 0, paddingTop:0},
                setArticleData([articleData[item].ArticleImg, articleData[item].ArticleName, articleData[item].ArticleMDescr]),
                setArticleStylesForNextAnimation({height: flatListHeight, padding:0, paddingTop:0}),
                setIfZoomed(true),
                setScrollUnlock(false),
            ]
        }else{
            [
                animation.value = {height:Dimensions.get('window').height*0.6, padding: 10, marginBottom: 15, paddingTop:5},
                setArticleData([articleData[item].ArticleImg, articleData[item].ArticleName, articleData[item].ArticleSmDescr]),
                setArticleStylesForNextAnimation({height:Dimensions.get('window').height*0.6, padding: 10, paddingTop:5}),
                setIfZoomed(false),
                setScrollUnlock(true),
            ]
        }
    }
    return (
        
        <View>
        { found == true ?
            <Animated.View  style={[styles.articleContainer, animatedStyles]}>
                <ArticleHeader props={["Mark"]}/>
                <TouchableOpacity activeOpacity={0.9} style={styles.articleBodyContainer} onPress={() => ([ZoomIt(), globalRef.scrollToIndex({
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
        : null }
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
        <TouchableHighlight style={styles.articleFooterBtnContainer}/* underlayColor={'rgba(0,0,0,0.3)'} */onPress={() => {openPanel()}}>
            <FastImage source={require("../../public/images/star.png")} style={styles.articleFooterBtnImg}/>
        </TouchableHighlight>                   
        <TouchableHighlight style={styles.articleFooterBtnContainer}/* underlayColor={'rgba(0,0,0,0.3)'}*/ onPress={() => {openPanel()}}>
            <FastImage source={require("../../public/images/dots.png")} style={styles.articleFooterBtnImg}/>
        </TouchableHighlight>
        <TouchableHighlight style={styles.articleFooterBtnContainer} /*underlayColor={'rgba(0,0,0,0.3)'}*/ onPress={() => {openPanel()}}>
            <FastImage source={require("../../public/images/chat-bubble.png")} style={styles.articleFooterBtnImg}/>
        </TouchableHighlight>                    
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 13,
        backgroundColor: 'white',
        //paddingTop: getStatusBarHeight(),
    },
    articleContainer: {
        height: Dimensions.get('window').height*0.6,
        backgroundColor: '#ffffff',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
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