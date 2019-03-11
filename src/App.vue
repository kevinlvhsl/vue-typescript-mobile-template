<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import AppModule from '@/store/modules/app';
@Component({})
export default class App extends Vue {
  public routeDeep: string[] = [];

  get transitionName() {
    return AppModule.transition;
  }
  @Watch('$route')
  public onRouteChanged(to: any, from: any) {
    const toDepth = this.routeDeep.indexOf(to.path);
    if (toDepth !== -1) {
        if (toDepth === this.routeDeep.length) {
          this.routeDeep.pop();
        } else {
          this.routeDeep.splice(toDepth + 1);
        }
      } else {
        this.routeDeep.push(to.path);
      }
    const fromDepth = this.routeDeep.indexOf(from.path);
    const transitionName = toDepth > fromDepth ? 'slide-right' : 'slide-left';
    AppModule.setTransitionName(transitionName);
  }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
  position: relative;
  width: 100vw;
  height: 100vh;
}
#nav {
  padding: 30px;
  position: absolute;
  top: 0;
  z-index: 100;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.child-view {
  background-color: #f4f4f4;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  -webkit-overflow-scrolling: touch;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  // opacity: 0;
  -webkit-transform: translate(750px, 0);
  transform: translate(750px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  // opacity: 0;
  -webkit-transform: translate(-750px, 0);
  transform: translate(-750px, 0);
}
</style>