<template>
  <div class="landing">
    <transition name="fade" appear>
      <flash-banner v-if="showTime" @close="showTime = false" />
    </transition>
    <!-- - -->
    <!-- - -->
    <!-- - -->
    <!-- LEFT -->
    <div class="landing__column_left landing__column"
          :class="{'landing__column_left--collapse': collapse}"
          @click='collapse = !collapse'>
      <div class="landing__column_left__head">
        <h1 class="landing__column_left__head__title">hardeman</h1>
        <h4 class="landing__column_left__head__subtitle">
          <span class="landing__column_left__head__subtitle__highlight">amsterdam based</span> <br/>
          <span class="landing__column_left__head__subtitle__highlight">denim brand</span>
        </h4>
        <section class="landing__column_left__head__social">
          <a class="landing__column_left__head__social__item socicon-facebook"
              href='https://www.facebook.com/hardemanonline/'
              target='_blank'></a>
          <a class="landing__column_left__head__social__item socicon-instagram"
              href='https://www.instagram.com/hardeman_'
              target='_blank'></a>
        </section>
      </div>
      <div class="landing__column_left__toe">
        <weather />
        <calendar />
      </div>
    </div>
    <!-- - -->
    <!-- - -->
    <!-- - -->
    <!-- MIDDLE -->
    <div class="landing__column_middle landing__column"
          @scroll='handleScroll'>
      <!-- BANNER -->
      <div v-if='main.banner.banner'
            class="landing__column_middle__banner">
        <a :href="main.banner.url">
          <img :src='main.banner.banner.sizes["s-h-medium"]'/>
        </a>
      </div>
      <div class="landing__column_middle__sections">
        <!-- - -->
        <!-- - -->
        <!-- - -->
        <!-- Shop -->
        <section  class="landing__column_middle__sections__shop"
                  v-if='shopify.products.length > 0'>
          <router-link  :to='{name: "shopify"}'
                        tag='h2' >
                        shop
                        </router-link>
          <ul class="duo">
            <router-link tag='li'
                          v-for='collection in shopify.collections'
                          :key='collection.id'
                          :to='{ name: "shopify collection", params: { handle: collection.handle } }'>
                          <span>
                            {{ collection.title }}
                          </span>
            </router-link>
          </ul>
        </section>
        <!-- - -->
        <!-- - -->
        <!-- - -->
        <!-- Collections -->
        <section v-if='emphasizedCollection'
                  class="landing__column_middle__sections__collections">
          <router-link :to="{ name: 'collection', params: {slug: emphasizedCollection, section: 'lookbook'} }"
                        tag='h2'>
                        collections
                        </router-link>
          <ul>
            <router-link class="landing__column_middle__sections__collections__collection"
                          tag='li'
                          v-for='collection in main.collections'
                          :class="{'landing__column_middle__sections__collections__collection--emphasis': collection.acf.emphasis}"
                          :key='collection.id'
                          :to="{name: 'collection', params: { slug: collection.slug, section: 'lookbook'}}">
                            <span class='landing__column_middle__sections__collections__collection--season'>{{collection.acf.season}}</span>
                            <span class="landing__column_middle__sections__collections__collection--title">{{collection.title.rendered}}
                              <sup  v-for='label in collection.acf.labels'
                                    :key='"collection" + label.ID'>{{label.post_title}}</sup></span>
                        </router-link>
          </ul>
        </section>
        <!-- - -->
        <!-- - -->
        <!-- - -->
        <!-- About -->
        <section class="landing__column_middle__sections__about">
          <router-link :to='{name: "about", params: {slug: "bio"}}'
                        tag='h2' >
                        about hardeman
                        </router-link>
          <ul class="duo">
            <router-link tag='li'
                          v-for='item in main.about'
                          :key='item.id'
                          :to='{name: "about", params: {slug: item.slug}}'>
                            <span>{{item.title.rendered}}
                              <sup v-for='label in item.acf.labels'>{{label.post_title}}</sup>
                            </span>
                          </router-link>
          </ul>
        </section>
        <!-- - -->
        <!-- - -->
        <!-- - -->
        <!-- Hardeman TV -->
        <section class="landing__column_middle__sections__tv"
                  v-if='main.videos.length > 0'>
          <router-link :to='{name: "hardeman tv", params: {slug: main.videos[0].slug}}'
                        tag='h2' >
                        hardeman tv
                        </router-link>
          <ul>
            <router-link tag='li'
                          v-for='video in main.videos'
                          :key='video.id'
                          :to='{name: "hardeman tv", params: {slug: video.slug}}'>
                          <span>{{video.title.rendered}}
                            <sup v-for='label in video.acf.labels' :key='label.id'>{{label.post_title}}</sup>
                          </span>
            </router-link>
          </ul>
        </section>
        <!-- - -->
        <!-- - -->
        <!-- - -->
        <!-- Stockists -->
        <section v-if='main.stockists.length > 0'
                  class="landing__column_middle__sections__stockists">
          <router-link :to='{name: "stockists", params: {slug: main.stockists[0].slug}}'
                        tag='h2' >
                        stockists
          </router-link>
          <ul>
            <router-link tag='li'
                          v-for='s in main.stockists'
                          :key='s.id'
                          :to='{name: "stockists", params: {slug: s.slug}}'>
                          <span>
                            <span v-html='s.title.rendered'/>
                            <sup v-for='label in s.acf.labels' :key='label.id'>{{label.post_title}}</sup>
                          </span>
            </router-link>
          </ul>
        </section>
        <!-- - -->
        <!-- - -->
        <!-- - -->
        <!-- Stockists -->
        <section v-if='main.community.length > 0'
                  class="landing__column_middle__sections__community">
          <router-link :to='{name: "community", params: {slug: main.community[0].slug}}'
                        tag='h2' >
                        community
          </router-link>
          <router-link tag='img'
                        :to='{name: "community", params: {slug: main.community[0].slug}}'
                        class="landing__column_middle__sections__community__image"
                        :src='main.community[0].acf.image.sizes["s-h-medium"]' />
                        <sup v-for='label in main.community[0].acf.labels'>{{label.post_title}}</sup>
        </section>
        <!-- - -->
        <!-- - -->
        <!-- - -->
        <!-- Diary -->
        <section v-if='main.diary.length > 0'
                  class="landing__column_middle__sections__diary">
          <router-link :to='{name: "diary", params: {slug: main.diary[0].slug}}'
                        tag='h2' >
                        diary
          </router-link>
          <ul>
            <router-link tag='li'
                          v-for='e in main.diary'
                          :key='e.id'
                          :to='{name: "diary", params: {slug: e.slug}}'>
                          <span>{{e.title.rendered}}
                            <sup v-for='label in e.acf.labels'>{{label.post_title}}</sup>
                          </span>
            </router-link>
          </ul>
        </section>
      </div>
    </div>
    <!-- - -->
    <!-- - -->
    <!-- - -->
    <!-- RIGHT -->
    <div class="landing__column_right landing__column">
      <router-link v-if='main.diary.length > 0'
                    class="landing__column_right__head"
                    :to='{name: "diary", params: {slug: main.diary[0].slug}}'
                    tag='h3' >
                    diary
      </router-link>
      <ul class="landing__column_right__list">
        <router-link v-for='entry in main.diary'
                      tag='li'
                      class='naturel'
                      :key='entry.id'
                      :to="{
                        name: 'diary',
                        params: { slug: entry.slug}
                      }">
                      {{entry.title.rendered}}
                      <sup v-for='label in entry.acf.label'>
                        {{label.post_title}}
                      </sup>
          </router-link>
      </ul>
      <div class="landing__column_right__toe">
        <p class="landing__column_right__toe__text">
          a personal collection of photographs by sophie hardeman
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import weather from '@/components/weather'
import calendar from '@/components/calendar'
import flashBanner from '@/components/flash-banner'

