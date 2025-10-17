import respPWA from './../../middlewares/respPWA.handler.js';
import { functionsDic } from '../../middlewares/queryDic.js';

const { OK, FAIL, BITACORA, DATA, AddMSG } = respPWA;

export const crudErrores = async (params, body) => {
  let bitacora = BITACORA();

  const { queryType, LoggedUser, dbServer } = params;

  // let result;
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

    bitacora = await functionsDic[queryType](params, bitacora);
    // switch (queryType) {
    //   case 'getAll':
    //     //OBTENER LA DATA CON EL CONTROLADOR PARA ERRORES
    //     result = await zterrorlogService.GetAllErrors();
    //     result = JSON.parse(result); //PARSEAR RESULTADO A JSON

    //     //ASIGNAR LOS CAMPOS Y VALORES A BITACORA
    //     bitacora.data.push(result.data);
    //     bitacora.countData = result.results;
    //     bitacora.success = true;
    //     bitacora.status = 200;
    //     bitacora.loggedUser = LoggedUser;
    //     bitacora.finalRes = true;
    //     bitacora.dbServer = dbServer;
    //     break;

    //   case 'getOne':
    //     if (!id) throw new Error('Missing ID parameter');
    //     bitacora = await zterrorlogService.GetOneError(id);
    //     break;

    //   case 'add':
    //     if (whatTypeVarIs(body.data) === 'isObject') {
    //       const error = body.data;
    //       const result = await zterrorlogService.InsertOneError(error);
    //       if (result) {
    //         //ASIGNAR LOS CAMPOS Y VALORES A BITACORA
    //         bitacora.data.push(error);
    //         bitacora.countData = 1;
    //         bitacora.success = true;
    //         bitacora.status = 201;
    //         bitacora.loggedUser = LoggedUser;
    //         bitacora.finalRes = true;
    //         bitacora.dbServer = dbServer;
    //       }
    //       return;
    //     }
    //     const errors = body.data;
    //     const promesas = errors.map((error) =>
    //       zterrorlogService.InsertOneError(error)
    //     );

    //     try {
    //       const resultados = await Promise.all(promesas);
    //       resultados.forEach((resultado) => bitacora.data.push(resultado));
    //       bitacora.countData = resultados.length;
    //       bitacora.success = true;
    //       bitacora.status = 201;
    //       bitacora.loggedUser = LoggedUser;
    //       bitacora.finalRes = true;
    //       bitacora.dbServer = dbServer;
    //     } catch (errorBita) {
    //       bitacora.countData =errors.length;
    //       bitacora.success = false;
    //       bitacora.status = 589;
    //       bitacora.loggedUser = LoggedUser;
    //       bitacora.finalRes = true;
    //       bitacora.dbServer = dbServer;
    //       return FAIL(bitacora);
    //     }

    //     break;

    //   default:
    //     throw new Error(`Unsupported queryType: ${queryType}`);
    // }

    return OK(bitacora);
  } catch (errorBita) {
    console.log(`error vato: ${errorBita.message}`);
    bitacora.success = false;
    bitacora.status = errorBita.statusCode;
    bitacora.messageUSR = errorBita.message; // process: '';
    bitacora.messageDEV = errorBita.message;
    bitacora.countData = 0;
    // bitacora.// countDataReq: 0;
    // bitacora.// countDataRes: 0;
    // bitacora.// countMsgUSR: 0;
    // bitacora.// countMsgDEV: 0;
    bitacora.dbServer = dbServer || 'not provided';
    // bitacora.data: [];
    bitacora.loggedUser = LoggedUser || 'not provided'; // server: '';
    bitacora.finalRes = true;
    return FAIL(bitacora);
  }
};
