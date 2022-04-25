import React, { useState, useRef, useEffect, useMemo, useCallback, useContext } from "react";
import { View, Keyboard, ScrollView, Text, TextInput, Image, Dimensions, StyleSheet, TouchableOpacity, Pressable, FlatList, ImageBackground, KeyboardAvoidingView } from "react-native";
import ScrollableModal from "../globals/ScrollableModal";
import { PanelHandlerContext } from "../globals/Context";
import { requestCameraPermission, requestStoragePermission } from "../globals/PermRequests";
import * as ImagePicker from 'react-native-image-picker';
import Animated, { useSharedValue, useAnimatedStyle, Easing, withSpring, withTiming } from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createGlobalState } from 'react-hooks-global-state';
import { useFocusEffect } from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import ContentLoader, { Facebook, Circle, Rect } from 'react-content-loader/native'
import Toast from 'react-native-toast-message';

//import 'react-native-gesture-handler';

//import WebView from "react-native-webview";
//import { RichEditor } from "react-native-pell-rich-editor";


const initialState = { scrollUnlock: true, edit: false, userId: '', articleId: '', articleName: '', articleSmDescr: '', articleMDescr: '', articleImg: '', articleType: '', articleUpdatedAt: '' };
const { useGlobalState } = createGlobalState(initialState);

var flatListHeight = 0;
var globalTextInputRef = null;
var cardNumberGlobal = null;
var lastFetchedArticleItemId = 1;
var articleData = [];
var userId = null;
var isKeyboardOpen = false;
var articleUpdatedAt = null;
var articleId = null;
var scrollOffsetVar = "0";

