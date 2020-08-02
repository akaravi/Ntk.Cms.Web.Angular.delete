export const environment = {
  production: true,
   cmsServerConfig : {
    configApiRetry:1,
    configApiServerPath: 'https://apicms.ir/api/v1/',
    configMvcServerPath: 'https://oco.ir',
    configCpanelImages: '/cpanelv1/images/',
    configPathFileByIdAndName: 'https://oco.ir/files/',
    configRouteThumbnails: 'https://oco.ir/imageThumbnails/',
    configRouteUploadFileContent: 'https://apicms.ir/api/v1/FileContent/upload/',
  },
   cmsUiConfig : {
    Pathlogin: '/auth/login',
    Pathlogout: '/auth/logout',
    PathRegistery: '/auth/registery',
    Pathdashboard: '/dashboard/dashboard1',
  
  }
};