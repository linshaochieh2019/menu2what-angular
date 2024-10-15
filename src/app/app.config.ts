import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { getAuth, provideAuth } from '@angular/fire/auth';
// import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
//  Import for App Check (keep this line)
import { provideAppCheck } from '@angular/fire/app-check'; 
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
// import { getFunctions, provideFunctions } from '@angular/fire/functions';
// import { getMessaging, provideMessaging } from '@angular/fire/messaging';
// import { getPerformance, providePerformance } from '@angular/fire/performance';
// import { getStorage, provideStorage } from '@angular/fire/storage';
// import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
// import { getVertexAI, provideVertexAI } from '@angular/fire/vertexai-preview';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideFirebaseApp(() => initializeApp({
      "projectId":"menu2what",
      "appId":"1:233364146418:web:6c52dcbd1a3725708ae86b",
      "storageBucket":"menu2what.appspot.com",
      "apiKey":"AIzaSyBdIERHTspuVC9ERpZcr1jsLL21wGjtMgs",
      "authDomain":"menu2what.firebaseapp.com",
      "messagingSenderId":"233364146418",
      "measurementId":"G-9YLW7MD9L8"
    })), 
    // provideAuth(() => getAuth()), 
    // provideAnalytics(() => getAnalytics()), 
    // ScreenTrackingService, 
    // UserTrackingService, 
    // Modified App Check setup
    // provideAppCheck(() => {
    //   // IMPORTANT: Remove or comment out the reCAPTCHA Enterprise provider
    //   // const provider = new ReCaptchaEnterpriseProvider(/* reCAPTCHA Enterprise site key */);
    //   // return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });

    //   // Temporarily disable App Check (not recommended for production)
    //   return undefined; 
    // }), 
    provideFirestore(() => getFirestore()), 
    provideDatabase(() => getDatabase()), 
    // provideFunctions(() => getFunctions()), 
    // provideMessaging(() => getMessaging()), 
    // providePerformance(() => getPerformance()), 
    // provideStorage(() => getStorage()), 
    // provideRemoteConfig(() => getRemoteConfig()), 
    // provideVertexAI(() => getVertexAI())
  ]
};
