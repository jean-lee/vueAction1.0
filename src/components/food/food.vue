<script>
import BScroll from 'better-scroll'
import CartControl from 'components/cartcontrol/cartcontrol'
import Split from 'components/split/split'
import Ratingselet from 'components/ratingselect/ratingselect'
import Vue from 'vue'
import {formatDate} from 'common/js/date.js'

// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2

export default {
  name: 'food',
  props: {
    food: {
      type: Object
    }
  },
  components: {
    'cart-control': CartControl,
    'split': Split,
    'rating-select': Ratingselet
  },
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '满意',
        negative: '吐槽'
      }
    }
  },
  events: {
    'ratingtype.select' (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    'content.toggle' (content) {
      this.onlyContent = content
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    show() {
      this.showFlag = true
      this.selectType = ALL
      this.onlyContent = false

      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$els.food, {
            click: true
          })
        } else {
            this.scroll.refresh()
        }
      })
    },
    hide() {
      this.showFlag = false
    },
    addFirst(event) {
      if (!event._constructed) {
        return
      }
      this.$dispatch('cart.add', event.target)
      Vue.set(this.food, 'count', 1)
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    }
  }
}
</script>

<template>
<div class="food" v-show="showFlag" transition="move" v-el:food>
  <div class="food-content">
    <div class="image-header">
      <img :src="food.image">
        <div class="back" @click.stop="hide">
          <i class="icon-arrow_lift"></i>
        </div>
    </div>
    <div class="content">
      <h1 class="title">{{food.name}}</h1>
      <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}</span>
          <span class="rating">好评率{{food.rating}}%</span>
      </div>
      <div class="price">
          <span class="now">￥{{food.price}}</span>
          <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
      </div>
      <div class="cartcontrol-wrapper">
        <cart-control :food="food"></cart-control>
      </div>
      <div @click.stop="addFirst" class="buy" v-show="!food.count || food.count === 0" transition="fade">加入购物车</div>
    </div>
    <split v-show="food.info"></split>
    <div class="info" v-show="food.info">
      <h1 class="title">商品信息</h1>
      <p class="text">{{food.info}}</p>
    </div>
    <split></split>
    <div class="rating">
      <h1 class="title">商品评价</h1>
        <rating-select :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></rating-select>
        <div class="rating-wrapper">
          <ul v-show="food.ratings && food.ratings.length">
            <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" class="rating-item">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img width="12" height="12" :src="rating.avatar" calss="avatar">
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
              <p class="text">
                <span :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></span>{{rating.text}}
              </p>
            </li>
          </ul>
          <div class="no-ratings" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
        </div>
    </div>
  </div>
</div>
</template>

<style lang="stylus">
@import '../../common/stylus/mixin.styl'

 .food
   position: fixed
   left: 0
   top: 0
   bottom: 48px
   z-index: 30
   width: 100%
   background: #fff
   &.move-transition
     transition: all 0.5s linear
     transform: translate3d(0, 0, 0)
   &.move-enter, &.move-leave
     transform: translate3d(100%, 0, 0)
   .image-header
     position: relative
     width: 100%
     height: 0
     padding-top: 100%
     img
       position: absolute
       top: 0
       left: 0
       width: 100%
       height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          color: #fff
    .content
      padding: 18px
      position: relative
      .title
        line-height: 18px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        font-size: 0
        .sell-count,.rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
  .cartcontrol-wrapper
    position: absolute
    right: 12px
    bottom: 12px
  .buy
    position: absolute
    right: 18px
    bottom: 18px
    z-index: 10
    height:24px
    line-height: 24px
    padding: 0 12px
    box-sizing: border-box
    border-radius: 12px
    font-size: 10px
    color: #fff
    background: rgb(0, 160, 220)
    &.fade-transition
      transition : all 0.5s
      opacity: 1
    &.fade-enter, &.fade-leave
      opacity: 0
  .info
    padding: 18px
    .title
      line-height: 14px
      margin-bottom: 6px
      font-size: 14px
      color: rgb(7, 17, 27)
    .text
      padding: 0 8px
      line-height: 24px
      font-size: 12px
      color: rgb(77, 85, 93)
  .rating
    padding-top: 18px
    .title
      line-height: 14px
      margin-left: 18px
      font-size: 14px
      color: rgb(7, 17, 27)
    .rating-wrapper
      padding: 0 18px
      .rating-item
        position: relative
        padding: 16px 0
        border-1px(rgba(7, 17, 27,0.1))
        .user
          position: absolute
          right: 0
          top: 16px
          line-height: 12px
          font-size: 0
          .name
            display: inline-block
            margin-right: 6px
            vertical-align: top
            font-size : 10px
            color: rgb(147, 153, 159)
          .avatar
            border-radius: 2px
        .time
          margin-bottom: 16px
          line-height: 12px
          font-size: 10px
          color: rgb(147, 153, 159)
        .text
          line-height: 16px
          font-size: 12px
          color: rgb(7, 17, 27)
          .icon-thumb_up, .icon-thumb_down
            margin-right: 4px
            line-height: 16px
            font-size: 12px
          .icon-thumb_up
            color: rgb(0, 160, 220)
          .icon-thumb_down
            color: rgb(147, 153, 159)
      .no-ratings
        padding 16px 0
        font-size: 12px
        color: rgb(147, 153, 159)


</style>
