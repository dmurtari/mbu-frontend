import Vue from 'vue';
import Main from './Main.vue';

function getRenderedText (Component, propsData) {
  const Ctor = Vue.extend(Component);
  const vm = new Ctor({ propsData: propsData }).$mount();
  return vm.$el.textContent;
}

describe('Main', () => {
  xit('should render the welcome text', () => {
    expect(getRenderedText(Main)).to.contain('Welcome to MBU Online');
  });
});
