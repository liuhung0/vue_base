<template>
  <div class="HolyGrail">
    <header><Top></Top></header>
    <div class="HolyGrail-body">
      <main class="HolyGrail-content">
        <router-view></router-view>
      </main>
      <nav class="HolyGrail-nav"><Menu></Menu></nav>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Top from "./layout/Top"
  import Menu from "./layout/Menu"
    export default {
        props: [],
        components:{Top,Menu}
    }
</script>
<style scope>
  .HolyGrail {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  header,
  footer {
    flex: 0;
  }

  .HolyGrail-body {
    display: flex;
    flex: 1;
  }

  .HolyGrail-content {
    flex: 1;
    overflow:auto;
    min-height: 100vh;
  }

  .HolyGrail-nav{
    /* 两个边栏的宽度设为12em */
    flex: 0 0 12em;
    min-height: 100vh;
    background:#8c939d;
  }

  .HolyGrail-nav {
    /* 导航放到最左边 */
    order: -1;
  }

</style>
