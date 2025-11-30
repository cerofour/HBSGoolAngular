import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjGyl/Vkd+XU9FcVRDXHxLeUx0RWFcb19wfldBallTVBYiSV9jS3tSdkZjWHpbdXVUT2hfVk91Xg==');

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
