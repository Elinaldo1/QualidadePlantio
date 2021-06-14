import Realm from 'realm';
import {
  ConfigServidor,

  Infestacao, ParamColhMecanica, ParamMuda, ParamPlantio,
  QualidadeSchema,
  SchemaColhMecanica, SchemaMuda
} from '../models';

export default function getRealm(){

  return Realm.open({
    schema: [QualidadeSchema, ParamPlantio,
      SchemaMuda, ParamMuda, SchemaColhMecanica,
      ParamColhMecanica, ConfigServidor, Infestacao],
    schemaVersion: 2,
    migration: (oldRealm, newRealm) => {
      if (oldRealm.schemaVersion>1) {
        const oldObjects = oldRealm.objects('schema');
        const newObjects = newRealm.objects('schema');
        for (let i =0; i< oldObjects.length; i++) {
          newObjects[i].otherName = 'otherName';
        }
      }
    },
  });
  
    // .catch(err=>console.log('erroo  '+err))
}


export const excluirRealm = async (data, schema, filtro) => {
  const realm = await getRealm();
  realm.write(() => {
    if(realm.objects(schema).filtered(`${filtro}=${data}`).length>0){
      realm.delete(
        realm.objects(schema).filtered(`${filtro}=${data}`)
      )
    };
  });
}
export const criarEditarRealm = async (data, schema, modified) => {
  const realm = await getRealm();
  if (modified!==null){
    realm.write(async()=>{
      await realm.create(schema, data, 'modified')
    });
  }else{
    realm.write(async()=>{
      await realm.create(schema, data)
      });
  }
};

export const criarRealm = async (data, schema) => {
  const realm = await getRealm();
  realm.write(async()=>{
    await realm.create(schema, data)
    });
};


export const excluirSchemaRealm = async (schema) => {
  const realm = await getRealm();
  realm.write(() => {
      realm.delete(
        realm.objects(schema)
      )
    // };
  });
  alert(schema+' excluído')
}


export const excluirAllObjectsRealm = async () => {
  const realm = await getRealm();
  realm.write(() => {
      realm.deleteAll();
  });
}
