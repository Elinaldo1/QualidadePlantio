import Realm from 'realm';
import { ParamPlantio, QualidadeSchema } from '../models';




export function getRealm(){

  return Realm.open({
    schema: [QualidadeSchema,ParamPlantio]
  });
}




