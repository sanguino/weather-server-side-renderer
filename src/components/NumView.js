export default {
    name: 'NumView',

    props: ['value'],

    computed: {
      big: function () {
        return Math.floor(this.value)
      },

      small: function () {
        return Math.round(10 * (this.value - Math.floor(this.value)))
      }
    },

    template: `
      <spam class="bigClass">{{big}}</spam>
      <spam class="smallClass">{{small}}</spam>
    `,
};