export default {
  name: 'landing',
  head: {
    title: () => {
      return {
        inner: 'Welcome'
      }
    },
    meta: () => {
      return [
        { name: 'title', content: 'Home' }
      ]
    }
  },
  components: {
    weather,
    calendar,
    flashBanner
  },
  props: [],
  data() {
    return {
      collapse: false,
      showTime: false
    }
  },
  computed: {
    ...mapState(['main', 'shopify']),
    emphasizedCollection() {
      if (this.main.collections.length > 0) return this.main.collections.filter(c => c.acf.emphasis)[0].slug
    }
  },
  updated: function() {
    this.$nextTick(function() {
      this.setBannerLink()
    })
  },
  methods: {
    handleScroll(event) {
      if (window.innerWidth < 800) {
        if (event.target.scrollTop > 20) this.collapse = true
        else this.collapse = false
      }
    },
    setBannerLink() {
      if (this.main.banner !== undefined) {
        let url = this.main.banner.link
        // let collection = /s-h_collection/
        let vid = /s-h_videos/
        if (vid.test(url)) {
          this.bannerLink = url.replace(vid, 'hardeman-tv')
        }
      }
    },
    categoryPopulated(id) {
      // check if there are products with this category
      return this.shop.products.some(product => {
        return product.acf.garment_category.term_id === id
      })
    }
  },
  mounted () {
    setTimeout(() => { this.showTime = true }, 3000)
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.fade-enter-active {
  transition: opacity 0.3s;
}

.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-slow-enter-active {
  transition: opacity 2s;
}

.fade-slow-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to,
.fade-slow-enter,
.fade-slow-leave-to {
  opacity: 0;
}

.fade-leave,
.fade-enter-to,
.fade-slow-leave,
.fade-slow-enter-to {
  opacity: 1;
}


.landing {
  background: $white;
  width: $landing-width;
  margin: $margin-top auto 0;
  height: 100%;

  @include screen-size('medium') {
    width: 800px;
  }

  @include screen-size('small') {
    width: calc(100% - 40px);
  }

  &__column {
    height: $exact-height;
  }

  &__column_left {
    position: relative;
    float: left;
    width: calc(3/14 * 100%);
    height: $exact-height;
    background: $grey;
    border-top: $border;
    border-left: $border;
    border-right: $border;
    text-align: center;
    padding: 10px 20px 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;

    @include screen-size('tall') {
      justify-content: space-between;
    }

    @include screen-size('medium') {
      width: calc(4/14 * 100%)
    }

    @include screen-size('small') {
      width: 100%;
      height: 160px;
      border: $border;
      padding: 0 20px;
      margin-bottom: 0;
      z-index: 90;
      overflow: hidden;
      transition: height 0.25s linear;
      -moz-transition: height 0.25s linear;
      -webkit-transition: height 0.25s linear;

      &--collapse {
        height: 50px;
      }
    }

    &__head {
      background: $grey;

      &__title {
        margin-bottom: 20px;
      }

      &__subtitle {
        font-weight: normal;
        margin-bottom: 20px;

        &__highlight {
          background: $yellow;
          padding: 2px 20px;
        }
      }

      &__social {
        margin: 0 10px 40px;
        font-size: 20px;

        @include screen-size('small') {
          margin-bottom: 20px;
        }
      }

      &__links {
        margin-bottom: 20px;

        @include screen-size('small') {
          display: none;
        }

        @include screen-size('short') {
          display: none;
        }

        &__item {
          font-size: $font-size-s;
          line-height: $line-height-s;
          border-bottom: none;
        }
      }
    }

    &__toe {
      background: $grey;
      height: auto;
      overflow: hidden;
      // position: absolute;
      width: 100%;
      bottom: 40px;

      @include screen-size('small') {
        display: none;
      }
    }
  }

  &__column_middle {
    width: calc(9/14 * 100%);
    display: block;
    height: $exact-height;
    padding: 0 20px;
    position: relative;
    overflow: scroll;
    @include hide-scroll;
    float: left;

    @include screen-size('medium') {
      width: calc(10/14 * 100%);
    }

    @include screen-size('small') {
      width: 100%;
      height: calc(100% - 50px); /* subtracting the banner height for full scroll*/
      overflow: scroll;
      padding: 40px 10px 60px;
    }

    &__banner {
      width: 100%;
      height: $banner-height;
      margin-bottom: $line-height * 2;

      @include screen-size('medium') {
        height: 120px;
      }

      @include screen-size('small') {
        display: none;
      }

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }

    &__sections {
      width: 100%;
      column-count: 2;
      column-gap: 40px;
      padding-bottom: 0;
      @include hide-scroll;

      @include screen-size('small') {
        column-count: 1;
        column-gap: 0;
      }

        &__collections,
        &__about,
        &__tv,
        &__shop,
        &__stockists,
        &__community {
          break-inside: avoid-column;
          width: 100%;
          margin-right: 40px;
          margin-bottom: $line-height * 2;
        }

        &__community {
          &__image {
            width: 100%;
            max-height: 400px;
            object-fit: cover;
            cursor: pointer;
          }
        }

        &__diary {
          display: none;

          @include screen-size('medium') {
            display: initial;
          }
        }

        &__collections {
          display: inline-block;
          &__collection {
            display: flex;

            &--emphasis {
                font-weight: bold;
            }

            &--season {
              display: inline-block;
              width: 70px;
            }
          }
        }
    }
  }

  &__column_right {
    position: relative;
    float: left;
    width: calc(2/14 * 100%);
    background: $grey;
    border-top: $border;
    border-left: $border;
    border-right: $border;
    text-align: center;
    color: $blue;
    padding: 10px 20px 40px;
    justify-content: space-between;

    @include screen-size('medium') {
      display: none;
    }

    &__head {
      cursor: pointer;
    }

    &__list {
      margin-top: $margin-top;
      height: calc(100% - 100px);
      overflow-y: auto;
      @include hide-scroll;
    }

    &__toe {
      position: absolute;
      height: auto;
      bottom: 40px;
      left: 20px;
      background: $grey;
      width: calc(100% - 40px);
      font-size: $font-size-s;
      line-height: $line-height-s;

      &__text {
        color: $blue;
        padding: $line-height-s / 2 0;
        border-top: $border;
        border-bottom: $border;
      }
    }
  }
}

h4 {
  color: $blue;
}

ul {
  font-family: $sans-serif-stack;
  font-size: $font-size;
  line-height: $line-height;
  font-weight: bold;
  color: $blue;

  &.duo {
    display: flex;
    flex-flow: row wrap;

    li {
      width: 50%;
      &:nth-child(odd) {
        width: calc(50% - 20px);
        margin-right: 20px;
      }
    }
  }

  li {
    border-bottom: $border-light;

    &.naturel {
      border-bottom: 0;
    }
  }
}

</style>
