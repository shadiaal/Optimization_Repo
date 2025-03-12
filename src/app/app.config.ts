import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes'
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser'
import { provideStore } from '@ngrx/store'
import { listReducer } from './state/list.reducer'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideStore({ todos: listReducer }),
    provideHttpClient(),
  ],
}
