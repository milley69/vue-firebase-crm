<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a
          href="#"
          @click.prevent="$emit('clickNav')"
        >
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ dateFilter(this.date, 'datetime') }}</span>
      </div>

      <!-- <ul class="right hide-on-small-and-down"> -->
      <ul class="right">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            ref="dropdownMAT"
            data-target="dropdown"
          >
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul
            id="dropdown"
            class="dropdown-content"
          >
            <li>
              <router-link
                href="#"
                class="black-text"
                to="/profile"
              >
                <i class="material-icons">account_circle</i>{{ localize('ProfileTitle') }}
              </router-link>
            </li>
            <li
              class="divider"
              tabindex="-1"
            ></li>
            <li>
              <a
                href="#"
                class="black-text"
                @click.prevent="logout"
              >
                <i class="material-icons">assignment_return</i>{{ localize('Exit') }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      intevalDate: null,
      dropdown: null,
      date: new Date(),
    }
  },
  created() {
    this.moment = moment
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    },
  },
  computed: {
    name() {
      return this.$store.getters.info.name
    },
  },
  mounted() {
    this.inteval = setInterval(() => {
      this.date = new Date()
    }, 1000)
    setTimeout(() => {
      this.dropdown = M.Dropdown.init(this.$refs.dropdownMAT, {
        constrainWidth: false,
      })
    }, 0)
  },
  beforeDestroy() {
    clearInterval(this.inteval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  },
}
</script>
<style scoped>
.dropdown-trigger.black-text {
  text-transform: capitalize;
}
</style>
