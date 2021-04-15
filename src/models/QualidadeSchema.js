export default class QualidadeSchema{
  
  static schema = {
    name: 'Plantio',
    primaryKey: 'id',
    properties:{
      id: { type: 'int', indexed: true },
      data: 'string',
      matricula: 'string',
      responsavel: 'string',
      variedade: 'string',
      fazenda: 'string',
      up: 'float',
      plantadora: 'float',
      turno: 'string',
      amostra: 'int',
      esteira: 'string',
      kg_amostra: 'string',
      sulco: 'float',
      cobricao: 'float',
      espaco_linha: 'string',
      toletes: 'int',
      gemas_total: 'int',
      gemas_viaveis: 'int',
      gemas_inviaveis: 'int',
      obs: 'string',
      peso_m_tol: 'string',
      tolete_metro: 'string',
      gv_mt: 'string',
      muda_ha: 'string',
      lat: 'float',
      long: 'float',
    }
  
}}