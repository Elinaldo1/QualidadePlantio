export default class QualidadeSchema{
  
  static schema = {
    name: 'Plantio',
    primaryKey: 'id',
    properties:{
      id: { type: 'int', indexed: true },
      data: 'string',
      matricula: 'string',
      responsavel: 'string',
      amostra: 'int',
      plantadora: 'float',
      lat: 'float',
      long: 'float',
      up: 'float',
      fazenda: 'string',
      turno: 'string',
      esteira: 'string',
      sulco: 'float',
      cobricao: 'float',
      espaco_linha: 'float',
      gemas_total: 'int',
      gemas_viaveis: 'int',
      gemas_inviaveis: 'int',
      toletes: 'int',
      kg_amostra: 'float',
      obs: 'string',
    }
  
}}