const Articles = ({searchedStr}) => {
    //Toast message
    const showToast = (type,text1,text2) => {
        Toast.show({
          type: type,
          text1: text1,
          text2: text2,
          position: 'bottom'
        });
    }

    //Modal
    const [isModalVisible, setModalVisible] = useState(false);

    const panelHandlerContext = useMemo(() => ({
        openPanel: (id) => {
            articleId = id;
            setModalVisible(true);
        },
         closePanel: () => {
            setModalVisible(false);
        },
    }));

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
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
    const flatlistRef = useRef();
    const [data, setData] = useState ([]);
    const [getArticleData, setArticleData] = useState([]);
    const [getLastFetchedArticleItemId, setLastFetchedArticleItemId] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('id').then((id) => {
            userId = id;
            if (searchedStr != ''){
                setIsSearch(true);
                fetchMore(true,true,searchedStr)
            }else{
                fetchMore(true);
            }
        })
    }, [searchedStr]);

    //ScrollToIndex
    const scrollToIndex = (cardNumber) => {
        if ( flatlistRef.current != null && data !=[''] ) {
            flatlistRef.current.scrollToIndex({
                animated: true,
                index: cardNumber,
                viewPosition: 0
            })
        }

        if (globalTextInputRef != undefined) {
            globalTextInputRef.blur();
        }
    }

    //ScrollOffset
    const ScrollToOffset = (o,a) => {
        if ( flatlistRef.current != null && data !=['']) {
            flatlistRef.current.scrollToOffset({
                animated: a,
                offset: Number(o)
            })
        }
    }

    //get scroll position
    onScroll = (event) => {
        scrollOffsetVar = event.nativeEvent.contentOffset.y;
    }

    //when screen unfocused(return) or focused: get/store scroll position; and listen to keyboard: scroll back to top of the card if keyboard is closed
    useFocusEffect(
        //when the screen is focused

        React.useCallback(() => {
            AsyncStorage.getItem('scrollOffsetUsersArticles').then((offset) => {
                ScrollToOffset(offset,false);
            })

            const keyboardShowListener = Keyboard.addListener(
                'keyboardDidShow',
                () => {
                }
            );

            const keyboardHideListener = Keyboard.addListener(
                'keyboardDidHide',
                () => {
                    if ( articleData != [] ) {
                        scrollToIndex(cardNumberGlobal);
                    }
                }
            );

            // when the screen is unfocused
             // Useful for cleanup functions
            return () => {
                AsyncStorage.setItem('scrollOffsetUsersArticles', scrollOffsetVar.toString());
                
                keyboardHideListener.remove();
                keyboardShowListener.remove();
            };

        }, []));

    const fetchMore = (refreshing, isSearch, searchedStr) => {
        if (refreshing == true) {
            setIsLoading(true);
            lastFetchedArticleItemId = 1;
            //setArticleData([]);////state-es articledata-hoz
            setData([]); 
            articleData = [];
        }
        if (isSearch){
            fetch(`${global.NodeJS_URL}/api/get/mobile/article/search/byId`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'item' : lastFetchedArticleItemId,
                    'userId' : userId,
                    'searchedString' : searchedStr,
                },
            })
            .then(async res => { 
                try {
                    if (res.status !== 200) {
                        const jsonRes = await res.json();
                        found=false;
                        setIsLoading(false);
                        if (data == ''){ //if there isn't already loaded results
                            showToast('error','Error',jsonRes.message);
                        }
                    } else {
                        setIsLoading(false);
                        const jsonRes = await res.json();
                        found=true;
                        var articleResultId = 0;
                        //let adata = [...getArticleData]; //state-es articledata-hoz
                        if (articleData.length != 0 && articleData.length % 20 != 0 ){

                        }else{
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
                    }
                } catch (err) {
                    if (data == ''){ //if there isn't already loaded results
                        setIsLoading(false);
                        showToast('error','Error',err.toString());
                    }
                // console.log(err);
                };
            })
            .catch(err => {
                if (data == ''){ //if there isn't already loaded results
                    setIsLoading(false);
                    showToast('error','Error',err.toString());
                }
            // throw err;
            // console.log(err);
            });    
            
            

        }else{


            fetch(`${global.NodeJS_URL}/api/get/article/byId`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'item' : lastFetchedArticleItemId,
                    'userId' : userId,
                },
            })
            .then(async res => { 
                try {
                    if (res.status !== 200) {
                        const jsonRes = await res.json();
                        found=false;
                        setIsLoading(false);
                        if (data == ''){ //if there isn't already loaded results
                            showToast('error','Error',jsonRes.message);
                        }
                    } else {
                        setIsLoading(false);
                        const jsonRes = await res.json();
                        found=true;
                        var articleResultId = 0;
                        //let adata = [...getArticleData]; //state-es articledata-hoz
                        for (articleResultId = 0; articleResultId < jsonRes.length; articleResultId++){
                            //adata.push(jsonRes[articleResultId]); //state-es articledata-hoz
                            articleData.push(jsonRes[articleResultId]);
                        };
                            //setArticleData(adata);//,()=>         console.log("setState completed", this.state)); //state-es articledata
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
                    if (data == ''){ //if there isn't already loaded results
                        setIsLoading(false);
                        showToast('error','Error',err.toString());
                    }
                // console.log(err);
                };
            })
            .catch(err => {
                if (data == ''){ //if there isn't already loaded results
                    setIsLoading(false);
                    showToast('error','Error',err.toString());
                }
            // throw err;
            // console.log(err);
            });    


        }
    };

    const [getScrollUnlock, setScrollUnlock] = useGlobalState('scrollUnlock');

    const renderItem = useCallback(
        ({item}) => (
            
            <>
                <Text style={styles.emptycard}></Text>
                { articleData[item-1] != [] && articleData[item-1] != undefined && articleData[item-1].ArticleStatus >= 0  ? 
                    <Article item={item} scrollToIndex={scrollToIndex} /*data={getArticleData}*//>
                : null} 
            </>
        ),
    []);

    //const keyExtractor = useCallback((item) => item.toString(),[])
    const keyExtractor = useCallback(e => e,[]);

    const find_dimesions = (layout) => {
        const {x, y, width, height} = layout;
        flatListHeight = height;
      }

      const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
        console.log("Visible items are", viewableItems);
        console.log("Changed in this iteration", changed);
    }, []);

    return(
        <PanelHandlerContext.Provider value={panelHandlerContext}>
        <View style={styles.container} onLayout={(event) => { find_dimesions(event.nativeEvent.layout) }}>
        <ScrollableModal isVisible={isModalVisible} onSwipeComplete={toggleModal} id={articleId} content='comments'/>
        { isLoading && <><LoadingPlaceholder style={{flex: 1}}/><LoadingPlaceholder style={{flex: 1}}/></> }
            <FlatList
                scrollEnabled = {getScrollUnlock}
                data={data}
                ref={flatlistRef /*(ref) => {
                    globalRef = ref;
                  }*/}
                //onViewableItemsChanged={onViewableItemsChanged}
                onScroll={onScroll}
                onEndReachedThreshold={2}
                onEndReached={() => fetchMore(false, isSearch, searchedStr)}
                style={{flex: 1}}
                //removeClippedSubviews = {false}
                //updateCellsBatchingPeriod = {10}
                initialNumToRender = {2}
                maxToRenderPerBatch={3}
                windowSize={5}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                onRefresh={() => fetchMore(true, isSearch, searchedStr)}
                refreshing={false}
                getItemLayout={(data, index) => (
                    {length: 515, offset: 515 * index, index}
                    )}
                /*ListHeaderComponent={this.renderHeader}*/
                />
        </View>
        </PanelHandlerContext.Provider>
    )
}

