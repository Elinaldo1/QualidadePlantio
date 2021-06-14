export default class SchemaColhMecanica{
  
  static schema = {
    name: 'SchemaColhMecanica',
    primaryKey: 'id',
    properties:{
      id: { type: 'int', indexed: true },
      data: 'string',
      responsavel: 'string',
      talhao: 'string',
      amostra: 'string',
      codFazenda: 'string',
      fazenda: 'string',
      area: 'string',
      colhedora: 'string',
      turno: 'string',
      frente: 'string',
      lider: 'string',
      operador: 'string',
      tolete:'string',
      inteira: 'string',
      estilhaco:'string',
      toco:'string',
      pedaco:'string',
      ponta: 'string',
      perda_ha: 'string',
      obs: 'string',
      lat:'float',
      long:'float',
      }
    }}