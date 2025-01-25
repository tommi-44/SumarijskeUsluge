const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'ONama', component: () => import('pages/AboutPage.vue') },
      { path: 'Radnici', component: () => import('pages/WorkersPage.vue') },
      { path: 'Kontakt', component: () => import('pages/ContactPage.vue') },
      { path: 'pregled_proizvoda', component: () => import('pages/PregledProizvodaPage.vue') },
      { path: 'unos_proizvoda', component: () => import('pages/UnosProizvodaPage.vue') },
      { path: 'kupovina_proizvoda', component: () => import('pages/KupovinaProizodaPage.vue') },
      { path: 'pregled_kupovina', component: () => import('pages/PregledKupovinaPage.vue') },
    ],
  },
];
export default routes;
