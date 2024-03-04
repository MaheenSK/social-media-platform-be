import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';
import { ConfigOptions } from 'cloudinary';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): ConfigOptions => {
    return v2.config({
      cloud_name: 'dgbjpy7ev',
      api_key: '278248299317886',
      api_secret: 'SPNdGFXd24YKWqQF5aH6sWAS_ek',
    });
  },
};