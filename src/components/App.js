import TempList from './TempList.js';




Vue.filter('timeES', function (value) {
  return new Date(value * 1000).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
})

export default {
  name: 'App',
  components: {
    TempList,
  },
  template: `
    <div class="container mx-auto">
      <temp-list class="mt-6"></temp-list>
    </div>
  `,
};