const LoadingPlaceholder = () => (
    <ContentLoader foregroundColor="#ada585"/*"#9b957d"*/ backgroundColor="#b8b094"/*"#ada585"*/ width="100%" height="500">
        <Circle cx="10%" cy="7%" r="4%" />
        <Rect x="20%" y="6%" rx="1" ry="1" width="20%" height="2%" />

        <Rect x="3%" y="12%" rx="10" ry="10" width="94%" height="75%" />

        <Rect x="22%" y="91%" rx="5" ry="5" width="8%" height="5%" />
        <Rect x="70%" y="91%" rx="5" ry="5" width="8%" height="5%" />

    </ContentLoader>
  )

class Article extends React.PureComponent {    

    render() {

        const {item} = this.props;
        const {scrollToIndex} = this.props;
        //const {data} = this.props;
        return(
            <ArticleFunc item={item} scrollToIndex={scrollToIndex}/*data={data[item-1]}*//>
        )
    }
}
/*
const Article = ({item,data}) => {
    console.log("data: " + data);
    return(
        <ArticleFunc item={item}/>
)}*/
const ArticleFunc = ({item, scrollToIndex}) => {

item=item-1;

    
    const [getScrollUnlock, setScrollUnlock] = useGlobalState('scrollUnlock');
    const [getIfEdit, setIfEdit] = useGlobalState('edit');
    //const [getArticleData, setArticleData] = useState([data.ArticleImg, data.ArticleName, data.ArticleSmDescr]);
    //const [getArticleData, setArticleData] = useState([articleData[item].ArticleId, articleData[item].ArticleImg, articleData[item].ArticleName, articleData[item].ArticleSmDescr, articleData[item].ArticleMDescr]);
    
    const [getIfZoomed, setIfZoomed] = useState(false);

    //const [getArticleStylesForNextAnimation, setArticleStylesForNextAnimation] = useState({height:500, padding: 10, paddingTop:5, borderRadius: 10})
    const articleStylesForNextAnimation = useRef({height:500, padding: 10, paddingTop:5, borderRadius: 10});

    const animation = useSharedValue(articleStylesForNextAnimation.current);

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

    const ZoomIt = () => {
        if ( getIfZoomed == false) {
            [
                animation.value = {height: flatListHeight, padding:0, marginBottom: 0, paddingTop:0, borderRadius: 0},
                //setArticleData([data.ArticleImg, data.ArticleName, data.ArticleMDescr]),
                //setArticleData([articleData[item].ArticleImg, articleData[item].ArticleName, articleData[item].ArticleMDescr]),
                //setArticleStylesForNextAnimation({height: flatListHeight, padding:0, paddingTop:0, borderRadius:0}),
                articleStylesForNextAnimation.current = {height: flatListHeight, padding:0, paddingTop:0, borderRadius:0},
                setIfZoomed(true),
                setScrollUnlock(false),
            ]
        }else{
            [
                animation.value = {height:500, padding: 10, marginBottom: 15, paddingTop:5, borderRadius:10},
                //setArticleData([data.ArticleImg, data.ArticleName, data.ArticleSmDescr]),
                //setArticleData([articleData[item].ArticleImg, articleData[item].ArticleName, articleData[item].ArticleSmDescr]),
                //setArticleStylesForNextAnimation({height:500, padding: 10, paddingTop:5, borderRadius:10}),
                articleStylesForNextAnimation.current = {height:500, padding: 10, paddingTop:5, borderRadius:10},
                setIfZoomed(false),
                setScrollUnlock(true),
            ]
        }
    }

    return (
        <>
            <Animated.View style={[styles.articleContainer, animatedStyles]}>
                <TouchableOpacity activeOpacity={0.9} style={styles.articleBodyContainer} onPress={() => ([ZoomIt(), scrollToIndex(item)])}>    
                    <ArticleBody
                        onLayout={(event) => {this.find_dimension(event.nativeEvent.layout)}}
                        props={[item, getIfZoomed, getIfEdit]}
                        />
                </TouchableOpacity>
                <ArticleFooter props={[item]}/>
            </Animated.View>
        </>           
    )
}

