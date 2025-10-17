import zterrorlogService from './zterrorlog-service.js';
import respPWA from './../../middlewares/respPWA.handler.js';

const { OK, FAIL, BITACORA, DATA, AddMSG } = respPWA;

export const crudErrores = async (params) => {
  let bitacora = BITACORA();
  // let data = DATA();

  const { queryType, LoggedUser, body, id } = params;
  let result;
  try {
    switch (queryType) {
      case 'getAll':
        result = await zterrorlogService.GetAllErrors();
        result = JSON.parse(result);
        bitacora.data.push(result.data);
        bitacora.countData = result.results;
        bitacora.success = true;
        bitacora.status = 200;
        bitacora.loggedUser = "RRA";
        bitacora.finalRes = true;
        bitacora.dbServer = 'Mongodb'
        break;

      case 'getOne':
        if (!id) throw new Error('Missing ID parameter');
        bitacora = await zterrorlogService.GetOneError(id);
        break;

      default:
        throw new Error(`Unsupported queryType: ${queryType}`);
    }

    return OK(bitacora);
  } catch (errorBita) {
    console.log(errorBita)
    // if (!errorBita?.finalRes) {
    //   data.status = data.status || 500;
    //   data.messageDEV = data.messageDEV || errorBita.message;
    //   data.messageUSR =
    //     data.messageUSR ||
    //     '<<ERROR CATCH>> La extracción de la información de AZURE <<NO>> tuvo éxito';
    //   data.dataRes = data.dataRes || errorBita;
    //   errorBita = AddMSG(bitacora, data, 'FAIL');
    // }

    // console.log(`<<Message USR>> ${errorBita.messageUSR}`);
    // console.log(`<<Message DEV>> ${errorBita.messageDEV}`);

// console.log(bitacora.data)
    return FAIL(errorBita);
  }
};
