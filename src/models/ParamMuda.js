export default class ParamMuda{
  
  static schema = {
    name: 'ParamMuda',
    primaryKey: 'id',
    properties:{
      id: { type: 'int', indexed: true },
      comp_tolete: 'string',
      altura_corte: 'string',
      tam_amostra: 'string',
      qualidade_tolete: 'string',
      tolete_bom: 'string',
      tolete_regular: 'string',
      tolete_ruim: 'string'
      }
    }}