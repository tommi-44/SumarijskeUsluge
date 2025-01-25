<template>
  <div class="q-pa-md" style="max-width: 400px">
    <!-- Forma za unos kupovine -->
    <q-form class="q-gutter-md">
      <!-- Polja za unos podataka -->
      <q-input filled v-model="kupac_i_p" label="Kupac (Ime i Prezime)" />
      <q-input filled type="date" v-model="datum" label="Datum kupovine" />
      <q-input filled type="number" v-model="kolicina_kupovine" label="Količina kupovine" />
      <q-input filled type="number" v-model="proizvod_id" label="ID proizvoda" />

      <!-- Gumbi za slanje i resetiranje -->
      <div>
        <q-btn label="Spremi" color="primary" @click="onSubmit" />
        <q-btn label="Resetiraj" color="primary" flat class="q-ml-sm" @click="onReset" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref } from 'vue'; // Koristi Vue funkcionalnosti
import axios from 'axios'; // Axios za API pozive

export default {
  setup() {
    // Reaktivne varijable za unos podataka
    const kupac_i_p = ref(null); // Polje za kupca
    const datum = ref(null); // Polje za datum
    const kolicina_kupovine = ref(null); // Polje za količinu
    const proizvod_id = ref(null); // Polje za ID proizvoda

    // Funkcija za resetiranje unosa
    const onReset = () => {
      kupac_i_p.value = null;
      datum.value = null;
      kolicina_kupovine.value = null;
      proizvod_id.value = null;
    };

    // Funkcija za slanje podataka na backend
    const onSubmit = async () => {
      const formData = {
        kupac_i_p: kupac_i_p.value,
        datum: datum.value,
        kolicina_kupovine: kolicina_kupovine.value,
        proizvod_id: proizvod_id.value,
      };

      try {
        // Slanje POST zahtjeva na backend
        const response = await axios.post('http://localhost:3000/api/unos_kupovine', formData);
        console.log('Kupovina uspješno dodana:', response.data);

        // Resetiranje forme nakon uspješnog unosa
        onReset();
      } catch (error) {
        console.error('Greška pri unosu kupovine:', error);
      }
    };

    // Vraćanje varijabli i funkcija za korištenje u template
    return {kupac_i_p,datum,kolicina_kupovine,proizvod_id,onReset,onSubmit,};
  },
};
</script>
