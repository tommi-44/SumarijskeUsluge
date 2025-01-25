<template>
  <q-page padding>
     <div class="container">
        <br>
        <br>
        <form action="action_page.php">
      
          <label for="fname">Ime</label>
          <input type="text" id="fname" name="firstname" placeholder="Vaše ime..">
      
          <label for="lname">Prezime</label>
          <input type="text" id="lname" name="lastname" placeholder="Vaše prezime..">
    
          <label for="subject">Opis</label>
          <textarea id="subject" name="subject" placeholder="Napišite.." style="height:200px"></textarea>
      
          <input type="submit" value="Pošalji">
      
        </form>
      </div>
  </q-page>
</template>

<script setup>
//
</script>
