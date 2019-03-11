// import api from '@/api/'
import { Module, VuexModule, getModule, Mutation } from 'vuex-module-decorators';
import store from '@/store';

@Module({
  namespaced: true,
  dynamic: true,
  name: 'app',
  store,
})
class App extends VuexModule {
  public transitionName: string = '';
  get transition() {
    return this.transitionName;
  }

  @Mutation
  public setTransitionName(name: string) {
    this.transitionName = name;
  }
}
export default getModule(App);
