<template>

  <div class="table-responsive">
    <table class="table text-center">
      <thead>
        <tr>
          <th v-for="header in tableData.headers" :key="header.name"
            :style='`width: ${header.width};`'>{{ header.name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in tableData.data" :key="row.category">
          <th scope="row" class="text-start">{{ row.category }}</th>
          <td v-for="(value, index) in Object.values(row).slice(1)" :key="value">
            <svg v-if="value" class="bi" :class='getIconClass(index)' width="24" height="24">
              <use xlink:href="#check"></use>
            </svg>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
  export default {
    name: 'PlansTable',
  };
</script>

<script setup>

  const tableData = {
    headers: [
      { name: '', width: '34%' },
      { name: 'Free', width: '22%' },
      { name: 'Pro', width: '22%' },
      { name: 'Enterprise', width: '22%' },
    ],
    data: [
      { category: 'Public', Free: true, Pro: true, Enterprise: true },
      { category: 'Private', Free: false, Pro: true, Enterprise: true },
      { category: 'Permissions', Free: true, Pro: true, Enterprise: true },
      { category: 'Sharing', Free: false, Pro: true, Enterprise: true },
      { category: 'Unlimited members', Free: false, Pro: true, Enterprise: true },
      { category: 'Extra security', Free: false, Pro: false, Enterprise: true }
    ]
  };


  const getIconClass = (index) => {
    const classes = ['', 'fill-warning', 'fill-purple'];
    return classes[index];
  };

</script>
