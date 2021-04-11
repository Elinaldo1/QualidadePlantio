export default class ParamPlantio{
  
  static schema = {
    name: 'ParamPlantio',
    primaryKey: 'id',
    properties:{
      id: { type: 'int', indexed: true },
      sulco: 'float',
      espaco_linha: 'float',
      cobricao: 'float',
      gemas_v_metro: 'float'

      }
    }}