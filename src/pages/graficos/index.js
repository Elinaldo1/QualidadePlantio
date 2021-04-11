import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { CustomBarChart } from '../../components/graficos/CustomBarChart';
import { CustomProgressChart } from "../../components/graficos/customProgressChart";
import Header from '../../components/header/index';
import { dadosGrafico } from '../../Helpers/dadosGrafico';
import { Styles } from './styles';



export default function Grafico() {

  const [dimensaoGafico1, setdimensaoGrafico1] = useState(null);
  const [dimensaoGafico2, setdimensaoGrafico2] = useState(null);
  const [dimensaoGafico3, setdimensaoGrafico3] = useState(null);

  return(
    <>
      <View style={Styles.container }>

        
      <View 
            onLayout = {({ nativeEvent: { layout:{width, height},},}) =>setdimensaoGrafico1({width, height})}
            style = { Styles.grafico} >
          <CustomBarChart
            data = {dadosGrafico}
             chartDimensions = {dimensaoGafico1}
          >
            
          </CustomBarChart>
          
          <AntDesign name="swap" style={{fontSize:30}} ></AntDesign>
           <Header caption= 'Graficos1'/>
      </View>

      <View 
            onLayout = {({ nativeEvent: { layout:{width, height}}}) => setdimensaoGrafico2({width, height})}
            style = { [Styles.grafico, Styles.boxgrafico2]}
      >
          <CustomProgressChart
            data = {0.75} 
            chartDimensions = {dimensaoGafico2}
            
          />
          <Text></Text>
       
      </View>

      <View 
            onLayout = {({ nativeEvent: { layout:{width, height}}}) => setdimensaoGrafico3({width, height})}
            style = {Styles.grafico} >
          <CustomBarChart
            data = {dadosGrafico} 
            chartDimensions = {dimensaoGafico3}
          />
      </View>
      <View 
            onLayout = {({ nativeEvent: { layout:{width, height}}}) => setdimensaoGrafico3({width, height})}
            style = {Styles.grafico} >
          <CustomBarChart
            data = {dadosGrafico} 
            chartDimensions = {dimensaoGafico3}
          />
      </View>
      <View 
            onLayout = {({ nativeEvent: { layout:{width, height}}}) => setdimensaoGrafico3({width, height})}
            style = {Styles.grafico} >
          <CustomBarChart
            data = {dadosGrafico} 
            chartDimensions = {dimensaoGafico3}
          />
      </View>
      <View 
            onLayout = {({ nativeEvent: { layout:{width, height}}}) => setdimensaoGrafico3({width, height})}
            style = {Styles.grafico} >
          <CustomBarChart
            data = {dadosGrafico} 
            // chartDimensions = {dimensaoGafico3}
          />
      </View>
      <View 
            onLayout = {({ nativeEvent: { layout:{width, height}}}) => setdimensaoGrafico3({width, height})}
            style = {Styles.grafico} >
          <CustomBarChart
            data = {dadosGrafico} 
            // chartDimensions = {dimensaoGafico3}
          />
      </View>
      </View>
  </>
  
  )
}