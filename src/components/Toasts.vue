<template>
  <div>
    <b-toast id="my-toast" variant="warning" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img
            blank
            blank-color="#ff5555"
            class="mr-2"
            width="12"
            height="12"
          ></b-img>
          <strong class="mr-auto">Notice!</strong>
        </div>
      </template>
      {{ text }}
    </b-toast>
  </div>
</template>

<script>
export default {
  name: "Toasts",

  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
