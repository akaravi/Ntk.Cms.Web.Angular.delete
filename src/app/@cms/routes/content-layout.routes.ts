import { Routes, RouterModule } from '@angular/router';
import { CmsAuthGuard } from '../cmsService/base/auth.guard.service';


export const ContentLayoutROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../dashboard/dashboard.module').then(m => m.CmsDashboardModule)
  },
  {
    path: 'core',
    canActivate: [CmsAuthGuard],
    loadChildren: () => import('../cmsComponents/core/core.module').then(m => m.CoreModule)
  },
  {
    path: 'news',
    canActivate: [CmsAuthGuard],
    loadChildren: () => import('../cmsComponents/news/news.module').then(m => m.NewsModule)
  },
  {
    path: 'sms',
    canActivate: [CmsAuthGuard],
    loadChildren: () => import('../cmsComponents/sms/sms.module').then(m => m.SmsModule)
  },
  {
    path: 'bankpayment',
    canActivate: [CmsAuthGuard],
    loadChildren: () => import('../cmsComponents/bankpayment/bankPayment.module').then(m => m.BankPaymentModule)
  },

];
