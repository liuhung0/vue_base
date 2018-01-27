<template>
  <div class="HolyGrail">
    <header>
      <Top></Top>
    </header>
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
    flex-flow: row wrap;
  }
  header{
    display: flex;
    flex:0 0 100%;
    height:6vh;
    background:#48ace6;
  }
  .HolyGrail-body {
    display: flex;
    flex:1 1 100%;
    height:95vh;
    background: #fff2ea;
  }
  .HolyGrail-content {
    flex:1;
    max-width: 88vw;
    overflow-x:auto;
    overflow-y:auto;
  }

  .HolyGrail-nav{
    /* 两个边栏的宽度设为12em */
    flex: 0 0 12vw;
    background: #45494e;
    order: -1;
  }
</style>
