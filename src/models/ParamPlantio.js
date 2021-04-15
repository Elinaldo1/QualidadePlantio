export default class ParamPlantio{
  
  static schema = {
    name: 'ParamPlantio',
    primaryKey: 'id',
    properties:{
      id: { type: 'int', indexed: true },
      sulco: 'string',
      espaco_linha: 'string',
      cobricao: 'string',
      gemas_v_metro: 'string'
      }
    }}