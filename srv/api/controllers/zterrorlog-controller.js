import cds from '@sap/cds';
import zterrorlogService from '../services/zterrorlog-service.js';

class ErrorClass extends cds.ApplicationService {
  async init() {
    this.on('getall', async (req) => {
      return zterrorlogService.GetAllErrors();
    });

    // this.on('READ','ErrSrv', async (req) => {
    //   console.log("e")
    //   return 1;
    // });

    this.on('addOne', async (req) => {
      const newError = req.data.error;
      const result = await zterrorlogService.InsertOneError(newError);
      if (result) {
        req._.res.statusCode = 201;
      }
      return result;
    });

    this.on('deleteOne', async (req) => {
      const { _id } = req.data.error;
      return await zterrorlogService.DeleteOneError(_id);
    });

    this.on('updateOne', async (req) => {
      const { _id } = req.data.error;
      return await zterrorlogService.UpdateOneError(_id);
    });
  }
}

export default ErrorClass;
