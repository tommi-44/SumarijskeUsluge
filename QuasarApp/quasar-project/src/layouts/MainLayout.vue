<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Početna',
    caption: 'Početna stranica',
    icon: 'dashboard',
    link: '/'
  },
  {
    title: 'O nama',
    caption: 'O nama',
    icon: 'info',
    link: '#/ONama'
  },
  {
  title: 'Radnici',
  caption: 'Radnici',
  icon: 'people',
  link: '#/Radnici'
  },
  {
  title: 'Kontakt',
  caption: 'Kontakt',
  icon: 'contact_mail',
  link: '#/Kontakt'
}, 
   {
    title: 'Unos proizvoda',
    caption: 'Unos novih proizvoda',
    icon: 'add_circle',
    link: '#/unos_proizvoda/'
  },
  {
    title: 'Pregled proizvoda',
    caption: 'Pregled svih proizvoda',
    icon: 'inventory',
    link: '#/pregled_proizvoda/'
  },
 
  {
    title: 'Unos kupovine',
    caption: 'Unos kupovine',
    icon: 'shopping_cart',
    link: '#/kupovina_proizvoda'
  },
   {
    title: 'Pregled kupovine',
    caption: 'Pregled kupovine',
    icon: 'receipt_long ',
    link: '#/pregled_kupovina'
  },
]


const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>