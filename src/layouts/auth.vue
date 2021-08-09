<template>
  <div class="auth-wrapper">
    <BContainer :class="'d-flex justify-content-center'">
      <router-view />
    </BContainer>
  </div>
</template>

<script>
import { BContainer } from "bootstrap-vue";
export default {
  components: {
    BContainer,
  },
};
</script>
<style lang="scss">
.auth-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    90deg,
    hsla(0, 0%, 98%, 1) 0%,
    hsla(244, 57%, 90%, 1) 100%
  );
}
</style>
