import respPWA from './../../middlewares/respPWA.handler.js';
import { functionsDic } from '../../middlewares/queryDic.js';

const { OK, FAIL, BITACORA, DATA, AddMSG } = respPWA;

export const crudErrores = async (params, body) => {
  let bitacora = BITACORA();

  const { queryType, LoggedUser, dbServer } = params;

  try {
    if (!functionsDic[queryType]) {
      const err = new Error(`Unsupported queryType: ${queryType}`);
      err.statusCode = 402;
      throw err;
    }
    if (!LoggedUser || !dbServer || !queryType) {
      const err = new Error('No queries proporcionados');
      err.statusCode = 512;
      throw err;
    }

    bitacora = await functionsDic[queryType](params, bitacora, body);

    return OK(bitacora);
  } catch (errorBita) {
    console.log(`error vato: ${errorBita.message}`);
    bitacora.success = false;
    bitacora.status = errorBita.statusCode;
    bitacora.messageUSR = errorBita.message; // process: '';
    bitacora.messageDEV = errorBita.message;
    bitacora.countData = 0;
    bitacora.dbServer = dbServer || 'not provided';
    // bitacora.data: [];
    bitacora.loggedUser = LoggedUser || 'not provided'; // server: '';
    bitacora.finalRes = true;
    return FAIL(bitacora);
  }
};
