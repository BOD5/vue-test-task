<template>
  <section class="cover">
    <div class="content">
      <h1>Test assignment for front-end developer</h1>
      <p>
        What defines a good front-end developer is one that has skilled
        knowledge of HTML, CSS, JS with a vast understanding of User design
        thinking as they'll be building web interfaces with accessibility in
        mind. They should also be excited to learn, as the world of Front-End
        Development keeps evolving.
      </p>
      <my-button>Sign up</my-button>
    </div>
  </section>
</template>

<script>
import myButton from "./ui/my-button.vue";
export default {
  components: { myButton },
};
</script>

<style lang="scss">
.cover {
  width: 100vw;
  max-width: v.$cont-max;
  margin: 0px auto;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("@/assets/images/bg/bg.webp");
  background-size: cover;
  background-position: 50% 50%;
  height: 500px;
  position: relative;

  @media (min-width: v.$bp-tb) {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url("@/assets/images/bg/bg-768.webp");
  }
  @media (min-width: v.$bp-s) {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url("@/assets/images/bg/bg-1024.webp");

    height: 650px;
  }

  .no-webp & {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url("@/assets/images/bg/bg.png");
    @media (min-width: v.$bp-tb) {
      background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url("@/assets/images/bg/bg-768.png");
    }
    @media (min-width: v.$bp-s) {
      background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url("@/assets/images/bg/bg-1024.png");
      height: 650px;
    }
  }

  .content {
    max-width: 412px;
    padding: 0px 16px;
    padding-top: 40px;
    margin: auto;
    text-align: center;

    @media (min-width: v.$bp-tb) {
      padding-top: 0px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    color: white;
    h1 {
      margin-bottom: 21px;
    }
    p {
      margin-bottom: 32px;
    }
  }
}
</style>
