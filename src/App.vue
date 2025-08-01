<template>
  <div class="container">
    <!-- 左侧导航 -->
    <div class="sideBox">
      <van-sidebar v-model="currentIndex">
        <van-sidebar-item v-for="cate in categories" :key="cate.title" :title="cate.title" />
      </van-sidebar>
    </div>

    <!-- 右侧主体：只渲染当前分类 -->
    <div class="mainBox">
      <div class="itemBox">
        <h4>
          <el-icon color="#000">
            <component :is="currentCate.icon" />
          </el-icon>
          {{ currentCate.title }}
        </h4>

        <!-- 一排按钮 -->
        <div class="tab-buttons">
          <van-button
            plain
            hairline
            v-for="(tab, tIdx) in currentCate.tabs"
            :key="tab.key"
            :type="tab.key === 'discount' ? 'warning' : tab.key === 'all' ? 'primary' : 'default'"
            :style="{ fontWeight: activeTab === tIdx ? 'bold' : 'normal' }"
            size="small"
            @click="activeTab = tIdx"
            :disabled="tab.disabled"
            style="margin: 5px"
          >
            {{ tab.title }}
          </van-button>
        </div>

        <!-- 内容区域 -->
        <div class="items">
          <template v-if="showItems.length">
            <a v-for="item in showItems" :key="item.name" :href="item.url" class="item-card">
              <div class="img-wrapper">
                <van-image :src="item.img" />
                <span v-if="item.hasDiscount" class="discount-tag">折扣</span>
              </div>
              <p>{{ item.name }}</p>
              <p style="color: grey; font-size: 11px">{{ item.category }}</p>
            </a>
          </template>
          <p v-else class="none">暂无内容</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  KnifeFork,
  Location,
  Place,
  MagicStick,
  ShoppingTrolley,
  Goods,
} from '@element-plus/icons-vue'

// 1. 数据接口
interface Item {
  name: string
  category?: string
  hasDiscount?: boolean
  img: string
  url: string
}
interface Tab {
  title: string
  key: string
  filter?: (i: Item) => boolean
  disabled?: boolean
}
interface Category {
  title: string
  icon: any
  items: Item[]
  tabs: Tab[]
}

// 2. 分类配置（示例）
import { fooditems, playitems, funitems, beautyitems, marketitems, mallitems } from './items'

const categories: Category[] = [
  {
    title: '美食',
    icon: KnifeFork,
    items: fooditems.value,
    tabs: [
      { title: '全部', key: 'all' },
      { title: '折扣专区', key: 'discount', filter: (i) => !!i.hasDiscount },
      { title: '农家菜', key: 'farm', filter: (i) => i.category === '农家菜' },
      { title: '川湘菜', key: 'spicy', filter: (i) => i.category === '川湘菜' },
      { title: '海鲜火锅', key: 'sea', filter: (i) => i.category === '海鲜火锅' },
      { title: '日韩西餐', key: 'jpkr', filter: (i) => i.category === '日韩西餐' },
    ],
  },
  {
    title: '游玩',
    icon: Location,
    items: playitems.value,
    tabs: [
      { title: '全部', key: 'all' },
      { title: '折扣专区', key: 'discount', filter: (i) => !!i.hasDiscount },
      { title: '风景景区', key: 'scenery', filter: (i) => i.category === '风景景区' },
      { title: '游乐园', key: 'park', filter: (i) => i.category === '游乐园' },
    ],
  },
  {
    title: '娱乐',
    icon: Place,
    items: funitems.value,
    tabs: [
      { title: '全部', key: 'all' },
      { title: '折扣专区', key: 'discount', filter: (i) => !!i.hasDiscount },
      { title: '足疗蒸拿', key: 'foot', filter: (i) => i.category === '足疗蒸拿' },
      { title: '健身运动', key: 'gym', filter: (i) => i.category === '健身运动' },
      { title: '酒吧', key: 'bar', filter: (i) => i.category === '酒吧' },
      { title: 'KTV', key: 'ktv', filter: (i) => i.category === 'KTV' },
      { title: '影院', key: 'cinema', filter: (i) => i.category === '影院' },
    ],
  },
  {
    title: '美容美发',
    icon: MagicStick,
    items: beautyitems.value,
    tabs: [
      { title: '全部', key: 'all' },
      { title: '折扣专区', key: 'discount', filter: (i) => !!i.hasDiscount },
      { title: '美容', key: 'beauty', filter: (i) => i.category === '影院' },
      { title: '美发', key: 'hair', filter: (i) => i.category === '影院' },
    ],
  },
  {
    title: '生活超市',
    icon: ShoppingTrolley,
    items: marketitems.value,
    tabs: [
      { title: '全部', key: 'all' },
      { title: '折扣专区', key: 'discount', filter: (i) => !!i.hasDiscount },
      { title: '超市', key: 'market', filter: (i) => i.category === '超市' },
    ],
  },
  {
    title: '购物商场',
    icon: Goods,
    items: mallitems.value,
    tabs: [
      { title: '全部', key: 'all' },
      { title: '折扣专区', key: 'discount', filter: (i) => !!i.hasDiscount },
      { title: '商场', key: 'mall', filter: (i) => i.category === '商场' },
    ],
  },
]

// 3. 状态
const currentIndex = ref(0) // 左侧高亮/右侧当前分类
const activeTab = ref(0) // 当前分类下选中的按钮

// 4. 计算属性
const currentCate = computed(() => categories[currentIndex.value])
const showItems = computed(() => {
  const tab = currentCate.value.tabs[activeTab.value]
  const filter = tab?.filter || (() => true)
  const result = currentCate.value.items.filter(filter)
  return result
})

// 5. 切分类时重置按钮索引
currentIndex.value = 0
</script>
<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
}

.sideBox {
  padding: 10px;
  height: 100%;
  background-color: #f7f8fa;
  padding: 10px;
}

.mainBox {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding: 10px;
}

.tab-buttons {
  padding: 6px;
  border: none;
  background-color: #fbfbfb;
  border-radius: 6px;

  /* 滚动条样式（可选） */
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 2px;
  }

  .van-button {
    flex-shrink: 0;
  }
}

h4 {
  padding: 10px 15px;
  font-size: 16px;
  font-weight: 600;
  .el-icon {
    margin-right: 4px;
    vertical-align: -3px;
  }
}

/* 横向滚动卡片区域 */
.items {
  display: flex;
  gap: 12px;
  padding: 10px;
  overflow-x: auto;

  /* 滚动条 */
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 2px;
  }
}
/* 空态 */
.none {
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 12px;
}

a {
  flex: 0 0 auto;
  width: 90px;
  color: inherit;
  text-decoration: none;
  text-align: center;

  .van-image {
    width: 70px;
    height: 70px;
    border-radius: 8px;
    overflow: hidden;
  }

  p {
    margin-top: 4px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.item-card {
  position: relative;
  text-align: center;
}

.img-wrapper {
  position: relative;
  display: inline-block;
}

.discount-tag {
  position: absolute;
  top: 4px;
  right: 4px;
  background: #ee780a;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  padding: 2px 4px;
  border-radius: 2px;
  line-height: 1;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .items {
    flex-wrap: wrap;
    overflow-x: visible;
  }
}
</style>
