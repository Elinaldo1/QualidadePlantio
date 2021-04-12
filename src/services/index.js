import Realm from 'realm';
import { ParamPlantio, QualidadeSchema } from '../models';




export default function getRealm(){

  return Realm.open({
    schema: [QualidadeSchema,ParamPlantio]
  });
}




