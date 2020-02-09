
import 'react-native-gesture-handler';
import React from 'react';
import {ActivityIndicator} from "react-native";
console.disableYellowBox = true;
import {UtilityThemeProvider, Box}from 'react-native-design-utility';
import{images} from './src/themes/images';
import {theme} from './src/themes/theme';
import {  cacheImage} from './src/util/cacheImage';
import Navigate from './src/screens'
import Spinner from "react-native-loading-spinner-overlay";
 class App extends React.Component{
   
  state={
    isReady:false
  }
  componentDidMount(){
    this.cacheAsset()
  }
  cacheAsset=async()=>{
    const imageAssets=cacheImage(Object.values(images));
    await Promise.all([...imageAssets]);

    this.setState({isReady:true})
  }
render() {
  if(!this.state.isReady){
    
    return(
     
         <Spinner color={theme.color.darkBlue} visible={this.state.loading} />
    )
  }
  return(
   <UtilityThemeProvider theme={theme}>
          <Navigate/>
   </UtilityThemeProvider>
  
  );
}

}

export default App



