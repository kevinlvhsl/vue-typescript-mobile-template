<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" style="margin-top: 40px;"/>
    这里是首页
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Home extends Vue {}
</script>
