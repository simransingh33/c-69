import React, { Component } from "react";
import { View, Text, StyleSheet,TouchableOpacity} from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";


export default class TransactionScreen extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      domState:"normal",
      hasCameraPermissions:null,
      scanned:false,
      scannedData:""
    }
  }
  getCameraPermissions=async(domState)=>{
     const {status}=Permissions.askAsync(Permissions.CAMERA);
     this.setState({
       domState:domState,
       hasCameraPermissions:status==="granted",
       scanned:false
     })
  }
  handleBarCodeScanned =async ({ type, data }) =>{
    this.setState({
      scannedData:data,domState:"normal",scanned:true
    })
  } 
  render() {
    const {domState,hasCameraPermissions,scanned,scannedData}=this.state
    if(domState==="scanner"){
      return(
        <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        />
      )
      
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {hasCameraPermissions?scannedData:"request for camera permissions"}
        </Text>
        <TouchableOpacity
        style={styles.button}
        
        onPress={()=>{
          this.getCameraPermissions("scanner")
        }}>
        <Text style={styles.text}>Scan QR code</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple"
  },
  text: {
    color: "black",
    fontSize: 30
  },
  button:{
    width:'45%',
    height:55,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"yellow",
    borderRadius:15
  }
});