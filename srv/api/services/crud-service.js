import zterrorlogService from './zterrorlog-service.js';
import respPWA from './../../middlewares/respPWA.handler.js';

import { whatTypeVarIs } from '../../helpers/variables.js';

const { OK, FAIL, BITACORA, DATA, AddMSG } = respPWA;

export const crudErrores = async (params, body) => {
  let bitacora = BITACORA();
  let data = DATA();

  const { queryType, LoggedUser, id, dbServer } = params;

  let result;
  try {
    switch (queryType) {
      case 'getAll':
        //OBTENER LA DATA CON EL CONTROLADOR PARA ERRORES
        result = await zterrorlogService.GetAllErrors();
        result = JSON.parse(result); //PARSEAR RESULTADO A JSON

        //ASIGNAR LOS CAMPOS Y VALORES A BITACORA
        bitacora.data.push(result.data);
        bitacora.countData = result.results;
        bitacora.success = true;
        bitacora.status = 200;
        bitacora.loggedUser = LoggedUser;
        bitacora.finalRes = true;
        bitacora.dbServer = dbServer;
        break;

      case 'getOne':
        if (!id) throw new Error('Missing ID parameter');
        bitacora = await zterrorlogService.GetOneError(id);
        break;

      case 'add':
        if (whatTypeVarIs(body.data) === 'isObject') {
          const error = body.data;
          const result = await zterrorlogService.InsertOneError(error);
          if (result) {
            //ASIGNAR LOS CAMPOS Y VALORES A BITACORA
            bitacora.data.push(error);
            bitacora.countData = 1;
            bitacora.success = true;
            bitacora.status = 201;
            bitacora.loggedUser = LoggedUser;
            bitacora.finalRes = true;
            bitacora.dbServer = dbServer;
          }
          return;
        }
        const errors = body.data;
        const promesas = errors.map((error) =>
          zterrorlogService.InsertOneError(error)
        );

        try {
          const resultados = await Promise.all(promesas);
          resultados.forEach((resultado) => bitacora.data.push(resultado));
          bitacora.countData = resultados.length;
          bitacora.success = true;
          bitacora.status = 201;
          bitacora.loggedUser = LoggedUser;
          bitacora.finalRes = true;
          bitacora.dbServer = dbServer;
        } catch (errorBita) {
          bitacora.countData =errors.length;
          bitacora.success = false;
          bitacora.status = 589;
          bitacora.loggedUser = LoggedUser;
          bitacora.finalRes = true;
          bitacora.dbServer = dbServer;
          return FAIL(bitacora);
        }

        break;

      default:
        throw new Error(`Unsupported queryType: ${queryType}`);
    }

    return OK(bitacora);
  } catch (errorBita) {
    console.log(errorBita)
    if (!errorBita?.finalRes) {
      data.status = data.status || 500;
      data.messageDEV = errorBita.errorBita;
      data.messageUSR =
        data.messageUSR ||
        '<<ERROR CATCH>> La extracción de la información de AZURE <<NO>> tuvo éxito';
      data.dataRes = data.dataRes || errorBita;
      errorBita = AddMSG(bitacora, data, 'FAIL');
    }

    // console.log(`<<Message USR>> ${errorBita.messageUSR}`);
    // console.log(`<<Message DEV>> ${errorBita.messageDEV}`);
    return FAIL(errorBita);
  }
};
