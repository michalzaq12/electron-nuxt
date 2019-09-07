/// <reference types="node" />

declare module 'spectron' {
  export interface NuxtSpectron {
    ready(): Promise<void>;
    navigate(url: string) : Promise<void>;
  }

  // extends SpectronClient interface
  export interface SpectronClient {
    nuxt: NuxtSpectron;
    hasNotError(throwError? : boolean): Promise<boolean>;
  }
}