const ArticleBody = ({props}) => {
    const [articleId, setArticleId] = useGlobalState('articleId');
    const [articleName, setArticleName] = useGlobalState('articleName');
    const [articleSmDescr, setArticleSmDescr] = useGlobalState('articleSmDescr');
    const [articleMDescr, setArticleMDescr] = useGlobalState('articleMDescr');

    useEffect(() => {
        if (props[2] === true && articleId === articleData[props[0]].ArticleId) {
            setArticleName(articleData[props[0]].ArticleName);
            setArticleSmDescr(articleData[props[0]].ArticleSmDescr);
            setArticleMDescr(articleData[props[0]].ArticleMDescr);            
        }
    }, [props[2]]);

    
    return(
            <ImageBackground 
            source={{uri: articleData[props[0]].ArticleImg /*pickedImagePath/*/}} 
            style={styles.articleBodyContainer}
            imageStyle={{ borderRadius: 10}}
        >
            
            { props[2] === true && articleId === articleData[props[0]].ArticleId ?
                <TextInput multiline={true} style={[styles.articleBodyHeader]} onChangeText={setArticleName} maxLength={20}>{articleName}</TextInput>
            :
                <Text style={styles.articleBodyHeader}>{articleData[props[0]].ArticleName}</Text>
            }
            { props[1] === false ?
                    <View style={styles.articleBodyFooter} onStartShouldSetResponder={() => false}>
                    { props[2] === true && articleId === articleData[props[0]].ArticleId ?
                        <TextInput multiline={true}  ref={(ref) => {globalTextInputRef = ref}} style={styles.textInput} onChangeText={setArticleSmDescr}  maxLength={100}>{articleSmDescr}</TextInput>
                    :
                        <Text style={styles.articleBodyFooterText}>{articleData[props[0]].ArticleSmDescr}</Text>
                    }
                    </View>
            :
                <ScrollView style={styles.articleBodyFooter} contentContainerStyle={{flexGrow: 1}} onStartShouldSetResponder={() => true}>
                        { props[2] === true && articleId === articleData[props[0]].ArticleId ?
                             <TextInput multiline={true} ref={(ref) => {globalTextInputRef = ref}} tyle={styles.textInput} onChangeText={setArticleMDescr} maxLength={1000}>{articleMDescr}</TextInput>
                        /*    <RichEditor
                        style={styles.articleBodyFooterTextInput}
                        useContainer={false}
                        initialHeight={10}
                        onChangeText={setArticleMDescr}
                        initialContentHTML = {articleData[props[0]].ArticleMDescr}
                    />*/
                        :
/*                             <View onStartShouldSetResponder={() => true}>
                            <RenderHtml
                                style={styles.articleBodyFooterText}
                                contentWidth={Dimensions.get("window").width}
                                source={{html: articleData[props[0]].ArticleMDescr}}
                                />
                            </View> */
                            <Text style={styles.articleBodyFooterText}>{articleData[props[0]].ArticleMDescr}</Text>
                        }  
                </ScrollView>
            }
        </ImageBackground>
    );
}

