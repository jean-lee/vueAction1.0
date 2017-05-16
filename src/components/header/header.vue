
<template>
  <div class="header">
      <div class="content-wrapper">
        <div class="avatar">
          <img width="64px" height="64px" :src="seller.avatar" alt="头像" >
        </div>
        <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{ seller.name }}</span>
          </div>
          <div class="description">
            {{seller.description}}/{{ seller.deliveryTime}}分钟送达
          </div>
          <div v-if="seller.supports" class="support">
            <span class="icon" :class="classMap[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
        <div v-if="seller.supports" class="support-count">
          <span class="count"> {{seller.supports.length}}</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>

      <div class="bulletin-wrapper"></div>
  </div>
</template>

<script  type="text/ecmasctipt-6">
export default {
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.classMap = ['decrease','discount','special','invoice','guaranteen']
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import  "../../common/stylus/mixin"

.header
  color #fff
  background-color rgba(0,0,0,0.1)
  .content-wrapper
    position relative
    padding 24px 18px 18px 24px
    font-size 0
    .avatar
      display inline-block
      vertical-align top
      img
        border-radius 2px
    .content
      display inline-block
      margin-left 16px
      font-size 14px
      .title
        margin 2px 0 8px 0
        .brand
          display inline-block
          vertical-align top
          width 30px
          height 18px
          bg-image('brand')
          background-size 30px 18px
          background-repeat no-repeat
        .name
          margin-left 6px
          font-size 16px
          line-height 18px
          font-weight bold
      .description
        margin-bottom 10px
        line-height 12px
      .support
        .icon
          display inline-block
          vertical-align top
          width 12px
          height 12px
          margin-right 4px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.guarantee
            bg-image('guarantee_1')
          &.invoice
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
        .text
          line-height 12px
          font-size 10px
   .support-count
      position absolute
      right 12px
      bottom 18px
      padding 0 8px
      height 24px
      border-radius 14px
      background rgba(0,0,0,0.2)
      text-align center
      .count
        vertical-align top
        font-size 10px
      .icon-keyboard_arrow_right
        font-size 10px



</style>
