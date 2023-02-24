<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ localize('Amount') }}</th>
        <th>{{ localize('Date') }}</th>
        <th>{{ localize('Category') }}</th>
        <th>{{ localize('Type') }}</th>
        <th>{{ localize('Open') }}</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="(record, index) in records"
        :key="record.id"
      >
        <td>{{ index + 1 }}</td>
        <td>{{ currency(record.amount) }}</td>
        <td>{{ dateFilter(record.date) }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span
            :class="[record.typeClass]"
            class="white-text badge"
            >{{ record.typeText }}</span
          >
        </td>
        <td>
          <button
            v-tooltip="OpenRecord"
            class="btn-small btn"
            @click.prevent="$router.push('/detail/' + record.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import localizeFilter from '../filters/localize.filter'

export default {
  data() {
    return {
      OpenRecord: localizeFilter('OpenRecord'),
    }
  },
  props: {
    records: {
      required: true,
      type: Array,
    },
  },
}
</script>