const ArticleFooter = ({props}) => {
    const { openPanel } = useContext(PanelHandlerContext);
    const [getIfEdit, setIfEdit] = useGlobalState('edit');

    const [userId, setUserId] = useGlobalState('userId');
    const [articleId, setArticleId] = useGlobalState('articleId');
    const [articleName, setArticleName] = useGlobalState('articleName');
    const [articleSmDescr, setArticleSmDescr] = useGlobalState('articleSmDescr');
    const [articleMDescr, setArticleMDescr] = useGlobalState('articleMDescr');
    const [articleImg, setArticleImg] = useGlobalState('articleImg');
    const [articleType, setArticleType] = useGlobalState('articleType');

    useEffect(() => {
        AsyncStorage.getItem('id').then((id) => {
            setUserId(id);
        })
    }, []);

    const showToast = (type,text1,text2) => {
        Toast.show({
          type: type,
          text1: text1,
          text2: text2,
          position: 'bottom'
        });
    }

    const getCurrentDate=()=>{

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var hours = new Date().getHours();
        var minutes = new Date().getMinutes();
        var seconds = new Date().getSeconds();
  
        //Alert.alert(date + '-' + month + '-' + year);
        // You can turn it in to your desired format
        return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;//format: dd-mm-yyyy;
  }

    const Submit = (status) => {
        console.log("ing" + articleImg);

        if( articleName == '' || articleSmDescr == '' || articleMDescr == '' ) {
            showToast('info','Info','Please fill all the required fields');
        }else{
            articleStatus = status;
            // console.log(articleStatus);
            articleUpdatedAt = getCurrentDate();
            const payload = {
                userId,
                articleId,
                articleName,
                articleSmDescr,
                articleMDescr,
                articleImg,
                articleType,
                articleStatus,
                articleUpdatedAt
            };
            fetch(`${global.NodeJS_URL}/api/update/article/byUser`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            .then(async res => { 
                try {
                    if (res.status !== 200) {
                        const jsonRes = await res.json();
                        //console.log(jsonRes);
                        showToast('error','Error',jsonRes.message);
                    } else {
                        const jsonRes = await res.json();
                        articleData[props[0]].ArticleName = articleName;
                        articleData[props[0]].ArticleSmDescr = articleSmDescr;
                        articleData[props[0]].ArticleMDescr = articleMDescr;
                        articleData[props[0]].ArticleImg = articleImg;
                        setIfEdit(prevState => !prevState);
                        showToast('success','Success',jsonRes.message);
                        //fetchMore(true);
                    }
                } catch (err) {
                    showToast('error','Error',err.toString());
                    //console.log(err);
                };
            })
            .catch(err => {
                showToast('error','Error',err.toString());
                //console.log(err);
            });
        }

       // console.log(userId+articleName+articleSmDescr+articleMDescr);
    }

    return(
    <>
        { getIfEdit == true && articleId === articleData[props[0]].ArticleId ?
        <View style={styles.articleFooter}>
        <TouchableOpacity activeOpacity={0.5} style={styles.articleFooterBtnContainer} /*underlayColor={'rgba(0,0,0,0.3)'}*/ onPress={() => {Submit(-2)}}>
            <MaterialCommunityIcons name="delete" color="#4d4a42" size={30} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} style={styles.articleFooterBtnContainer} /*underlayColor={'rgba(0,0,0,0.3)'}*/ onPress={() => {setIfEdit(prevState => !prevState)}}>
            <MaterialCommunityIcons name="close" color="#4d4a42" size={30} />
        </TouchableOpacity>
       {/*  <TouchableOpacity activeOpacity={0.5} style={styles.articleFooterBtnContainer} /*underlayColor={'rgba(0,0,0,0.3)'}*//* onPress={() => {openPanel()}}>
            <MaterialCommunityIcons name="image-edit" color="#4d4a42" size={30} />
        </TouchableOpacity> */}
        <TouchableOpacity activeOpacity={0.5} style={styles.articleFooterBtnContainer} /*underlayColor={'rgba(0,0,0,0.3)'}*/ onPress={() => {Submit(1)}}>
            <MaterialCommunityIcons name="content-save" color="#4d4a42" size={30} />
        </TouchableOpacity>
        </View>      
    : getIfEdit == false ?
    <View style={styles.articleFooter}>
        <TouchableOpacity activeOpacity={0.5} style={styles.articleFooterBtnContainer} /*underlayColor={'rgba(0,0,0,0.3)'}*/ onPress={() => {openPanel(articleData[props[0]].ArticleId)}}>
            <MaterialCommunityIcons name="comment" color="#4d4a42" size={30} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} style={styles.articleFooterBtnContainer} /*underlayColor={'rgba(0,0,0,0.3)'}*/ onPress={() => {[cardNumberGlobal = props[0], setIfEdit(prevState => !prevState), setArticleId(articleData[props[0]].ArticleId),setArticleImg(articleData[props[0]].ArticleImg),setArticleType(articleData[props[0]].ArticleType)]}}>
            <MaterialCommunityIcons name="pencil" color="#4d4a42" size={30} />
        </TouchableOpacity>       
    </View>
    :null
    }
                       
    </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 13,
        backgroundColor: "#cec8b0", //'#8aacc8',
        //paddingTop: getStatusBarHeight(),
        borderRadius: 10,
        overflow: 'hidden',
    },
    articleContainer: {
        height: 500,
     //   height: Dimensions.get('window').height*0.6,
        backgroundColor: '#f2f1e1',
        borderRadius: 10,
        marginBottom: 15,
        padding: 10,
        paddingBottom: 10,  //overrides the animation of "padding"
        marginTop: -1,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 10,
    },
    textInput: {
        height: '100%',
        textAlignVertical: 'top',
    },
    textInputHeader: {
        height: '80%',
        textAlignVertical: 'top',
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
                backgroundColor: 'rgba(0,0,0,0.55)',
                color: 'white',
                paddingLeft: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
            },
            articleBodyFooter: {
                flex:3,
                fontSize: 15,
                backgroundColor: 'rgba(0,0,0,0.55)',
                color: 'white',
                paddingLeft: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
            },
                articleBodyFooterText: {
                    color:'white'
                },
                articleBodyFooterTextInput: {
                    height: '100%',
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
    emptycard: {
        height: 1,
    }
});
    

export default Articles