import React from 'react';
import { ActivityIndicator } from 'react-native';
import { BarChart } from 'react-native-svg-charts';



export function CustomBarChart(chartData, chartDimensions) {
        const fill = 'rgb(175, 220, 129, 0.7)'
         const dadosGrafico = [3.5, 5, 2, 3]
         const data = [50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80]

        return chartDimensions ? (
            <BarChart
                data= {chartData.data}
                svg={{ fill }}//cor das barras
                spacingInner = {0.25}//espaço entre as barras
                yMin = {0}//considera 0 como valor mínimo do eixo y
                yAccessor = {({item})=> item.value}//quando data for um vetor de ojts yacessor me retorna o item que será o valor da barra(item.value do vetor Helpers/dadosGrafico). 
                style = {{
                  //  height:200,
                  //  width:300,
                    flex:1,
                    height: chartDimensions.height,
                    width: chartDimensions.width ,
                   borderRadius: 8,
                  //  borderWidth:1
                }} 
               // contentInset={{ top: 30, bottom: 10 }}>
                >
            </BarChart>
         ): <ActivityIndicator size = "large" color= "#f11"/>
       }

