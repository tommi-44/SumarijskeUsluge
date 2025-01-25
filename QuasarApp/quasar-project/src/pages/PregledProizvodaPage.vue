<template>
  <div class="q-pa-md">
    <!-- Prikaz tablice -->
    <q-table
      title="Proizvodi"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :pagination="pagination"
    >
      <template v-slot:body-cell-actions="props">
        <q-td>
          <!-- Gumb za uređivanje -->
          <q-btn flat icon="edit" color="primary" @click="editProduct(props.row)" />
          <!-- Gumb za brisanje -->
          <q-btn flat icon="delete" color="negative" @click="deleteProduct(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <!-- Forma za uređivanje -->
    <q-dialog v-model="editDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Uredi proizvod</div>
        </q-card-section>

        <q-card-section>
          <q-form>
            <q-input filled v-model="editData.proizvod" label="Naziv proizvoda" />
            <q-input filled v-model="editData.materijal" label="Materijal" />
            <q-input filled v-model="editData.dimenzije" label="Dimenzije" />
            <q-input filled v-model="editData.kolicina_na_skladistu" label="Količina na skladištu" />
            <q-input filled v-model="editData.cijena" label="Cijena" />
            <q-input filled v-model="editData.prodavac" label="Prodavač" />
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Odustani" color="primary" @click="editDialog = false" />
          <q-btn flat label="Spremi" color="primary" @click="updateProduct" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    // Stupci za prikaz u tablici
    const columns = [
      { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
      { name: 'proizvod', align: 'left', label: 'Naziv', field: 'proizvod', sortable: true },
      { name: 'materijal', align: 'left', label: 'Materijal', field: 'materijal', sortable: true },
      { name: 'dimenzije', align: 'left', label: 'Dimenzije', field: 'dimenzije', sortable: true },
      { name: 'kolicina_na_skladistu', align: 'left', label: 'Količina na skladištu', field: 'kolicina_na_skladistu', sortable: true },
      { name: 'cijena', align: 'left', label: 'Cijena', field: 'cijena', sortable: true },
      { name: 'prodavac', align: 'left', label: 'Prodavač', field: 'prodavac', sortable: true },
      { name: 'actions', align: 'center', label: 'Akcije', field: 'actions' },
    ];

    const rows = ref([]);
    const editDialog = ref(false);
    const editData = ref({});
    const pagination = ref({ sortBy: 'id', descending: false, rowsPerPage: 10 });

    const loadProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/proizvodi');
        rows.value = response.data;
      } catch (err) {
        console.error('Greška pri dohvaćanju podataka:', err);
      }
    };

    const deleteProduct = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/api/proizvodi/${id}`);
        rows.value = rows.value.filter((row) => row.id !== id);
      } catch (err) {
        console.error('Greška pri brisanju proizvoda:', err);
      }
    };

    const editProduct = (product) => {
      editData.value = { ...product };
      editDialog.value = true;
    };

    const updateProduct = async () => {
      try {
        await axios.put(`http://localhost:3000/api/proizvodi/${editData.value.id}`, editData.value);
        const index = rows.value.findIndex((row) => row.id === editData.value.id);
        rows.value[index] = { ...editData.value };
        editDialog.value = false;
      } catch (err) {
        console.error('Greška pri ažuriranju proizvoda:', err);
      }
    };

    onMounted(loadProducts);

    return { columns, rows, pagination, editDialog, editData, deleteProduct, editProduct, updateProduct };
  },
};
</script>
