export class ProjectModel {
    public constructor(
      public id?: number,
      public title?: string,
      public imgSrc?: string,
      public videoSrc?: string,
      public url?: string,
      public gitLink?: string, 
      public content?: string,
      public frameworks?: string[]
    ) {}
  }
  
  