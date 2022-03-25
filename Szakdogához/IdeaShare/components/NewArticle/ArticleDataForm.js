import React, { useState } from "react";
import { View, Text, Platform, TextInput, KeyboardAvoidingView, ScrollView, Image, Dimensions, StyleSheet, TouchableHighlight, TouchableOpacity, Pressable, FlatList } from "react-native";
import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";

const ArticleDataForm = () => {
	const richText = React.useRef();
    const [articleName, setArticleName] = useState('');
    const [articleSmDescr, setArticleSmDescr] = useState('');
    const [articleMDescr, setArticleMDescr] = useState('');
    const [articleType, setArticleType] = useState('');
    const [articleCreatedAt, setArticleCreatedAt] = useState('');
    const [articleUpdatedAt, setArticleUpdatedAt] = useState('');
    
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

    const Submit = () => {
        setArticleCreatedAt(getCurrentDate());
        setArticleUpdatedAt(getCurrentDate());
        const payload = {
            articleName,
            articleSmDescr,
            articleMDescr,
            articleType,
            articleCreatedAt,
            articleUpdatedAt
        };
        fetch(`${global.NodeJS_URL}/api/insert/article`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
        .then(async res => { 
            try {
                if (res.status !== 200) {
                   // console.log('not200');
                } else {
                    const jsonRes = await res.json();
                }
            } catch (err) {
               // console.log(err);
            };
        })
        .catch(err => {
         //   console.log(err);
        });

        //console.log(getTitleName+getSmallDescr+getMainDescr);
    }
    return(
        <View style={styles.container}>
            <Text style={styles.item}>Text</Text>
            <TextInput style={styles.input} onChangeText={setArticleName} placeholder="Title/Name" placeholderTextColor = 'lightgrey' autoCapitalize="none"></TextInput>
            <TextInput style={styles.input} onChangeText={setArticleType} placeholder="Category" placeholderTextColor = 'lightgrey' autoCapitalize="none"></TextInput>

            <TextInput style={styles.input} onChangeText={setArticleSmDescr} placeholder="Small description" placeholderTextColor = 'lightgrey' autoCapitalize="none"></TextInput>
            <Text>Detailed Description: </Text>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}	style={{ flex: 1 }}>
            <ScrollView>
                    <Text>Description:</Text>
                    <RichEditor
                        style={styles.richEditor}
                        useContainer={false}
                        initialHeight={10}
                        onChange={setArticleMDescr}
                        ref={richText}
                        /*onChange={ descriptionText => {
                            console.log("descriptionText:", descriptionText);
                        }}*/
                    />

            </ScrollView>
            </KeyboardAvoidingView>
            <RichToolbar
                editor={richText}
                actions={[ actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1, ]}
                iconMap={{ [actions.heading1]: ({tintColor}) => (<Text style={[{color: tintColor}]}>H1</Text>), }}
            />


                <Text onPress={Submit} style={styles.submitBtn} >Submit</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f2f1e1",
        flex:13,
    },
    item: {
        color: 'black',
    },
    input: {
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: '#0077c2',
        paddingTop: 10,
        fontSize: 16, 
        minHeight: 40,
        color: 'black',

    },
    richEditor: {
        height: 400,
    },
    submitBtn: {
        color: 'black',
        height: 30,
        width: '100%',
        backgroundColor: 'lightblue',
    }
});

export default ArticleDataForm