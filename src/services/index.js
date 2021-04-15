import Realm from 'realm';
import { ParamPlantio, QualidadeSchema } from '../models';




export default function getRealm(){

  return Realm.open({
    schema: [QualidadeSchema,ParamPlantio],
    schemaVersion: 1,
    migration: (oldRealm, newRealm) =>{
      // if (oldRealm.schemaVersion<1) {
      //   const oldObjects = oldRealm.objects('schema');
      //   const newObjects = newRealm.objects('schema');

      //   for (let i =0; i< oldObjects.length; i++) {
      //     newObjects[i].otherName = 'otherName';
      //   }
      // }
    },
  });
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
