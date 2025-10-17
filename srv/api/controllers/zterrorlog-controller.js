import cds from '@sap/cds';
import zterrorlogService from '../services/zterrorlog-service.js';
import { crudErrores } from '../services/crud-service.js';

class ErrorClass extends cds.ApplicationService {
  async init() {
    // this.on('getall', async (req) => {
    //   return zterrorlogService.GetAllErrors();
    // });

    // // this.on('READ','ErrSrv', async (req) => {
    // //   console.log("e")
    // //   return 1;
    // // });

    // this.on('addOne', async (req) => {
    //   const newError = req.data.error;
    //   const result = await zterrorlogService.InsertOneError(newError);
    //   if (result) {
    //     req._.res.statusCode = 201;
    //   }
    //   return result;
    // });

    // this.on('deleteOne', async (req) => {
    //   const { _id } = req.data.error;
    //   return await zterrorlogService.DeleteOneError(_id);
    // });

    // this.on('updateOne', async (req) => {
    //   const { _id } = req.data.error;
    //   return await zterrorlogService.UpdateOneError(_id);
    // });
    this.on('crud', async (req) => {
      const queryParams = req.req.query;
      const {body} = req.req;
      console.log(body)
      // req._.res.statusCode = 201;
      const result  = await crudErrores(queryParams);
      return result
    });
  }
}

export default ErrorClass;
