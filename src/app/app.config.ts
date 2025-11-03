import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth'; // <-- Hinzufügen


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'kings-cup-5e9b9',
        appId: '1:937211998351:web:f98e210ee4d6d9f0c9c0fa',
        storageBucket: 'kings-cup-5e9b9.firebasestorage.app',
        apiKey: 'AIzaSyDbTEFHwQlGjlxc4Zfw1i-1WTy42EOnz6o',
        authDomain: 'kings-cup-5e9b9.firebaseapp.com',
        messagingSenderId: '937211998351',
        // projectNumber: '937211998351',
        // version: '2',
      })
    ),
provideFirestore(() => getFirestore()),
provideAuth(() => getAuth()),
  ],

  // firebase.initializeApp(firebaseConfig),
};


