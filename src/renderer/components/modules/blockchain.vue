<template>
  <div class="wrapper">
    <div class="wrapper-header">
      <span class="heading">Crypto</span>
    </div>
    <div class="blockchain-wrapper">
      <img src="@/assets/btc.png" alt="bitcoin" />
      <span class="last-price">{{ lastBtcPrice }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "BlockchainModule",
  computed: {
    ...mapState(["blockchain"]),
    lastBtcPrice() {
      return `${this.blockchain.bitcoin.last}${this.blockchain.bitcoin.symbol}`;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  width: 350px;

  .wrapper-header {
    display: flex;
    justify-content: flex-end;
    min-width: 270px;
    color: rgb(145, 145, 145);
    padding-bottom: 5px;
    border-bottom: 1px solid rgb(145, 145, 145);
    border-image: linear-gradient(to right, #000 55%, #aaa 95%);
    border-image-slice: 1;

    .heading {
      display: flex;
      align-self: center;
      text-transform: uppercase;
      font-size: 20px;
    }
  }

  .blockchain-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    img {
      display: flex;
      max-width: 50px;
      max-height: 50px;
    }

    .last-price {
      display: flex;
      color: #fff;
      font-size: 24px;
    }
  }
}
</style>