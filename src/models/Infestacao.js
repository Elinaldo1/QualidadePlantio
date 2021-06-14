export default class Infestacao{
  
  static schema = {
    name: 'Infestacao',
    primaryKey: 'id',
    properties:{
      id: { type: 'int', indexed: true },
      data: 'string',
      responsavel: 'string',
      fazenda: 'string',
      up: 'string',
      ponto: 'string',
      talhao: 'string',
      cana: 'string',
      entreno_total: 'string',
      entreno_bc: 'string',
      lat: 'float',
      long: 'float',
    }
  
}}