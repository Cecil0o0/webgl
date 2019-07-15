<template>
  <div>
    <canvas />
  </div>
</template>

<script>
import { start, render} from './engine';
export default {
  mounted() {
    start();
    render();
  }
}
</script>
