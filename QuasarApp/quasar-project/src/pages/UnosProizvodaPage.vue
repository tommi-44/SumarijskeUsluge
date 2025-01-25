<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form class="q-gutter-md">
      <!-- Polja za unos -->
      <q-input filled v-model="proizvod" label="Naziv proizvoda" />
      <q-input filled v-model="materijal" label="Materijal" />
      <q-input filled v-model="dimenzije" label="Dimenzije" />
      <q-input filled type="number" v-model="kolicina_na_skladistu" label="Količina na skladištu" />
      <q-input filled type="number" v-model="cijena" label="Cijena" />
      <q-input filled v-model="prodavac" label="Prodavač" />

      <!-- Gumbi za slanje i resetiranje -->
      <div>
        <q-btn label="Spremi" color="primary" @click="onSubmit" />
        <q-btn label="Resetiraj" color="primary" flat class="q-ml-sm" @click="onReset" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios'; // Instaliraj axios ako već nije instaliran

export default {
  setup() {
    // Definiranje polja
    const proizvod = ref(null);
    const materijal = ref(null);
    const dimenzije = ref(null);
    const kolicina_na_skladistu = ref(null);
    const cijena = ref(null);
    const prodavac = ref(null);

    // Metoda za resetiranje polja
    const onReset = () => {
      proizvod.value = null;
      materijal.value = null;
      dimenzije.value = null;
      kolicina_na_skladistu.value = null;
      cijena.value = null;
      prodavac.value = null;
    };

    // Metoda za spremanje podataka
    const onSubmit = async () => {
      const formData = {
        proizvod: proizvod.value,
        materijal: materijal.value,
        dimenzije: dimenzije.value,
        kolicina_na_skladistu: kolicina_na_skladistu.value,
        cijena: cijena.value,
        prodavac: prodavac.value,
      };

      try {
        const response = await axios.post('http://localhost:3000/api/unos_proizvoda', formData);
        console.log('Podaci uspješno spremljeni:', response.data);
        onReset(); // Resetiraj polja nakon uspješnog unosa
      } catch (error) {
        console.error('Greška pri spremanju podataka:', error);
      }
    };

    return { proizvod, materijal, dimenzije, kolicina_na_skladistu, cijena, prodavac, onSubmit, onReset };
  },
};
</script>