export default class ParamColhMecanica{
  
  static schema = {
    name: 'ParamColhMecanica',
    primaryKey: 'id',
    properties:{
      id: { type: 'int', indexed: true },
      perda_toleravel: 'string',
      declive: 'string',
      lombo_ent_lin: 'string',
      acamamento: 'string',
      perdas_baixo: 'string',
      perdas_medio: 'string',
      perdas_alto: 'string'
      }
    }
  };