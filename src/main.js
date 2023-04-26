import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import store from './store'
import router from './router'
// import './assets/main.css'
import { Amplify } from 'aws-amplify';
import AmplifyVue from '@aws-amplify/ui-vue';
import awsExports from './aws-exports';
import '@aws-amplify/ui-vue';
// import { 
//     applyPolyfills,
//     defineCustomElements
//   } from '@aws-amplify/ui-components/loader';
  
//   applyPolyfills().then(() => {
//     defineCustomElements(window);
//   });

Amplify.configure(awsExports);
createApp(App).use(store).use(AmplifyVue).use(router).mount('#app')
