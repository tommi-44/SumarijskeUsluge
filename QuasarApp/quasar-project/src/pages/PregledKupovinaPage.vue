<template>
  <div class="q-pa-md">
    <!-- Prikaz tablice -->
    <q-table
      title="Kupovine"
      :rows="rows"
      :columns="columns"
      row-key="id"
    />
    <!-- Debug - Prikaz grešaka ako postoje -->
    <div v-if="error" class="text-red">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'; // Vue funkcionalnosti
import axios from 'axios'; // Axios za API poziv

export default {
  setup() {
    // Definicija stupaca tablice
    const columns = [
      { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
      { name: 'kupac_i_p', align: 'left', label: 'Kupac', field: 'kupac_i_p', sortable: true },
      { name: 'datum', align: 'left', label: 'Datum', field: 'datum', sortable: true },
      { name: 'kolicina_kupovine', align: 'left', label: 'Količina', field: 'kolicina_kupovine', sortable: true },
      { name: 'ukupna_cijena', align: 'left', label: 'Ukupna cijena', field: 'ukupna_cijena', sortable: true },
      { name: 'proizvod_id', align: 'left', label: 'ID proizvoda', field: 'proizvod_id', sortable: true },
    ];

    // Reaktivne varijable
    const rows = ref([]); // Za podatke iz baze
    const error = ref(null); // Za greške
    const debug = ref(false); // Debug mod

    // Funkcija za dohvat podataka iz baze
    const loadKupovine = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/kupovine');
        console.log("API Response:", response);
        rows.value = response.data; // Spremanje podataka u varijablu
      } catch (err) {
        console.error("API Error:", err);
        error.value = `Greška API poziva: ${err.message}`; // Prikaz točne greške
      }
    };

    // Automatski poziv API-ja kada se komponenta učita
    onMounted(() => {
      debug.value = true; // Aktiviranje debug moda
      loadKupovine();
    });

    // Vraćanje vrijednosti u template
    return { rows, columns, error, debug };
  },
};
</script>
