import React from 'react';
import {ActivityIndicator} from 'react-native';

import { ProgressCircle, Grid } from 'react-native-svg-charts';


export function CustomProgressChart(chartData, chartDimensions) {
        const fill = 'rgb(175, 220, 129, 0.7)'
         const dadosGrafico = [3.5, 5, 2, 3]
         const data = [50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80]

        return chartDimensions ? (
            <ProgressCircle
                progress = {chartData.data}
                progressColor = {"rgba(175, 23,202)"}
                backgroundColor = {"#1111"}
                strokeWidth = {15}
                style = {{
                   flex:1,
                   
                    height: chartDimensions.height,
                    width: chartDimensions.width ,
                   borderRadius: 8,
                }} 
               // contentInset={{ top: 30, bottom: 10 }}>
                >
            </ProgressCircle>
         ): <ActivityIndicator size = "large" color= "#f11"/>
       }