<template>
  <ul :class="['sidenav', 'app-sidenav', { open: isOpen }]">
    <li
      v-for="link in links"
      :key="link.path"
      active-class="active"
      :exact="link.exact"
    >
      <router-link
        :exact="link.exact"
        :to="link.path"
        class="waves-effect waves-orange pointer"
        >{{ link.title }}</router-link
      >
    </li>
  </ul>
</template>
<script>
import localizeFilter from '@/filters/localize.filter'
export default {
  props: ['isOpen'],
  data() {
    return {
      links: [
        { title: localizeFilter('Menu_bill'), path: '/', exact: true },
        { title: localizeFilter('Menu_history'), path: '/history' },
        { title: localizeFilter('Menu_planning'), path: '/planning' },
        { title: localizeFilter('Menu_record'), path: '/record' },
        { title: localizeFilter('Menu_categories'), path: '/categories' },
      ],
    }
  },
}
</script>
