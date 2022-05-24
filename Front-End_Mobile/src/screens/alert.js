import React, { useState, useRef, useReducer, useEffect } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    Image, 
    ScrollView, 
    PanResponder, 
    FlatList, 
    Animated, 
    Touchable, 
    TouchableOpacity,
    PermissionsAndroid, Platform
} from 'react-native'

import RNFetchBlob from 'rn-fetch-blob'

import { Modalize } from 'react-native-modalize'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
 
export const Alert = ({route}) => {
    const modalizeRef = useRef(null);
    const zoomableViewRef = useRef(ReactNativeZoomableView);

    const [alerta, setAlerta] = useState(route.params)

    const onOpen = () => {
      modalizeRef.current?.open();
    };

    const onZoomEndCallBack = () => {
        zoomableViewRef.current?.zoomTo(1)
    }

    useEffect(() => {
        console.warn(alerta.urlImage)
    }, [])

    // download de imagem 
    const downloadImage = () => {
        let date = new Date()
        let image_URL = 'https://i.ibb.co/ysdvtTM/profile-Image.png'
        let ext = getExtention(image_URL)
        ext = '.' + ext[0]
        // Get config and fs from RNFetchBlob
        const {config, fs} = RNFetchBlob
        let PictureDir = fs.dirs.PictureDir
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                // Related to the Android only
                useDownloadManager: true,
                notification: true,
                path: PictureDir + './image_' +
                Math.floor(date.getTime() + date.getSeconds() /2) + ext,
                description: 'Image'
            }
        }
        config(options)
        .fetch('GET', image_URL)
        .then(res => {
            // Showing alert after sucessful downloading
            console.log('res ->', JSON.stringify(res))
            alert('Imagem baixada como sucesso')
        })
    }

    const getExtention = filename => {
        return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined
    }

    const checkPermission = async () => {
        if(Platform.OS === 'ios') {
            downloadImage()
        }else {
           try {
               const granted = await PermissionsAndroid.request(
                   PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                   {
                       title: 'Storage Permission Required',
                       message: 'App needs access to your storage to download Photos'
                   }
               )

               if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //    console.log('Storage Permission Granted.')
                   downloadImage()
               }else {
                    alert('Permissão de armazenamento negada')
               }

           } catch (error) {
                alert('Não foi possível fazer o download')
           } 
        }
    }

    return(
            <View style={styles.container}>
                <ScrollView style={{flex: 1}}>
                    <View style={styles.alertHeader}>
                        <Image
                            source={
                                alerta.amountOfPeople <= 3 ?
                                require('../../assets/img/alerts/AlertaSeguro.png') :
                                alerta.amountOfPeople > 3 && alerta.amountOfPeople <=7 ?
                                require('../../assets/img/alerts/AlertaCuidado.png') :
                                require('../../assets/img/alerts/AlertaPerigo.png')
                            }

                            style={styles.imgAlerta}
                        />
                        <Text style={styles.textAlert}>
                            {
                                alerta.amountOfPeople <= 3 ?
                                'Sem risco no ambiente' :
                                alerta.amountOfPeople > 3 && alerta.amountOfPeople <=7 ?
                                'Muitas pessoas no ambiente' :
                                'Limite de pessoas excedido'
                            }
                        </Text>
                    </View>

                    <ReactNativeZoomableView
                        maxZoom={2}
                        minZoom={0.5}
                        ref={zoomableViewRef}
                        onZoomEnd={onZoomEndCallBack}
                        // bindToBorders={true}
                    >
                        <Image
                            source={{uri: alerta.urlImage}}
                            style={styles.alertImage}
                            width='90%'
                            height={200}
                            resizeMode='contain'
                        />
                    </ReactNativeZoomableView>

                    {/* <ReactNativeZoomableView
                        maxZoom={2}
                        minZoom={0.5}
                        ref={zoomableViewRef}
                        onZoomEnd={onZoomEndCallBack}
                        // bindToBorders={true}
                    >
                        <Image
                            // source={require('../../assets/img/profileImage.png')}
                            source={{uri: 'https://i.ibb.co/ysdvtTM/profile-Image.png'}}
                            style={{width: '90%', height: 300, alignSelf: 'center'}}
                            // resizeMode='contain'
                        />
                     </ReactNativeZoomableView> */}

                    <ScrollView style={styles.containerCards} horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.card}>
                            <Text style={styles.textCardHeader}>Usuários notificados</Text>
                            <Text style={styles.textQuantidade}>225</Text>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.textCardHeader}>Visualizações</Text>
                            <Text style={styles.textQuantidade}>188</Text>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.textCardHeader}>Taxa de envio</Text>
                            <Text style={styles.textQuantidade}>85%</Text>
                        </View>

                        <TouchableOpacity onPress={checkPermission} activeOpacity={0.85} style={styles.card}>
                            <Text style={styles.textCardHeader}>Baixar Frame</Text>
                            <Image 
                                source={require('../../assets/img/download.png')}
                                style={styles.imgDownload}
                            />
                        </TouchableOpacity>
                        
                    </ScrollView>

                </ScrollView>

                <Modalize 
                    ref={modalizeRef}
                    snapPoint={400}
                    modalStyle={{backgroundColor: '#FFF'}}
                    // overlayStyle={{backgroundColor: 'rgba(255, 80, 15, 0.3)'}}
                    useNativeDriver={true}
                    alwaysOpen={60}
                    modalHeight={520}
                    handleStyle={{backgroundColor: '#FF500F'}}
                    
                >
                    <Text style={styles.mainTitle} onPress={onOpen}>Dados do alerta</Text>

                    <View style={styles.modal}>

                        <View style={styles.contentModal}>
                            <Text style={styles.titleItem}>Data</Text>
                            <Text style={styles.descriptionItem}>{alerta.createdDate}</Text>
                        </View>

                        <View style={styles.contentModal}>
                            <Text style={styles.titleItem}>Descrição</Text>
                            <Text style={styles.descriptionItem}>{alerta.description}</Text>
                        </View>
                        <View style={styles.contentModal}>
                            <Text style={styles.titleItem}>Notificação</Text>
                            <Text style={styles.descriptionItem}>Enviada</Text>
                        </View>

                        <View style={[styles.status, { backgroundColor: alerta.status === 1 ? '#E0FEED' : alerta.status === 2 ? '#FFF4CF' : '#FFE7E3' }]}>
                            <Text style={[styles.textStatus, { color: alerta.status === 1 ? '#68CAA0' : alerta.status === 2 ? '#FE9800' : '#EA6367'  }]}>
                                {
                                    alerta.status === 1 ?
                                    'Seguro' :
                                    alerta.status === 2 ?
                                    'Cuidado' : 'Perigo'
                                }
                            </Text>
                        </View>
                    </View>
                </Modalize>
            </View>
    )
}

