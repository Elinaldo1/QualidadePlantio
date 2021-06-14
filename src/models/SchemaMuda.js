export default class SchemaMuda{
  
  static schema = {
    name: 'SchemaMuda',
    primaryKey: 'id',
    properties:{
      id: { type: 'int', indexed: true },
      data: 'string',
      responsavel: 'string',
      variedade: 'string',
      fazenda: 'string',
      up:'string',
      colhedora:'string',
      turno:'string',
      amostra:'string',
      tol_menor:'string',
      tol_padrao:'string',
      tol_maior:'string',
      altura_ct:'string',
      tol_bom:'string',
      tol_regular:'string',
      tol_ruim:'string',
      gemas_viaveis:'string',
      gemas_inviaveis:'string',
      obs: 'string', 
      lat: 'float',
      long: 'float',
      }
    }}