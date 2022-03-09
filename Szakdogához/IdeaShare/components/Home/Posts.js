import React, { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { View, Text, Image, Dimensions, StyleSheet, TouchableHighlight, Pressable, FlatList, ImageBackground } from "react-native";
import { SwipeablePanel } from 'rn-swipeable-panel';
import { PanelHandlerContext } from "../Context";
import * as ImagePicker from 'react-native-image-picker';
import FastImage from 'react-native-fast-image'
import {useStateIfMounted} from 'use-state-if-mounted';


const Posts = () => {

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
        const options = {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
        };
        ImagePicker.launchImageLibrary(options, setPickerResponse);
    }, []);

    const onCameraPress = useCallback(() => {
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
    useEffect(() => {
        fetchMore();
    }, []);
    const fetchMore = () => {


        
        setData(prevState =>[
        ...prevState,
        ...Array.from({length:1}).map((_,i)=>i+1 + prevState.length),
        ]);
    };

    const renderItem = useCallback(
        ({item}) => (
            <Post item={item}/>),
        []
    );

    //const keyExtractor = useCallback((item) => item.toString(),[])
    const keyExtractor = useCallback(e => e,[]);


    return(
        <PanelHandlerContext.Provider value={panelHandlerContext}>
        <View style={styles.container}>
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
                data={data}
                onEndReachedThreshold={2}
                onEndReached={fetchMore}
                style={{flex: 1}}
                //removeClippedSubviews = {false}
                //updateCellsBatchingPeriod = {10}
                initialNumToRender = {1}
                maxToRenderPerBatch={3}
                windowSize={5}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                /*ListHeaderComponent={this.renderHeader}
                stickyHeaderIndices={[0]}*/
                />
        </View>
        </PanelHandlerContext.Provider>
    )
}

class Post extends React.PureComponent {    
    render() {
        const {item} = this.props;
        return(
            <PostFunc item={item}/>
        )
    }
}

const PostFunc = ({item}) => {

    const [getArticleData, setArticleData] = useStateIfMounted([]);

    const API_URL = Platform.OS === 'ios' ? 'http://localhost:3001' : 'http://192.168.0.66:3001';

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch(`${API_URL}/api/get/article`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'item' : item,
            },
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status !== 200) {
                    console.log('not200');
                    console.log(jsonRes.message);
                } else {
                    setArticleData([jsonRes[0].ArticleId, jsonRes[0].ArticleName, jsonRes[0].ArticleSmDescr, jsonRes[0].ArticleImg]);
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    };
    
//    const PostProps = [{postId: getPostId}, {userId:getUserId}, {postTitle:getPostTitle}, {postDescription:getPostDescriprion}, {postImgUri: getPostImgUri}, {createdAt: getPostCreatedAt}];
//    const PostProps = [{postId: 1}, {userId:1}, {postTitle:'title'}, {postDescription:'Desc'}, {postImgUri: 'https://images.unsplash.com/photo-1544526226-d4568090ffb8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by'}, {createdAt: '2020.12.12.'}];

    return (
        
        <View>
         { getArticleData[0] /*getPostId*/ != null ?
         <View  style={styles.postContainer}>
            <PostHeader props={[1]}/>
            <PostBody  props={[getArticleData[3], getArticleData[1], getArticleData[2]/*getPostImgUri,getPostTitle, getPostDescriprion*/]} />
            <PostFooter/>
        </View>
        : null }
        </View>           
        
    

    )
}

const PostHeader = ({props}) => {

    return (
        <View style={styles.postHeaderContainer} >
            <View style={styles.postHeaderImgContainer} >
            <Image source={require("../../public/images/profilepic_small.png")} style={styles.postHeaderImg} />
            </View>
            <View style={styles.postHeaderUNameContainer}>
            <Text style={styles.postHeaderUName}>
                {props[0]}
            </Text>       
            </View>
        </View>
    );
}

const PostBody = ({props}) => {
    //const BASE_URI = 'https://source.unsplash.com/random?sig=';
    return(
    <ImageBackground 
            source={{uri: props[0] /*pickedImagePath/*/}} 
            style={styles.postBodyContainer}
            imageStyle={{ borderRadius: 10}}
    >
        <Text style={styles.postBodyHeader}>{props[1]}</Text>
        <Text style={styles.postBodySection}></Text>
        <Text style={styles.postBodyFooter}>{props[2]}</Text>
    </ImageBackground>
    );
}

const PostFooter = ({post}) => {
const { openPanel } = useContext(PanelHandlerContext);
    return(
    <View style={styles.postFooter}>
        <TouchableHighlight style={styles.postFooterBtnContainer}/* underlayColor={'rgba(0,0,0,0.3)'} */onPress={() => {openPanel()}}>
            <FastImage source={require("../../public/images/star.png")} style={styles.postFooterBtnImg}/>
        </TouchableHighlight>                   
        <TouchableHighlight style={styles.postFooterBtnContainer}/* underlayColor={'rgba(0,0,0,0.3)'}*/ onPress={() => {openPanel()}}>
            <FastImage source={require("../../public/images/dots.png")} style={styles.postFooterBtnImg}/>
        </TouchableHighlight>
        <TouchableHighlight style={styles.postFooterBtnContainer} /*underlayColor={'rgba(0,0,0,0.3)'}*/ onPress={() => {openPanel()}}>
            <FastImage source={require("../../public/images/chat-bubble.png")} style={styles.postFooterBtnImg}/>
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
    postContainer: {
        height: Dimensions.get('window').height*0.6,
        backgroundColor: '#ffffff',
        padding: 10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginBottom: 15,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
    },
        postHeaderContainer: {
            flex:1,
            flexDirection:'row',
            padding: 10,
        },
            postHeaderImgContainer:{
                flex:1,
                //backgroundColor: 'red',
            },
            postHeaderImg:{
                aspectRatio: 1,
                height:'100%',
                flex: 1,
            },
            postHeaderUNameContainer: {
                flex:5,
               // backgroundColor: 'yellow',
                justifyContent: 'center',
            },
            postHeaderUName: {
                justifyContent: 'center',
            },
        postBodyContainer:{
            //aspectRatio : 1,
            width: '100%',
            //height: '100%',
            borderRadius: 20,
            flex:10,
            marginBottom: 5,
        },
            postBodyHeader: {
                flex:1,
                fontSize: 40,
                backgroundColor: 'rgba(0,0,0,0.4)',
                color: 'white',
                paddingLeft: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
            },
            postBodySection: {
                flex:2,
                fontSize: 50,
                color: 'white',
                marginLeft: 10,
            },
            postBodyFooter: {
                flex:3,
                fontSize: 15,
                backgroundColor: 'rgba(0,0,0,0.4)',
                color: 'white',
                paddingLeft: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
            },
        postFooter: {
            flex:1,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
            postFooterBtnContainer:{
                alignItems: 'center',
                justifyContent: 'center',
                flex:1,
             },
             postFooterBtnImg:{
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
    

export default Posts