export default Alert

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F1F1'
    },

    alertHeader: {
        width: '90%',
        height: 60,
        // backgroundColor: '#CCC',
        margin: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between'
    },

    textAlert: {
        color: '#353535',
        fontFamily: 'Montserrat-Bold',
        fontSize: 19,
        marginLeft: 20
    },

    alertImage: {
        alignSelf: 'center',
        maxWidth: '90%',
        marginTop: -20,
        marginBottom: -20
    },


    // flatList / renderItem
    flatList: {
        marginLeft: 20,
        marginTop: 30,
    },

    containerCards: {
        alignSelf: 'center',
        marginBottom: 150
    },

    card: {
        width: 200, 
        height: 120,
        backgroundColor: '#FFF',
        // margin: 30,
        marginLeft: 20,
        marginRight: 10,
        marginTop: 40,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 1,
        elevation: 1,
        marginBottom: 5
    },

    imgAlerta: {
        width: 50,
        height: 50
    },

    imgDownload: {
        tintColor: '#FF761E',
        width: 40,
        height: 40
    },

    textCardHeader: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        color: '#353535'
    },

    textQuantidade: {
        fontSize: 35,
        fontFamily: 'Montserrat-Bold',
        color: '#FF500F'
    },


    mainTitle: {
        fontSize: 17,
        color: '#FF761E',
        fontFamily: 'Montserrat-Bold',
        marginTop: 15,
        textAlign: 'center'
    },

    sliderCard: {
        width: '90%',
        height: 350,
        backgroundColor: '#FFF',
        position: 'absolute',
        alignSelf: 'center',
        top: 500,
        elevation: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        color: '#959595'
    },

    modal: {
        width: '100%',
        height: 420,
        // backgroundColor: '#CCC',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 10
    },

    contentModal: {
        width: '100%',
        height: '25%',
        backgroundColor: '#FFF',
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 20,
    },

    titleItem: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
        marginBottom: 5,
        color: '#737373'
    },

    descriptionItem: {
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        color: '#A6A4AE'
    },

    itemModal: {
        width: 170,
        height: 110,
        backgroundColor: 'lightblue'
    },

    status: {
        width: '90%',
        height: 44,
        backgroundColor: '#DDFBEA',
        marginTop: 10,
        borderRadius: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textStatus: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 17,
        color: '#58BA90',
        textTransform: 'uppercase'
    }

})