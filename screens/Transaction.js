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
  render() {
    return (
      <View style={styles.container}>
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